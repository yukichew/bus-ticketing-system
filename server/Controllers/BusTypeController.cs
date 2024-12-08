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

        #region GetAllBusTypes
        // GET: api/BusType
        [HttpGet]
        public async Task<ActionResult> GetAllBusTypes()
        {
            var busTypes = await _context.Set<BusType>().ToListAsync();

            if (!busTypes.Any())
            {
                return Ok(new { message = "No bus types available." });
            }

            return Ok(busTypes);
        }
        #endregion

        #region GetBusType
        // GET: api/BusType/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusType>> GetBusType(int id)
        {
            var busType = await _context.Set<BusType>().FindAsync(id);

            if (busType == null)
            {
                return NotFound(new { message = $"Bus type with ID {id} not found." });
            }

            return Ok(busType);
        }
        #endregion

        #region GetFilteredBusType
        // GET: api/BusType/FilterBusType
        [HttpGet("FilterBusType")]
        public async Task<ActionResult> GetFilteredBusType(
            int? noOfSeats = null,
            string types = null,
            string status = null)
        {
            var query = _context.BusTypes.AsQueryable();

            if (noOfSeats.HasValue)
            {
                query = query.Where(b => b.NoOfSeats == noOfSeats.Value);
            }

            if (!string.IsNullOrEmpty(types))
            {
                query = query.Where(b => b.Types == types);
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(b => b.Status == status);
            }

            var busTypes = await query
                                .ToListAsync();

            if (!busTypes.Any())
            {
                return Ok(new { message = "No matching bus types found." });
            }

            return Ok(busTypes);
        }
        #endregion

        #region CreateBusType
        // POST: api/BusType
        [HttpPost]
        public async Task<ActionResult<BusType>> CreateBusType([FromBody] BusType busType)
        {
            if (busType == null)
            {
                return BadRequest(new { message = "Bus type information is required." });
            }

            _context.Set<BusType>().Add(busType);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBusType), new { id = busType.BusTypeID }, busType);
        }
        #endregion

        #region UpdateBusType
        // PUT: api/BusType/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusType(Guid id, [FromBody] BusType busType)
        {
            if (busType == null)
            {
                return NotFound(new { message = $"Bus type with ID {id} not found." });
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
                    return NotFound(new { message = $"Bus type with ID {id} does not exist." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "The selected bus type was successfully updated." });
        }
        #endregion

        #region DeleteBusType
        // DELETE: api/BusType/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusType(int id)
        {
            var busType = await _context.Set<BusType>().FindAsync(id);

            if (busType == null)
            {
                return NotFound(new { message = $"Bus type with ID {id} not found." });
            }

            _context.Set<BusType>().Remove(busType);
            await _context.SaveChangesAsync();

            return Ok(new { message = "The selected bus type was successfully deleted." });
        }
        #endregion
        private bool BusTypeExists(Guid id)
        {
            return _context.Set<BusType>().Any(e => e.BusTypeID == id);
        }
    }
}