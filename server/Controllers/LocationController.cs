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
            var location = await _context.Set<Locations>().ToListAsync();
            return Ok(location);
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
                return NotFound();
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
                return BadRequest();
            }

            _context.Set<Locations>().Add(location);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLocation), new { id = location.LocationID }, location);
        }
        #endregion

        #region UpdateLocation
        // PUT: api/Location/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLocation(int id, [FromBody] Locations location)
        {
            if (id != location.LocationID)
            {
                return BadRequest();
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
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("The selected location is successfully updated.");
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
                return NotFound();
            }

            _context.Set<Locations>().Remove(location);
            await _context.SaveChangesAsync();

            return Ok("The selected location is successfully deleted.");
        }
        #endregion

        private bool LocationExists(int id)
        {
            return _context.Set<Locations>().Any(e => e.LocationID == id);
        }
    }
}
