using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Dto;
using server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusScheduleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BusScheduleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BusSchedule
        [HttpGet]
        public async Task<ActionResult> GetAllBusSchedules()
        {
            var busSchedules = await _context.Set<BusSchedule>()
                                .Include(b => b.BusInfo)
                                .Include(b => b.RecurringOptions)
                                .Include(b => b.Drivers)
                                .Include(b => b.Routes)
                                .ToListAsync();

            return Ok(busSchedules);
        }

        // GET: api/BusSchedule/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusSchedule>> GetBusSchedule(int id)
        {
            var busSchedule = await _context.Set<BusSchedule>()
                                .Include(b => b.BusInfo)
                                .Include(b => b.RecurringOptions)
                                .Include(b => b.Drivers)
                                .Include(b => b.Routes)
                                .FirstOrDefaultAsync(b => b.BusScheduleID == id);

            if (busSchedule == null)
            {
                return NotFound();
            }

            return Ok(busSchedule);
        }

        // POST: api/BusSchedule
        [HttpPost]
        public async Task<ActionResult<BusSchedule>> PostBusSchedule([FromBody] BusScheduleDTO busScheduleDTO)
        {
            if (busScheduleDTO.Routes == null)
            {
                return BadRequest("Routes information is required.");
            }

            var route = new Routes
            {
                Origin = busScheduleDTO.Routes.Origin,
                BoardingLocationID = busScheduleDTO.Routes.BoardingLocationID,
                ETD = TimeSpan.Parse(busScheduleDTO.Routes.ETD),
                Destination = busScheduleDTO.Routes.Destination,
                ArrivalLocationID = busScheduleDTO.Routes.ArrivalLocationID,
                ETA = TimeSpan.Parse(busScheduleDTO.Routes.ETA),
                Status = busScheduleDTO.Routes.Status,
            };

            _context.Routes.Add(route);
            await _context.SaveChangesAsync();

            int? recurringOptionID = null;

            if (busScheduleDTO.RecurringOptions != null)
            {
                var recurringOptions = busScheduleDTO.RecurringOptions;

                if (string.IsNullOrEmpty(recurringOptions.Options))
                {
                    return BadRequest("RecurringOptions: Options is required.");
                }

                RecurringOption recurringOption = new RecurringOption
                {
                    Options = recurringOptions.Options,
                    Date = recurringOptions.Date ?? DateTime.MinValue,
                    FromDate = recurringOptions.FromDate,
                    ToDate = recurringOptions.ToDate,
                    SelectDays = recurringOptions.SelectDays != null ? string.Join(",", recurringOptions.SelectDays) : null,
                    Status = "Active"
                };

                if (recurringOptions.Options == "None" && recurringOptions.Date == null)
                {
                    return BadRequest("Date is required when Options is 'None'.");
                }

                if (recurringOptions.Options == "Daily" && (recurringOptions.FromDate == null || recurringOptions.ToDate == null))
                {
                    return BadRequest("FromDate and ToDate are required when Options is 'Daily'.");
                }

                if (recurringOptions.Options == "Monthly")
                {
                    if (recurringOptions.FromDate == null || recurringOptions.ToDate == null || recurringOptions.SelectDays == null || !recurringOptions.SelectDays.Any())
                    {
                        return BadRequest("FromDate, ToDate, and SelectDays are required when Options is 'Monthly'.");
                    }

                    if (recurringOptions.SelectDays.Count > 6)
                    {
                        return BadRequest("You can only select a maximum of 6 days for SelectDays.");
                    }
                }

                _context.RecurringOptions.Add(recurringOption);
                await _context.SaveChangesAsync();
                recurringOptionID = recurringOption.RecurringOptionID;
            }

            var busSchedule = new BusSchedule
            {
                IsRecurring = busScheduleDTO.IsRecurring,
                RecurringOptionID = recurringOptionID,
                BusID = busScheduleDTO.BusID,
                DriverID = busScheduleDTO.DriverID,
                RouteID = route.RouteID,
                ScheduleStatus = busScheduleDTO.ScheduleStatus,
                Status = busScheduleDTO.Status
            };

            _context.BusSchedules.Add(busSchedule);
            await _context.SaveChangesAsync();

            var createdBusSchedule = await _context.BusSchedules
                .Include(bs => bs.Routes)
                .Include(bs => bs.RecurringOptions)
                .FirstOrDefaultAsync(bs => bs.BusScheduleID == busSchedule.BusScheduleID);

            if (createdBusSchedule == null)
            {
                return NotFound("BusSchedule not found.");
            }

            return CreatedAtAction("GetBusSchedule", new { id = createdBusSchedule.BusScheduleID }, createdBusSchedule);
        }

        // PUT: api/BusSchedule/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusSchedule(int id, BusScheduleDTO busScheduleDTO)
        {
            var existingBusSchedule = await _context.BusSchedules
                .Include(bs => bs.Routes)
                .Include(bs => bs.RecurringOptions)
                .FirstOrDefaultAsync(bs => bs.BusScheduleID == id);

            if (existingBusSchedule == null)
            {
                return NotFound();
            }

            if (busScheduleDTO.Routes != null)
            {
                if (existingBusSchedule.Routes != null)
                {
                    existingBusSchedule.Routes.Origin = busScheduleDTO.Routes.Origin;
                    existingBusSchedule.Routes.BoardingLocationID = busScheduleDTO.Routes.BoardingLocationID;
                    existingBusSchedule.Routes.ETD = TimeSpan.Parse(busScheduleDTO.Routes.ETD);
                    existingBusSchedule.Routes.Destination = busScheduleDTO.Routes.Destination;
                    existingBusSchedule.Routes.ArrivalLocationID = busScheduleDTO.Routes.ArrivalLocationID;
                    existingBusSchedule.Routes.ETA = TimeSpan.Parse(busScheduleDTO.Routes.ETA);
                    existingBusSchedule.Routes.Status = busScheduleDTO.Routes.Status;
                }
                else
                {
                    var route = new Routes
                    {
                        Origin = busScheduleDTO.Routes.Origin,
                        BoardingLocationID = busScheduleDTO.Routes.BoardingLocationID,
                        ETD = TimeSpan.Parse(busScheduleDTO.Routes.ETD),
                        Destination = busScheduleDTO.Routes.Destination,
                        ArrivalLocationID = busScheduleDTO.Routes.ArrivalLocationID,
                        ETA = TimeSpan.Parse(busScheduleDTO.Routes.ETA),
                        Status = busScheduleDTO.Routes.Status
                    };
                    _context.Routes.Add(route);
                    await _context.SaveChangesAsync();

                    existingBusSchedule.RouteID = route.RouteID;
                }
            }

            if (busScheduleDTO.RecurringOptions != null)
            {
                if (existingBusSchedule.RecurringOptions == null)
                {
                    var recurringOption = new RecurringOption
                    {
                        Options = busScheduleDTO.RecurringOptions.Options,
                        Date = busScheduleDTO.RecurringOptions.Date ?? DateTime.MinValue,
                        FromDate = busScheduleDTO.RecurringOptions.FromDate,
                        ToDate = busScheduleDTO.RecurringOptions.ToDate,
                        SelectDays = busScheduleDTO.RecurringOptions.SelectDays != null ? string.Join(",", busScheduleDTO.RecurringOptions.SelectDays) : null,
                        Status = busScheduleDTO.RecurringOptions.Status
                    };

                    _context.RecurringOptions.Add(recurringOption);
                    await _context.SaveChangesAsync();

                    existingBusSchedule.RecurringOptionID = recurringOption.RecurringOptionID;
                }
                else
                {
                    var existingRecurringOption = existingBusSchedule.RecurringOptions;

                    existingRecurringOption.Options = busScheduleDTO.RecurringOptions.Options;
                    existingRecurringOption.Date = busScheduleDTO.RecurringOptions.Date ?? DateTime.MinValue;
                    existingRecurringOption.FromDate = busScheduleDTO.RecurringOptions.FromDate;
                    existingRecurringOption.ToDate = busScheduleDTO.RecurringOptions.ToDate;
                    existingRecurringOption.SelectDays = busScheduleDTO.RecurringOptions.SelectDays != null
                        ? string.Join(",", busScheduleDTO.RecurringOptions.SelectDays)
                        : null;
                    existingRecurringOption.Status = busScheduleDTO.RecurringOptions.Status;
                }
            }

            existingBusSchedule.BusID = busScheduleDTO.BusID;
            existingBusSchedule.DriverID = busScheduleDTO.DriverID;
            existingBusSchedule.IsRecurring = busScheduleDTO.IsRecurring;
            existingBusSchedule.ScheduleStatus = busScheduleDTO.ScheduleStatus;
            existingBusSchedule.Status = busScheduleDTO.Status;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusScheduleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("The bus schedule was successfully updated.");
        }

        // DELETE: api/BusSchedule/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusSchedule(int id)
        {
            var busSchedule = await _context.Set<BusSchedule>().FindAsync(id);
            if (busSchedule == null)
            {
                return NotFound();
            }

            _context.Set<BusSchedule>().Remove(busSchedule);
            await _context.SaveChangesAsync();

            return Ok("The selected bus schedule is successfully deleted.");
        }

        private bool BusScheduleExists(int id)
        {
            return _context.BusSchedules.Any(e => e.BusScheduleID == id);
        }
    }
}