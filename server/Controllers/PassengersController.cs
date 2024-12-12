using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto.Bookings;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PassengersController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region get all passengers api
        // GET: api/Passengers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassenger()
        {
            return await _context.Passenger.ToListAsync();
        }
        #endregion

        #region get a single passenger api
        // GET: api/Passengers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passenger>> GetPassenger(Guid id)
        {
            var passenger = await _context.Passenger.FindAsync(id);

            if (passenger == null)
            {
                return NotFound(new { message = "Passenger not found." });
            }

            return Ok(passenger);
        }
        #endregion

        #region create a new passenger api
        // POST: api/Passengers
        [HttpPost]
        public async Task<ActionResult<Passenger>> PostPassenger(PassengerDto passengerDto)
        {
            var passenger = new Passenger
            {
                Email = passengerDto.Email,
                Fullname = passengerDto.Fullname,
                PhoneNumber = passengerDto.PhoneNumber
            };
            _context.Passenger.Add(passenger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassenger", new { id = passenger.PassengerID }, passenger);
        }
        #endregion

        #region check if passenger exists method
        private bool PassengerExists(Guid id)
        {
            return _context.Passenger.Any(e => e.PassengerID == id);
        }
        #endregion
    }
}
