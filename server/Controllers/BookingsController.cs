using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Dto.Booking;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
            return await _context.Booking.ToListAsync();
        }

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

        #region buy bus ticket
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

        // Helper to create a booking
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

        #region get booking by passenger email
        // GET: api/Bookings/History?email={email}
        [HttpGet("History")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingHistory([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "Email is required." });
            }

            var bookings = await _context.Seats
                .Where(s => s.Passenger != null && s.Passenger.Email.ToLower() == email.ToLower())
                .Include(s => s.Booking)
                .Select(s => new
                {
                    seatNumber = s.SeatNumber,
                    booking = s.Booking
                })
                .ToListAsync();

            if (!bookings.Any())
            {
                return NotFound(new { message = "No bookings found." });
            }

            return Ok(bookings);
        }
        #endregion

        private bool BookingExists(Guid id)
        {
            return _context.Booking.Any(e => e.BookingID == id);
        }
    }
}
