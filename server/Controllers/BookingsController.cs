using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
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

        // POST: api/Bookings
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(BookingDto bookingDto)
        {
            if (!_context.BusSchedules.Any(bs => bs.BusScheduleID == bookingDto.BusScheduleID))
            {
                return BadRequest("Invalid bus schedule id.");
            }

            var alreadyBookedSeats = _context.Seats
                .Where(s => bookingDto.seatNumbers.Contains(s.SeatNumber) && s.Booking.BusScheduleID == bookingDto.BusScheduleID)
                .Select(s => s.SeatNumber)
                .ToList();

            if (alreadyBookedSeats.Any())
            {
                return BadRequest($"The following seats are already occupied: {string.Join(", ", alreadyBookedSeats)}");
            }

            var booking = new Booking
            {
                BusScheduleID = bookingDto.BusScheduleID,
                PassengerID = bookingDto.PassengerID,
                BookingStatus = bookingDto.BookingStatus,
                AmountPaid = bookingDto.AmountPaid,
                BookingDate = bookingDto.BookingDate,
                CreatedAt = bookingDto.CreatedAt,
                UpdatedAt = bookingDto.UpdatedAt
            };

            _context.Booking.Add(booking);

            foreach (var seat in bookingDto.seatNumbers)
            {
                var bookingSeat = new Seat
                {
                    BookingID = booking.BookingID,
                    SeatNumber = seat
                };

                _context.Seats.Add(bookingSeat);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingID }, booking);
        }

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
