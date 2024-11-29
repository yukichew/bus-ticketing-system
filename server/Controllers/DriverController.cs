using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DriverController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DriverController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Driver
        [HttpGet]
        public async Task<ActionResult> GetAllDrivers()
        {
            var drivers = await _context.Set<Driver>().ToListAsync();
            return Ok(drivers);
        }

        // GET: api/Driver/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Set<Driver>().FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            return Ok(driver);
        }

        // POST: api/Driver
        [HttpPost]
        public async Task<ActionResult<Driver>> CreateDriver([FromBody] Driver driver)
        {
            if (driver == null)
            {
                return BadRequest();
            }

            _context.Set<Driver>().Add(driver);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDriver), new { id = driver.DriverID }, driver);
        }

        // PUT: api/Driver/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDriver(int id, [FromBody] Driver driver)
        {
            if (id != driver.DriverID)
            {
                return BadRequest("Driver ID mismatch");
            }

            _context.Entry(driver).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("The selected driver is successfully updated.");
        }

        // DELETE: api/Driver/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context.Set<Driver>().FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Set<Driver>().Remove(driver);
            await _context.SaveChangesAsync();

            return Ok("The selected driver is successfully deleted.");
        }

        private bool DriverExists(int id)
        {
            return _context.Set<Driver>().Any(e => e.DriverID == id);
        }
    }
}
