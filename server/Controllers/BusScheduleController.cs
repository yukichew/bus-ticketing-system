using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
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
            var busSchedule = await _context.BusSchedules
                .Include(b => b.BusID)
                .Include(b => b.RecurringOptionID)
                .Include(b => b.DriverID)
                .Include(b => b.RouteID)
                .FirstOrDefaultAsync(b => b.BusScheduleID == id);

            if (busSchedule == null)
            {
                return NotFound();
            }

            return Ok(busSchedule);
        }

        // POST: api/BusSchedule
        [HttpPost]
        public async Task<ActionResult<BusSchedule>> PostBusSchedule([FromBody] BusSchedule busSchedule)
        {
            if (busSchedule.Routes == null)
            {
                return (busSchedule);
                //return BadRequest("Routes information is required.");
            }

            var route = new Routes
            {
                Origin = busSchedule.Routes.Origin,
                BoardingLocationID = busSchedule.Routes.BoardingLocationID,
                ETD = busSchedule.Routes.ETD,
                Destination = busSchedule.Routes.Destination,
                ArrivalLocationID = busSchedule.Routes.ArrivalLocationID,
                ETA = busSchedule.Routes.ETA,
                Status = busSchedule.Routes.Status,
            };

            _context.Routes.Add(route);
            await _context.SaveChangesAsync();

            int? recurringOptionID = null;
            if (busSchedule.RecurringOptions != null)
            {
                string status = "Active";

                if (busSchedule.RecurringOptions.Options == "None") // Handle recurring option "None"
                {
                    if (busSchedule.RecurringOptions.Date == null)
                    {
                        return BadRequest("Date is required when Options is 'None'.");
                    }

                    var recurringOption = new RecurringOption
                    {
                        Options = busSchedule.RecurringOptions.Options,
                        Date = busSchedule.RecurringOptions.Date,
                        FromDate = null,
                        ToDate = null,
                        SelectDays = null,
                        Status = status
                    };

                    _context.RecurringOptions.Add(recurringOption);
                    await _context.SaveChangesAsync();
                    recurringOptionID = recurringOption.RecurringOptionID;
                }
                else if (busSchedule.RecurringOptions.Options == "Daily") // Handle recurring option "Daily"
                {
                    if (busSchedule.RecurringOptions.FromDate == null || busSchedule.RecurringOptions.ToDate == null)
                    {
                        return BadRequest("FromDate and ToDate are required when Options is 'Daily'.");
                    }

                    var recurringOption = new RecurringOption
                    {
                        Options = busSchedule.RecurringOptions.Options,
                        FromDate = busSchedule.RecurringOptions.FromDate,
                        ToDate = busSchedule.RecurringOptions.ToDate,
                        Date = busSchedule.RecurringOptions.Date,
                        SelectDays = null,
                        Status = status
                    };

                    _context.RecurringOptions.Add(recurringOption);
                    await _context.SaveChangesAsync();
                    recurringOptionID = recurringOption.RecurringOptionID;
                }
                else if (busSchedule.RecurringOptions.Options == "Monthly") // Handle recurring option "Monthly"
                {
                    if (busSchedule.RecurringOptions.FromDate == null || busSchedule.RecurringOptions.ToDate == null || busSchedule.RecurringOptions.SelectDays == null || !busSchedule.RecurringOptions.SelectDays.Any())
                    {
                        return BadRequest("FromDate, ToDate, and SelectDays are required when Options is 'Monthly'.");
                    }

                    if (busSchedule.RecurringOptions.SelectDays.Count() > 6)
                    {
                        return BadRequest("You can select a maximum of 6 days for SelectDays.");
                    }

                    var recurringOption = new RecurringOption
                    {
                        Options = busSchedule.RecurringOptions.Options,
                        FromDate = busSchedule.RecurringOptions.FromDate,
                        ToDate = busSchedule.RecurringOptions.ToDate,
                        Date = busSchedule.RecurringOptions.Date,
                        SelectDays = string.Join(",", busSchedule.RecurringOptions.SelectDays),
                        Status = status
                    };

                    _context.RecurringOptions.Add(recurringOption);
                    await _context.SaveChangesAsync();
                    recurringOptionID = recurringOption.RecurringOptionID;
                }
                else
                {
                    return BadRequest("Invalid option selected for RecurringOptions.");
                }
            }

            var newBusSchedule = new BusSchedule
            {
                IsRecurring = busSchedule.IsRecurring,
                RecurringOptionID = recurringOptionID,
                BusID = busSchedule.BusID,
                DriverID = busSchedule.DriverID,
                RouteID = route.RouteID,
                ScheduleStatus = "Scheduled",
                Status = "Active"
            };

            _context.BusSchedules.Add(newBusSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusSchedule", new { id = newBusSchedule.BusScheduleID }, newBusSchedule);
        }


        // PUT: api/BusSchedule/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusSchedule(int id, BusSchedule busSchedule)
        {
            if (id != busSchedule.BusScheduleID)
            {
                return BadRequest("Mismatched BusSchedule ID.");
            }

            var existingBusSchedule = await _context.BusSchedules
                .Include(bs => bs.RouteID)
                .Include(bs => bs.RecurringOptionID)
                .FirstOrDefaultAsync(bs => bs.BusScheduleID == id);

            if (existingBusSchedule == null)
            {
                return NotFound();
            }

            if (busSchedule.Routes != null)
            {
                existingBusSchedule.Routes.Origin = busSchedule.Routes.Origin;
                existingBusSchedule.Routes.BoardingLocationID = busSchedule.Routes.BoardingLocationID;
                existingBusSchedule.Routes.ETD = busSchedule.Routes.ETD;
                existingBusSchedule.Routes.Destination = busSchedule.Routes.Destination;
                existingBusSchedule.Routes.ArrivalLocationID = busSchedule.Routes.ArrivalLocationID;
                existingBusSchedule.Routes.ETA = busSchedule.Routes.ETA;
            }

            // Update RecurringOptions
            if (busSchedule.RecurringOptions != null)
            {
                var existingRecurringOption = existingBusSchedule.RecurringOptions;
                if (busSchedule.RecurringOptions.Options == "None")
                {
                    if (busSchedule.RecurringOptions.Date == null)
                    {
                        return BadRequest("Date is required when Options is 'None'.");
                    }

                    existingRecurringOption.Options = busSchedule.RecurringOptions.Options;
                    existingRecurringOption.Date = busSchedule.RecurringOptions.Date;
                    existingRecurringOption.FromDate = null;
                    existingRecurringOption.ToDate = null;
                    existingRecurringOption.SelectDays = null;
                }
                else if (busSchedule.RecurringOptions.Options == "Daily")
                {
                    if (busSchedule.RecurringOptions.FromDate == null || busSchedule.RecurringOptions.ToDate == null)
                    {
                        return BadRequest("FromDate and ToDate are required when Options is 'Daily'.");
                    }

                    existingRecurringOption.Options = busSchedule.RecurringOptions.Options;
                    existingRecurringOption.FromDate = busSchedule.RecurringOptions.FromDate;
                    existingRecurringOption.ToDate = busSchedule.RecurringOptions.ToDate;
                    existingRecurringOption.Date = busSchedule.RecurringOptions.Date; // CORRECTION: Date no input
                    existingRecurringOption.SelectDays = null;
                }
                else if (busSchedule.RecurringOptions.Options == "Monthly")
                {
                    if (busSchedule.RecurringOptions.FromDate == null || busSchedule.RecurringOptions.ToDate == null || busSchedule.RecurringOptions.SelectDays == null || !busSchedule.RecurringOptions.SelectDays.Any())
                    {
                        return BadRequest("FromDate, ToDate, and SelectDays are required when Options is 'Monthly'.");
                    }

                    if (busSchedule.RecurringOptions.SelectDays.Count() > 6)
                    {
                        return BadRequest("You can select a maximum of 6 days for SelectDays.");
                    }

                    existingRecurringOption.Options = busSchedule.RecurringOptions.Options;
                    existingRecurringOption.FromDate = busSchedule.RecurringOptions.FromDate;
                    existingRecurringOption.ToDate = busSchedule.RecurringOptions.ToDate;
                    existingRecurringOption.SelectDays = string.Join(",", busSchedule.RecurringOptions.SelectDays);
                    existingRecurringOption.Date = busSchedule.RecurringOptions.Date; // CORRECTION: Date no input
                }
                else
                {
                    return BadRequest("Invalid option selected for RecurringOptions.");
                }
            }

            existingBusSchedule.BusID = busSchedule.BusID;
            existingBusSchedule.DriverID = busSchedule.DriverID;
            existingBusSchedule.IsRecurring = busSchedule.IsRecurring;
            existingBusSchedule.ScheduleStatus = busSchedule.ScheduleStatus;
            existingBusSchedule.Status = busSchedule.Status;

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

            return NoContent();
        }

        // DELETE: api/BusSchedule/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusSchedule(int id)
        {
            var busSchedule = await _context.BusSchedules.FindAsync(id);
            if (busSchedule == null)
            {
                return NotFound();
            }

            _context.BusSchedules.Remove(busSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BusScheduleExists(int id)
        {
            return _context.BusSchedules.Any(e => e.BusScheduleID == id);
        }
    }
}