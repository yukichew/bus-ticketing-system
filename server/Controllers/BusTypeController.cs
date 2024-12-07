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
                return NotFound();
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

            var busType = await query
                                .ToListAsync();

            if (busType.Count == 0)
            {
                return Ok(new { message = "No relevant data found." });
            }

            return Ok(busType);
        }
        #endregion

        #region CreateBusType
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
        #endregion

        #region UpdateBusType
        // PUT: api/BusType/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusType(Guid id, [FromBody] BusType busType)
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
        #endregion

        #region ChangeBusTypeStatus
        // PUT: api/BusType/ChangeStatus/{id}
        [HttpPut("ChangeStatus/{id}")]
        public async Task<ActionResult> ChangeBusTypeStatus(int id, [FromBody] string newStatus)
        {
            var busType = await _context.BusTypes.FindAsync(id);

            if (busType == null)
            {
                return NotFound($"Bus type with ID {id} not found.");
            }

            busType.Status = newStatus;

            try
            {
                await _context.SaveChangesAsync();
                return Ok($"Bus type status updated to '{newStatus}' for BusType ID {id}.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
                return NotFound();
            }

            _context.Set<BusType>().Remove(busType);
            await _context.SaveChangesAsync();

            return Ok("The selected bus type is successfully deleted.");
        }
        #endregion
        private bool BusTypeExists(Guid id)
        {
            return _context.Set<BusType>().Any(e => e.BusTypeID == id);
        }
    }
}