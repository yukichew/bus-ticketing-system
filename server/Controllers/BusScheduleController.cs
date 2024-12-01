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

        #region GetAllBusSchedules
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
        #endregion

        #region GetBusSchedulesForToday
        // GET: api/BusSchedule/Today
        [HttpGet("Today")]
        public async Task<ActionResult> GetBusSchedulesForToday()
        {
            var today = DateTime.Today;

            var busSchedulesForToday = await _context.Set<BusSchedule>()
                .Include(b => b.BusInfo)
                .Include(b => b.RecurringOptions)
                .Include(b => b.Drivers)
                .Include(b => b.Routes)
                .Where(bs => bs.TravelDate == today)
                .ToListAsync();

            return Ok(busSchedulesForToday);
        }
        #endregion

        #region GetBusSchedule
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
        #endregion

        #region FilterBusSchedule
        // GET: api/BusScheduke/FilterBusSchedule
        [HttpGet("FilterBusSchedule")]
        public async Task<ActionResult> FilterBusSchedule(
            string busPlate = null,
            string busType = null,
            int? noOfSeats = null,
            string status = null,
            string origin = null,
            string destination = null,
            string driverFullname = null,
            string scheduleStatus = null,
            DateTime? travelDate = null)
        {
            var query = _context.BusSchedules.AsQueryable();

            // Filter by Bus Plate
            if (!string.IsNullOrEmpty(busPlate))
            {
                query = query.Where(bs => EF.Functions.Like(bs.BusInfo.BusPlate, $"%{busPlate}%"));
            }

            // Filter by Bus Type
            if (!string.IsNullOrEmpty(busType))
            {
                query = query.Where(bs => bs.BusInfo.BusType.Types == busType);
            }

            // Filter by Number of Seats
            if (noOfSeats.HasValue)
            {
                query = query.Where(bs => bs.BusInfo.BusType.NoOfSeats == noOfSeats.Value);
            }

            // Filter by Bus Status
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(bs => bs.BusInfo.Status == status);
            }

            // Filter by Origin
            if (!string.IsNullOrEmpty(origin))
            {
                query = query.Where(bs => EF.Functions.Like(bs.Routes.Origin, $"%{origin}%"));
            }

            // Filter by Destination
            if (!string.IsNullOrEmpty(destination))
            {
                query = query.Where(bs => EF.Functions.Like(bs.Routes.Destination, $"%{destination}%"));
            }

            // Filter by Driver Fullname
            if (!string.IsNullOrEmpty(driverFullname))
            {
                query = query.Where(bs => EF.Functions.Like(bs.Drivers.Fullname, $"%{driverFullname}%"));
            }

            // Filter by Schedule Status
            if (!string.IsNullOrEmpty(scheduleStatus))
            {
                query = query.Where(bs => bs.ScheduleStatus == scheduleStatus);
            }

            // Filter by Travel Date
            if (travelDate.HasValue)
            {
                query = query.Where(bs => bs.TravelDate.Date == travelDate.Value.Date);
            }

            var busSchedules = await query
                .Include(bs => bs.BusInfo)
                .Include(bs => bs.Drivers)
                .Include(bs => bs.Routes)
                .ToListAsync();

            if (busSchedules.Count == 0)
            {
                return Ok(new { message = "No relevant data found." });
            }

            return Ok(busSchedules);
        }
        #endregion

        #region PostBusSchedule
        // POST: api/BusSchedule
        [HttpPost]
        public async Task<ActionResult<List<BusSchedule>>> PostBusSchedule([FromBody] BusScheduleDTO busScheduleDTO)
        {
            if (busScheduleDTO.Routes == null)
            {
                return BadRequest("Routes information is required.");
            }

            TimeSpan etd = ParseTimeSpan(busScheduleDTO.ETD);
            TimeSpan eta = ParseTimeSpan(busScheduleDTO.ETA);

            // To ensure the bus schedule create between operating hours (6:00 AM to 9:00 PM)
            if (etd < TimeSpan.FromHours(6) || etd > TimeSpan.FromHours(21))
            {
                return BadRequest("Bus can only be scheduled during operation hours (6:00 AM to 9:00 PM).");
            }

            // To ensure the ETD is earlier than ETA
            if (etd >= eta)
            {
                return BadRequest("Departure time (ETD) must be earlier than arrival time (ETA).");
            }

            // Get the current time for comparison
            DateTime currentTime = DateTime.Now;

            if (busScheduleDTO.RecurringOptions == null)
            {
                return BadRequest("RecurringOptions information is required.");
            }

            // For 'None' RecurringOption
            if (busScheduleDTO.RecurringOptions.Options == "None" && busScheduleDTO.RecurringOptions.Date != null)
            {
                DateTime scheduleDateTime = busScheduleDTO.RecurringOptions.Date.Value.Add(etd);
                var validationResult = await ValidateScheduleForConflicts(busScheduleDTO.BusID, scheduleDateTime, etd);
                if (validationResult != null) return validationResult;
            }

            // For 'Daily' RecurringOption
            if (busScheduleDTO.RecurringOptions.Options == "Daily" &&
                busScheduleDTO.RecurringOptions.FromDate != null &&
                busScheduleDTO.RecurringOptions.ToDate != null)
            {
                for (var date = busScheduleDTO.RecurringOptions.FromDate.Value; date <= busScheduleDTO.RecurringOptions.ToDate.Value; date = date.AddDays(1))
                {
                    DateTime scheduleDateTime = date.Add(etd);
                    var validationResult = await ValidateScheduleForConflicts(busScheduleDTO.BusID, scheduleDateTime, etd);
                    if (validationResult != null) return validationResult;
                }
            }

            // For 'Monthly' RecurringOption
            if (busScheduleDTO.RecurringOptions.Options == "Monthly" &&
                busScheduleDTO.RecurringOptions.FromDate != null &&
                busScheduleDTO.RecurringOptions.ToDate != null &&
                busScheduleDTO.RecurringOptions.SelectDays != null &&
                busScheduleDTO.RecurringOptions.SelectDays.Any())
            {
                var daysOfWeek = busScheduleDTO.RecurringOptions.SelectDays
                    .Select(day => Enum.Parse<DayOfWeek>(day, true))
                    .ToList();

                for (var date = busScheduleDTO.RecurringOptions.FromDate.Value; date <= busScheduleDTO.RecurringOptions.ToDate.Value; date = date.AddDays(1))
                {
                    if (daysOfWeek.Contains(date.DayOfWeek))
                    {
                        DateTime scheduleDateTime = date.Add(etd);
                        var validationResult = await ValidateScheduleForConflicts(busScheduleDTO.BusID, scheduleDateTime, etd);
                        if (validationResult != null) return validationResult;
                    }
                }
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
                    Status = recurringOptions.Status,
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

                    // Check if the date range exceeds 3 months
                    var dateDifference = recurringOptions.ToDate.Value - recurringOptions.FromDate.Value;
                    if (dateDifference.TotalDays > 90)
                    {
                        return BadRequest("The date range cannot exceed 3 months.");
                    }

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

                    var dateDifference = recurringOptions.ToDate.Value - recurringOptions.FromDate.Value;
                    if (dateDifference.TotalDays > 90)
                    {
                        return BadRequest("The date range cannot exceed 3 months.");
                    }

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

        private async Task<ActionResult> ValidateScheduleForConflicts(int busID, DateTime travelDate, TimeSpan etd)
        {
            var existingSchedules = await _context.BusSchedules
                .Where(bs => bs.BusID == busID && bs.ScheduleStatus != "Cancelled" && bs.ScheduleStatus != "Completed")
                .ToListAsync();

            foreach (var schedule in existingSchedules)
            {
                DateTime existingScheduleDateTime = schedule.TravelDate.Date.Add(schedule.ETD);

                if (travelDate.Add(etd) <= DateTime.Now.AddHours(12))
                {
                    return BadRequest("A new schedule cannot be created within 12 hours of the current time.");
                }

                DateTime newScheduleDateTime = travelDate.Add(etd);

                if (newScheduleDateTime.Date == existingScheduleDateTime.Date &&
                    (newScheduleDateTime.TimeOfDay == existingScheduleDateTime.TimeOfDay ||
                     newScheduleDateTime.TimeOfDay.Add(TimeSpan.FromMinutes(30)) > existingScheduleDateTime.TimeOfDay))
                {
                    return BadRequest($"There is already a schedule for bus {busID} on {newScheduleDateTime.Date:yyyy-MM-dd} at {newScheduleDateTime:HH:mm}. " +
                                       $"No schedule can be created within 30 minutes of another schedule.");
                }
            }

            return null;
        }
        #endregion

        #region UpdateBusSchedule
        // PUT: api/BusSchedule/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusSchedule(int id, BusScheduleDTO busScheduleDTO)
        {
            var existingBusSchedule = await _context.BusSchedules
                .Include(bs => bs.Routes)
                .Include(bs => bs.RecurringOptions)
                .FirstOrDefaultAsync(bs => bs.BusScheduleID == id);

            if (existingBusSchedule == null)
            {
                return NotFound($"Bus Schedule with ID {id} not found.");
            }

            TimeSpan etd = TimeSpan.Parse(busScheduleDTO.ETD);
            TimeSpan eta = TimeSpan.Parse(busScheduleDTO.ETA);

            // To avoid the new ETD and ETA is outside the operation hours.
            if (etd < TimeSpan.FromHours(6) || etd > TimeSpan.FromHours(21))
            {
                return BadRequest("Bus can only be scheduled during operation hours (6:00 AM to 9:00 PM).");
            }

            if (etd >= eta)
            {
                return BadRequest("Departure time (ETD) must be earlier than arrival time (ETA).");
            }

            // A new schedule must be created 12 hours before the ETD.
            DateTime scheduleDateTime = busScheduleDTO.TravelDate.Add(etd);
            DateTime currentTime = DateTime.Now;

            if (scheduleDateTime <= currentTime.AddHours(12))
            {
                return BadRequest("A new schedule cannot be created within 12 hours of the current time.");
            }

            if (existingBusSchedule.Routes == null)
            {
                return BadRequest("The schedule must have an associated route.");
            }

            var existingRoutes = existingBusSchedule.Routes;
            existingRoutes.Origin = busScheduleDTO.Routes.Origin;
            existingRoutes.BoardingLocationID = busScheduleDTO.Routes.BoardingLocationID;
            existingRoutes.ETD = etd;
            existingRoutes.Destination = busScheduleDTO.Routes.Destination;
            existingRoutes.ArrivalLocationID = busScheduleDTO.Routes.ArrivalLocationID;
            existingRoutes.ETA = eta;
            existingRoutes.Status = busScheduleDTO.Routes.Status;

            existingBusSchedule.TravelDate = busScheduleDTO.TravelDate;
            existingBusSchedule.ETD = etd;
            existingBusSchedule.ETA = eta;
            existingBusSchedule.BusID = busScheduleDTO.BusID;
            existingBusSchedule.DriverID = busScheduleDTO.DriverID;
            existingBusSchedule.IsRecurring = busScheduleDTO.IsRecurring;
            existingBusSchedule.ScheduleStatus = busScheduleDTO.ScheduleStatus;
            existingBusSchedule.Status = busScheduleDTO.Status;

            // To ensure 30 minutes gap exist
            var lastSchedule = await _context.BusSchedules
                .Where(bs => bs.BusID == busScheduleDTO.BusID &&
                             bs.BusScheduleID != id &&
                             bs.ScheduleStatus != "Cancelled" &&
                             bs.ScheduleStatus != "Completed")
                .OrderByDescending(bs => bs.ETD)
                .FirstOrDefaultAsync();

            if (lastSchedule != null && lastSchedule.ETA.Add(TimeSpan.FromMinutes(30)) > etd)
            {
                return BadRequest($"The next trip for bus {busScheduleDTO.BusID} cannot be scheduled within 30 minutes of the previous trip.");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusScheduleExists(id))
                {
                    return NotFound($"Bus schedule with ID {id} not found after update attempt.");
                }
                else
                {
                    throw;
                }
            }

            return Ok("The bus schedule was successfully updated.");
        }
        #endregion

        #region DeleteBusSchedule
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
        #endregion

        #region UpdateOnTimeStatus
        // PUT: api/BusSchedule/UpdateOnTimeStatus
        [HttpPut("UpdateOnTimeStatus")]
        public async Task<IActionResult> UpdateOnTimeStatus()
        {
            var currentDate = DateTime.Now.Date;
            var targetDate = currentDate.AddDays(7);

            var busSchedules = await _context.BusSchedules
                .Where(bs => bs.ScheduleStatus == "Scheduled"
                             && bs.TravelDate.Date == targetDate)
                .ToListAsync();

            if (!busSchedules.Any())
            {
                return Ok("No schedules to update.");
            }

            foreach (var schedule in busSchedules)
            {
                schedule.ScheduleStatus = "On Time";
            }

            await _context.SaveChangesAsync();

            return Ok($"Updated {busSchedules.Count} schedules to 'On Time'.");
        }
        #endregion

        #region UpdateEnRouteStatus
        // PUT: api/BusSchedule/UpdateEnRouteStatus
        [HttpPut("UpdateEnRouteStatus")]
        public async Task<IActionResult> UpdateEnRouteStatus()
        {
            var currentTime = DateTime.Now.TimeOfDay;
            var currentDate = DateTime.Now.Date;

            var fiveMinutesBefore = currentTime.Add(TimeSpan.FromMinutes(-5));
            var fiveMinutesAfter = currentTime.Add(TimeSpan.FromMinutes(5));

            var busSchedules = await _context.BusSchedules
                .Where(bs => bs.ScheduleStatus == "On Time"
                     && bs.TravelDate.Date == currentDate
                     && (bs.ETD >= fiveMinutesBefore || bs.ETD <= fiveMinutesAfter))
                .ToListAsync();

            if (!busSchedules.Any())
            {
                return Ok("No schedules to update.");
            }

            foreach (var schedule in busSchedules)
            {
                schedule.ScheduleStatus = "En Route";
            }

            await _context.SaveChangesAsync();

            return Ok($"Updated {busSchedules.Count} schedules to 'En Route'.");
        }
        #endregion

        #region UpdateDelayedStatus
        // PUT: api/BusSchedule/UpdateDelayedStatus/{id}
        [HttpPut("UpdateDelayedStatus/{id}")]
        public async Task<IActionResult> UpdateDelayedStatus(int id, BusScheduleDTO busScheduleDTO)
        {
            var busSchedules = await _context.BusSchedules
                .Where(bs => bs.BusScheduleID == id)
                .ToListAsync();

            if (!busSchedules.Any())
            {
                return Ok("No schedules to update.");
            }

            var passengers = new List<dynamic>
            {
                new { fullname = "yuki", email = "yuki@gmail.com" },
                new { fullname = "jezlyn", email = "jezlyn@gmail.com" }
            };

            foreach (var busSchedule in busSchedules)
            {
                busSchedule.ScheduleStatus = "Delayed";
                busSchedule.ETD = ParseTimeSpan(busScheduleDTO.ETD);
                busSchedule.ETA = ParseTimeSpan(busScheduleDTO.ETA);
                busSchedule.Reasons = busScheduleDTO.Reasons;

                string emailMessage = $"Dear {{PassengerName}},\n\n" +
                    $"We regret to inform you that your bus scheduled for {busSchedule.TravelDate:yyyy-MM-dd} has been delayed.\n\n" +
                    $"The latest estimated departure time (ETD) is {busSchedule.ETD:hh\\:mm} and the latest estimated arrival time (ETA) is {busSchedule.ETA:hh\\:mm}.\n\n" +
                    $"Thank you for your understanding.";

                foreach (var passenger in passengers)
                {
                    string personalizedEmailMessage = emailMessage.Replace("{{PassengerName}}", passenger.fullname);
                    // await SendEmail(passenger.email, personalizedEmailMessage);
                }

                await _context.SaveChangesAsync();
            }

            return Ok($"Updated {busSchedules.Count} schedules to 'Delayed'.");
        }
        #endregion

        #region UpdateCanceledStatus
        // PUT: api/BusSchedule/UpdateCanceledStatus/{id}
        [HttpPut("UpdateCanceledStatus/{id}")]
        public async Task<IActionResult> UpdateCanceledStatus(int id, BusScheduleDTO busScheduleDTO)
        {
            var busSchedules = await _context.BusSchedules
                .Where(bs => bs.BusScheduleID == id)
                .ToListAsync();

            if (!busSchedules.Any())
            {
                return Ok("No schedules to update.");
            }

            // No cancellation is allowed on the travel date.
            foreach (var busSchedule in busSchedules)
            {
                if (busSchedule.TravelDate.Date == DateTime.Now.Date)
                {
                    return BadRequest("Cancellation is not allowed on the travel date.");
                }
            }

            var passengers = new List<dynamic>
            {
                new { fullname = "yuki", email = "yuki@gmail.com" },
                new { fullname = "jezlyn", email = "jezlyn@gmail.com" }
            };

            foreach (var busSchedule in busSchedules)
            {
                busSchedule.ScheduleStatus = "Canceled";
                busSchedule.ETD = ParseTimeSpan(busScheduleDTO.ETD);
                busSchedule.ETA = ParseTimeSpan(busScheduleDTO.ETA);
                busSchedule.Reasons = busScheduleDTO.Reasons;

                string emailMessage = $"Dear {{PassengerName}},\n\n" +
                    $"We regret to inform you that your bus scheduled for {busSchedule.TravelDate:yyyy-MM-dd} has been canceled.\n\n" +
                    $"The latest estimated departure time (ETD) is {busSchedule.ETD:hh\\:mm} and the latest estimated arrival time (ETA) is {busSchedule.ETA:hh\\:mm}.\n\n" +
                    $"Thank you for your understanding.";

                foreach (var passenger in passengers)
                {
                    string personalizedEmailMessage = emailMessage.Replace("{{PassengerName}}", passenger.fullname);
                    // await SendEmail(passenger.email, personalizedEmailMessage);
                }

                await _context.SaveChangesAsync();
            }

            return Ok($"Updated {busSchedules.Count} schedules to 'Delayed'.");
        }
        #endregion

        #region UpdateCompletedStatus
        // PUT: api/BusSchedule/UpdateCompletedStatus
        [HttpPut("UpdateCompletedStatus")]
        public async Task<IActionResult> UpdateCompletedStatus()
        {
            var currentTime = DateTime.Now.TimeOfDay;
            var currentDate = DateTime.Now.Date;

            var busSchedules = await _context.BusSchedules
                .Where(bs => bs.ScheduleStatus == "En Route"
                     && bs.TravelDate.Date == currentDate
                     && (bs.ETD == currentTime))
                .ToListAsync();

            if (!busSchedules.Any())
            {
                return Ok("No schedules to update.");
            }

            foreach (var schedule in busSchedules)
            {
                schedule.ScheduleStatus = "Completed";
            }

            await _context.SaveChangesAsync();

            return Ok($"Updated {busSchedules.Count} schedules to 'Completed'.");
        }
        #endregion

        private bool BusScheduleExists(int id)
        {
            return _context.BusSchedules.Any(e => e.BusScheduleID == id);
        }

        private TimeSpan ParseTimeSpan(string timeString)
        {
            if (TimeSpan.TryParse(timeString, out var parsedTime))
            {
                return parsedTime;
            }

            throw new ArgumentException("Invalid time format.");
        }

        private async Task SendEmail(string email, string message)
        {
            // Logic for send email
        }
    }
}