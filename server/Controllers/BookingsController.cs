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

        // GET: api/Bookings/{busScheduleId}
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
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

            if (!_context.BusSchedules.Any(bs => bs.BusScheduleID == bookingDto.BusScheduleID))
            {
                return BadRequest(new { message = "Invalid bus schedule id." });
            }

            var seatNumbers = bookingDto.Seats.Select(seat => seat.SeatNumber).ToList();

            var alreadyBookedSeats = await _context.Seats
                .Where(s => seatNumbers.Contains(s.SeatNumber) && s.Booking.BusScheduleID == bookingDto.BusScheduleID)
                .Select(s => s.SeatNumber)
                .ToListAsync(); ;

            if (alreadyBookedSeats.Any())
            {
                return BadRequest(new { message = $"The following seats are already occupied: {string.Join(", ", alreadyBookedSeats)}" });
            }

            var booking = new Booking
            {
                BusScheduleID = bookingDto.BusScheduleID,
                BookingStatus = "Pending",
                AmountPaid = 0,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                BusSchedule = await _context.BusSchedules.FindAsync(bookingDto.BusScheduleID)
            };

            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();

            foreach (var seatDto in bookingDto.Seats)
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
            await transaction.CommitAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingID }, booking);
        }
        #endregion

        #region get booking by passenger id
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
                .Select(s => s.Booking)
                .ToListAsync();

            if (!bookings.Any())
            {
                return NotFound(new { message = "No bookings found." });
            }

            return Ok(bookings);
        }
        #endregion

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Booking.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Booking.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return _context.Booking.Any(e => e.BookingID == id);
        }
    }
}
