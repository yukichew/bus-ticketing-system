using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeatController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Seat?busScheduleId={busScheduleId}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seat>>> FilterSeats([FromQuery] string busScheduleId)
        {
            Guid busScheduleGuid = Guid.Empty;
            if (!string.IsNullOrEmpty(busScheduleId) && !Guid.TryParse(busScheduleId, out busScheduleGuid))
            {
                return BadRequest("Invalid bus schedule ID");
            }

            var query = _context.Seats.AsQueryable();

            if (!string.IsNullOrEmpty(busScheduleId))
            {
                query = query.Where(s => s.Booking.BusScheduleID == busScheduleGuid);
            }

            query = query.Where(s => s.Status == "Occupied");

            var seats = await query.ToListAsync();

            if (seats == null || seats.Count == 0)
            {
                return NotFound(new { message = "No seat found." });
            }

            return Ok(seats);
        }

    }
}
