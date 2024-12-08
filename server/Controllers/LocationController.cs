using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : Controller
    {
        private readonly ApplicationDbContext _context;

        public LocationController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region GetAllLocation
        // GET: api/Location
        [HttpGet]
        public async Task<ActionResult> GetAllLocation()
        {
            var locations = await _context.Set<Locations>().ToListAsync();

            if (!locations.Any())
            {
                return Ok(new { message = "No locations found." });
            }

            return Ok(locations);
        }
        #endregion

        #region GetLocation
        // GET: api/Location/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Locations>> GetLocation(int id)
        {
            var location = await _context.Set<Locations>().FindAsync(id);

            if (location == null)
            {
                return NotFound(new { message = $"Location with ID {id} not found." });
            }

            return Ok(location);
        }
        #endregion

        #region CreateLocation
        // POST: api/Location
        [HttpPost]
        public async Task<ActionResult<Locations>> CreateLocation([FromBody] Locations location)
        {
            if (location == null)
            {
                return BadRequest(new { message = "Invalid location data." });
            }

            _context.Set<Locations>().Add(location);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLocation), new { id = location.LocationID }, location);
        }
        #endregion

        #region UpdateLocation
        // PUT: api/Location/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLocation(Guid id, [FromBody] Locations location)
        {
            if (id != location.LocationID)
            {
                return BadRequest(new { message = "Location ID mismatch." });
            }

            _context.Entry(location).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
                {
                    return NotFound(new { message = $"Location with ID {id} does not exist." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "The selected location was successfully updated." });
        }
        #endregion

        #region DeleteLocation
        // DELETE: api/Location/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _context.Set<Locations>().FindAsync(id);

            if (location == null)
            {
                return NotFound(new { message = $"Location with ID {id} not found." });
            }

            _context.Set<Locations>().Remove(location);
            await _context.SaveChangesAsync();

            return Ok(new { message = "The selected location was successfully deleted." });
        }
        #endregion

        private bool LocationExists(Guid id)
        {
            return _context.Set<Locations>().Any(e => e.LocationID == id);
        }
    }
}
