using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusOperatorController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<BusOperator> _userManager;

        public BusOperatorController(ApplicationDbContext context, UserManager<BusOperator> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/BusOperator
        [HttpGet]
        public async Task<ActionResult> GetAllBusOperator()
        {
            var busOperators = await _context.Set<BusOperator>().ToListAsync();
            return Ok(busOperators);
        }

        // GET: api/BusOperator/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult> GetBusOperator(string id)
        {
            var busOperator = await _context.BusOperators
                .FirstOrDefaultAsync(b => b.Id == id);

            if (busOperator == null)
            {
                return NotFound(new { message = $"Bus Operator with ID {id} not found." });
            }

            return Ok(busOperator);
        }

        // PUT: api/BusOperator/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusOperator(string id, [FromBody] BusOperator busOperator)
        {
            if (id != busOperator.Id)
                return BadRequest(new { message = "BusOperator ID mismatch" });

            var existingBusOperator = await _context.BusOperators.FindAsync(id);
            if (existingBusOperator == null)
                return NotFound(new { message = $"Bus operator with ID {id} not found." });

            existingBusOperator.Address = busOperator.Address ?? existingBusOperator.Address;
            existingBusOperator.CompanyLogo = busOperator.CompanyLogo ?? existingBusOperator.CompanyLogo;
            existingBusOperator.BusImages = busOperator.BusImages ?? existingBusOperator.BusImages;
            existingBusOperator.Bio = busOperator.Bio ?? existingBusOperator.Bio;
            existingBusOperator.IsRefundable = busOperator.IsRefundable ?? existingBusOperator.IsRefundable;
            existingBusOperator.Status = busOperator.Status ?? existingBusOperator.Status;

            await _context.SaveChangesAsync();

            return Ok(new { message = $"Bus operator with ID {id} has been updated successfully." });
        }

        // DELETE: api/BusOperator/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusOperator(string id)
        {
            var busOperator = await _context.BusOperators.FindAsync(id);

            if (busOperator == null)
            {
                return NotFound($"Bus operator with ID {id} not found.");
            }

            _context.BusOperators.Remove(busOperator);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Bus operator with ID {id} has been deleted successfully." });
        }
    }
}
