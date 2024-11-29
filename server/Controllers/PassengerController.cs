//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using server.Data;
//using server.Models;

//namespace server.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class PassengerController : Controller
//    {
//        private readonly ApplicationDbContext _context;
//        private readonly UserManager<Passengers> _userManager;

//        public PassengerController(ApplicationDbContext context, UserManager<Passengers> userManager)
//        {
//            _context = context;
//            _userManager = userManager;
//        }

//        // GET: api/Passenger
//        [HttpGet]
//        public async Task<ActionResult> GetAllPassenger()
//        {
//            var passenger = await _context.Set<Passengers>().ToListAsync();
//            return Ok(passenger);
//        }

//        // GET: api/Passenger/{id}
//        [HttpGet("{id}")]
//        public async Task<ActionResult> GetPassenger(int id)
//        {
//            var passenger = await _context.Passengers.FindAsync(id);
//            if (passenger == null)
//                return NotFound();

//            return Ok(passenger);
//        }

//        // PUT: api/Passenger/{id}
//        [HttpPut("{id}")]
//        public async Task<ActionResult> UpdatePassenger(int id, [FromBody] Passengers passenger)
//        {
//            if (id != passenger.PassengerID)
//                return BadRequest("Passenger ID mismatch");

//            var existingPassenger = await _context.Passengers.FindAsync(id);
//            if (existingPassenger == null)
//                return NotFound();

//            existingPassenger.FullName = passenger.FullName;
//            existingPassenger.Email = passenger.Email;
//            existingPassenger.ContactNo = passenger.ContactNo;
//            existingPassenger.Status = passenger.Status;

//            if (!string.IsNullOrEmpty(passenger.PasswordHash))
//            {
//                var result = await _userManager.ChangePasswordAsync(existingPassenger, existingPassenger.PasswordHash, passenger.PasswordHash);

//                if (!result.Succeeded)
//                {
//                    return BadRequest(result.Errors);
//                }
//            }

//            await _context.SaveChangesAsync();

//            return Ok("The selected passenger is successfully updated.");
//        }

//        // DELETE: api/Passenger/{id}
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeletePassenger(int id)
//        {
//            var passenger = await _context.Passengers.FindAsync(id);
//            if (passenger == null)
//                return NotFound();

//            _context.Passengers.Remove(passenger);
//            await _context.SaveChangesAsync();

//            return Ok("The selected passenger is successfully deleted.");
//        }
//    }
//}