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

        [HttpPost]
        public async Task<ActionResult<List<BusSchedule>>> PostBusSchedule([FromBody] BusScheduleDTO busScheduleDTO)
        {
            if (busScheduleDTO.Routes == null)
            {
                return BadRequest("Routes information is required.");
            }

            if (!TimeSpan.TryParse(busScheduleDTO.ETD, out var etd))
            {
                return BadRequest("Invalid ETD format.");
            }

            if (!TimeSpan.TryParse(busScheduleDTO.ETA, out var eta))
            {
                return BadRequest("Invalid ETA format.");
            }

            var route = new Routes
            {
                Origin = busScheduleDTO.Routes.Origin,
                BoardingLocationID = busScheduleDTO.Routes.BoardingLocationID,
                ETD = etd,
                Destination = busScheduleDTO.Routes.Destination,
                ArrivalLocationID = busScheduleDTO.Routes.ArrivalLocationID,
                ETA = eta,
                Status = busScheduleDTO.Routes.Status,
            };

            _context.Routes.Add(route);
            await _context.SaveChangesAsync();

            RecurringOption recurringOption = null;
            if (busScheduleDTO.RecurringOptions != null)
            {
                var recurringOptions = busScheduleDTO.RecurringOptions;

                recurringOption = new RecurringOption
                {
                    Options = recurringOptions.Options,
                    Date = recurringOptions.Date ?? DateTime.MinValue,
                    FromDate = recurringOptions.FromDate,
                    ToDate = recurringOptions.ToDate,
                    SelectDays = recurringOptions.SelectDays != null ? string.Join(",", recurringOptions.SelectDays) : null,
                    Status = "Active"
                };

                _context.RecurringOptions.Add(recurringOption);
                await _context.SaveChangesAsync();
            }

            var busSchedules = new List<BusSchedule>();

            if (busScheduleDTO.RecurringOptions != null)
            {
                var recurringOptions = busScheduleDTO.RecurringOptions;

                if (recurringOptions.Options == "None")
                {
                    if (recurringOptions.Date == null)
                        return BadRequest("Date is required when RecurringOptions is 'None'.");

                    var busSchedule = CreateBusSchedule(busScheduleDTO, recurringOptions.Date.Value, etd, eta, route.RouteID, recurringOption?.RecurringOptionID);
                    busSchedules.Add(busSchedule);
                }
                else if (recurringOptions.Options == "Daily")
                {
                    if (recurringOptions.FromDate == null || recurringOptions.ToDate == null)
                        return BadRequest("FromDate and ToDate are required when RecurringOptions is 'Daily'.");

                    for (var date = recurringOptions.FromDate.Value; date <= recurringOptions.ToDate.Value; date = date.AddDays(1))
                    {
                        var busSchedule = CreateBusSchedule(busScheduleDTO, date, etd, eta, route.RouteID, recurringOption?.RecurringOptionID);
                        busSchedules.Add(busSchedule);
                    }
                }
                else if (recurringOptions.Options == "Monthly")
                {
                    if (recurringOptions.FromDate == null || recurringOptions.ToDate == null || recurringOptions.SelectDays == null || !recurringOptions.SelectDays.Any())
                        return BadRequest("FromDate, ToDate, and SelectDays are required when RecurringOptions is 'Monthly'.");

                    var daysOfWeek = recurringOptions.SelectDays.Select(day => Enum.Parse<DayOfWeek>(day, true)).ToList();

                    for (var date = recurringOptions.FromDate.Value; date <= recurringOptions.ToDate.Value; date = date.AddDays(1))
                    {
                        if (daysOfWeek.Contains(date.DayOfWeek))
                        {
                            var busSchedule = CreateBusSchedule(busScheduleDTO, date, etd, eta, route.RouteID, recurringOption?.RecurringOptionID);
                            busSchedules.Add(busSchedule);
                        }
                    }
                }
                else
                {
                    return BadRequest("Invalid RecurringOptions value.");
                }
            }
            else
            {
                return BadRequest("RecurringOptions information is required.");
            }

            _context.BusSchedules.AddRange(busSchedules);
            await _context.SaveChangesAsync();

            return Created("GetBusSchedules", busSchedules);
        }

        private BusSchedule CreateBusSchedule(
            BusScheduleDTO dto,
            DateTime travelDate,
            TimeSpan etd,
            TimeSpan eta,
            int routeID,
            int? recurringOptionID)
        {
            return new BusSchedule
            {
                TravelDate = travelDate,
                ETD = etd,
                ETA = eta,
                IsRecurring = dto.IsRecurring,
                RecurringOptionID = recurringOptionID,
                BusID = dto.BusID,
                DriverID = dto.DriverID,
                RouteID = routeID,
                ScheduleStatus = dto.ScheduleStatus,
                Status = dto.Status
            };
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

        //// PUT: api/BusSchedule/UpdateOnTimeStatus
        //[HttpPut("UpdateOnTimeStatus")]
        //public async Task<IActionResult> UpdateOnTimeStatus()
        //{
        //    var currentDate = DateTime.Now.Date;
        //    var targetDate = currentDate.AddDays(7);

        //    var busSchedules = await _context.BusSchedules
        //        .Include(bs => bs.RecurringOptions)
        //        .Where(bs => bs.ScheduleStatus == "Scheduled"
        //                     && bs.RecurringOptions.Date == targetDate)
        //        .ToListAsync();

        //    if (!busSchedules.Any())
        //    {
        //        return Ok("No schedules to update.");
        //    }

        //    foreach (var schedule in busSchedules)
        //    {
        //        schedule.ScheduleStatus = "On Time";
        //    }

        //    await _context.SaveChangesAsync();

        //    return Ok($"Updated {busSchedules.Count} schedules to 'On Time'.");
        //}

        private bool BusScheduleExists(int id)
        {
            return _context.BusSchedules.Any(e => e.BusScheduleID == id);
        }
    }
}