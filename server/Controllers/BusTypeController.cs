using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BusTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BusType
        [HttpGet]
        public async Task<ActionResult> GetAllBusTypes()
        {
            var busTypes = await _context.Set<BusType>().ToListAsync();
            return Ok(busTypes);
        }

        // GET: api/BusType/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusType>> GetBusType(int id)
        {
            var busType = await _context.Set<BusType>().FindAsync(id);
            if (busType == null)
            {
                return NotFound();
            }

            return Ok(busType);
        }

        // POST: api/BusType
        [HttpPost]
        public async Task<ActionResult<BusType>> CreateBusType([FromBody] BusType busType)
        {
            if (busType == null)
            {
                return BadRequest();
            }

            _context.Set<BusType>().Add(busType);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBusType), new { id = busType.BusTypeID }, busType);
        }

        // PUT: api/BusType/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusType(int id, [FromBody] BusType busType)
        {
            if (id != busType.BusTypeID)
            {
                return BadRequest("BusType ID mismatch");
            }

            _context.Entry(busType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("The selected bus type is successfully updated.");
        }

        // DELETE: api/BusType/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusType(int id)
        {
            var busType = await _context.Set<BusType>().FindAsync(id);
            if (busType == null)
            {
                return NotFound();
            }

            _context.Set<BusType>().Remove(busType);
            await _context.SaveChangesAsync();

            return Ok("The selected bus type is successfully deleted.");
        }

        private bool BusTypeExists(int id)
        {
            return _context.Set<BusType>().Any(e => e.BusTypeID == id);
        }
    }
}