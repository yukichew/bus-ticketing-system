using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Models;
using System.Collections.Generic;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public BookingsController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
            return await _context.Booking.ToListAsync();
        }

        #region get booking by bus schedule id api
        // GET: api/Bookings/{bookingID}
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(Guid id)
        {
            var booking = await _context.Booking.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }
        #endregion

        #region buy bus ticket api
        // POST: api/Bookings
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(BookingDto bookingDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            var onwardSeats = bookingDto.OnwardTrip.Seats.Select(seat => seat.SeatNumber).ToList();
            var returnSeats = bookingDto.ReturnTrip?.Seats.Select(seat => seat.SeatNumber).ToList();

            // Check seat availability for onward trip
            var onwardAlreadyBooked = await _context.Seats
                .Where(s => onwardSeats.Contains(s.SeatNumber) && s.Booking.BusScheduleID == bookingDto.OnwardTrip.BusScheduleID)
                .Select(s => s.SeatNumber)
                .ToListAsync();

            if (onwardAlreadyBooked.Any())
            {
                throw new Exception($"The following seats for the onward trip are already occupied: {string.Join(", ", onwardAlreadyBooked)}");
            }

            // Check seat availability for return trip
            if (returnSeats != null)
            {
                var returnAlreadyBooked = await _context.Seats
                    .Where(s => returnSeats.Contains(s.SeatNumber) && s.Booking.BusScheduleID == bookingDto.ReturnTrip.BusScheduleID)
                    .Select(s => s.SeatNumber)
                    .ToListAsync();

                if (returnAlreadyBooked.Any())
                {
                    throw new Exception($"The following seats for the return trip are already occupied: {string.Join(", ", returnAlreadyBooked)}");
                }
            }

            var onwardBooking = await CreateBooking(bookingDto.OnwardTrip.BusScheduleID, bookingDto.OnwardTrip.AmountPaid, bookingDto.OnwardTrip.Seats);

            // Create booking
            var booking = new Booking
            {
                BusScheduleID = bookingDto.OnwardTrip.BusScheduleID,
                BookingStatus = "Pending",
                AmountPaid = bookingDto.OnwardTrip.AmountPaid + (bookingDto.ReturnTrip?.AmountPaid ?? 0),
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                ReturnBusScheduleID = bookingDto.ReturnTrip?.BusScheduleID,
                BusSchedule = await _context.BusSchedules.FindAsync(bookingDto.OnwardTrip.BusScheduleID),
                ReturnBusSchedule = bookingDto.ReturnTrip != null ? await _context.BusSchedules.FindAsync(bookingDto.ReturnTrip.BusScheduleID) : null
            };

            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();

            // Add passengers and seats for onward trip
            foreach (var seatDto in bookingDto.OnwardTrip.Seats)
            {
                await AddSeatAndPassenger(seatDto, booking.BookingID);
            }

            // Add passengers and seats for return trip, if applicable
            if (bookingDto.ReturnTrip != null)
            {
                foreach (var seatDto in bookingDto.ReturnTrip.Seats)
                {
                    await AddSeatAndPassenger(seatDto, booking.BookingID, isReturn: true);
                }
            }

            await transaction.CommitAsync();

            return Ok(new { bookingID = booking.BookingID });
        }
        #endregion

        #region add seats to booking method
        private async Task AddSeatAndPassenger(SeatDto seatDto, Guid bookingID, bool isReturn = false)
        {
            var passenger = new Passenger
            {
                Fullname = seatDto.Passenger.Fullname,
                Email = seatDto.Passenger.Email,
                PhoneNumber = seatDto.Passenger.PhoneNumber
            };
            _context.Passenger.Add(passenger);
            await _context.SaveChangesAsync();

            var bookingSeat = new Seat
            {
                BookingID = bookingID,
                SeatNumber = seatDto.SeatNumber,
                Passenger = passenger,
                Status = isReturn ? "Reserved (Return)" : "Reserved"
            };
            _context.Seats.Add(bookingSeat);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region create booking method
        private async Task<Booking> CreateBooking(Guid scheduleID, double amount, List<SeatDto> seats)
        {
            var seatNumbers = seats.Select(seat => seat.SeatNumber).ToList();

            var alreadyBookedSeats = await _context.Seats
                .Where(s => seatNumbers.Contains(s.SeatNumber) && s.Booking.BusScheduleID == scheduleID)
                .Select(s => s.SeatNumber)
                .ToListAsync();

            if (alreadyBookedSeats.Any())
            {
                throw new Exception($"The following seats are already occupied: {string.Join(", ", alreadyBookedSeats)}");
            }

            var booking = new Booking
            {
                BusScheduleID = scheduleID,
                BookingStatus = "Pending",
                AmountPaid = amount,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                BusSchedule = await _context.BusSchedules.FindAsync(scheduleID)
            };

            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();

            foreach (var seatDto in seats)
            {
                var passenger = new Passenger
                {
                    Fullname = seatDto.Passenger.Fullname,
                    Email = seatDto.Passenger.Email,
                    PhoneNumber = seatDto.Passenger.PhoneNumber
                };
                _context.Passenger.Add(passenger);
                await _context.SaveChangesAsync();

                var bookingSeat = new Seat
                {
                    BookingID = booking.BookingID,
                    SeatNumber = seatDto.SeatNumber,
                    Passenger = passenger,
                    Status = "Reserved"
                };
                _context.Seats.Add(bookingSeat);
            }
            await _context.SaveChangesAsync();

            return booking;
        }
        #endregion

        #region get booking history api by passenger email
        // GET: api/Bookings/History/Filters?status={status}&busOperator={busOperator}&originState={originState}&destinationState={destinationState}&travelDate={travelDate}
        [Authorize(Policy = "MemberOnly")]
        [HttpGet("History/FilterBookings")]
        public async Task<ActionResult> FilterBookings(
            [FromQuery] string status = null,
            [FromQuery] string busOperator = null,
            [FromQuery] string originState = null,
            [FromQuery] string destinationState = null,
            [FromQuery] DateTime? travelDate = null,
            [FromQuery] int page = 1,
            [FromQuery] int limit = 5
        )
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var query = _context.Seats
                .Where(s => s.Passenger != null && s.Passenger.Email.ToLower() == user.Email.ToLower())
                .Include(s => s.Booking)
                .ThenInclude(b => b.BusSchedule.Routes)
                .AsQueryable();

            if (!string.IsNullOrEmpty(originState))
            {
                query = query.Where(s => EF.Functions.Like(s.Booking.BusSchedule.Routes.BoardingLocation.State, $"%{originState}%"));
            }

            if (!string.IsNullOrEmpty(destinationState))
            {
                query = query.Where(s => EF.Functions.Like(s.Booking.BusSchedule.Routes.ArrivalLocation.State, $"%{destinationState}%"));
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(s => s.Booking.BookingStatus == status);
            }

            if (travelDate.HasValue)
            {
                query = query.Where(s => s.Booking.BusSchedule.TravelDate.Date == travelDate.Value.Date);
            }

            if (!string.IsNullOrEmpty(busOperator))
            {
                query = query.Where(s => s.Booking.BusSchedule.PostedBy.Fullname.Equals(busOperator, StringComparison.OrdinalIgnoreCase));
            }

            var totalCount = await query.CountAsync();
            var bookings = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .Select(s => new
                {
                    seatNumber = s.SeatNumber,
                    booking = s.Booking
                }).ToListAsync();

            if (bookings.Count == 0)
            {
                return Ok(new { message = "No bookings found." });
            }

            return Ok(new
            {
                bookings,
                totalCount,
                totalPages = (int)Math.Ceiling((double)totalCount / limit),
                currentPage = page
            });
        }
        #endregion

        private bool BookingExists(Guid id)
        {
            return _context.Booking.Any(e => e.BookingID == id);
        }
    }
}
