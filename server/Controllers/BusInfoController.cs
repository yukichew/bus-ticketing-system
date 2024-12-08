using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusInfoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BusInfoController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region GetAllBus
        // GET: api/BusInfo
        [HttpGet]
        public async Task<ActionResult> GetAllBus()
        {
            var busInfo = await _context.Set<BusInfo>()
                        .Include(b => b.BusType)
                        .ToListAsync();

            var totalBuses = busInfo.Count;

            var response = new
            {
                totalBuses,
                busInfo
            };

            return Ok(response);
        }
        #endregion

        #region GetBus
        // GET: api/BusInfo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusInfo>> GetBus(Guid id)
        {
            var busInfo = await _context.Set<BusInfo>()
                                .Include(b => b.BusType)
                                .FirstOrDefaultAsync(b => b.BusID == id);

            if (busInfo == null)
            {
                return BadRequest(new { message = "Bus not found." });
            }

            return Ok(busInfo);
        }
        #endregion

        #region GetFilteredBusInfo
        // GET: api/BusInfo/FilterBusInfo
        [HttpGet("FilterBusInfo")]
        public async Task<ActionResult> GetFilteredBusInfo(
            string busPlate = null,
            string busType = null,
            int? noOfSeats = null,
            string status = null)
        {
            var query = _context.BusInfo.AsQueryable();

            if (!string.IsNullOrEmpty(busPlate))
            {
                query = query.Where(b => EF.Functions.Like(b.BusPlate, $"%{busPlate}%"));
            }

            if (!string.IsNullOrEmpty(busType))
            {
                query = query.Where(b => b.BusType.Types == busType);
            }

            if (noOfSeats.HasValue)
            {
                query = query.Where(b => b.BusType.NoOfSeats == noOfSeats.Value);
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(b => b.Status == status);
            }

            var busInfo = await query
                                .Include(b => b.BusType)
                                .ToListAsync();

            if (busInfo.Count == 0)
            {
                return Ok(new { message = "No relevant data found." });
            }

            return Ok(busInfo);
        }
        #endregion

        #region CreateBus
        // POST: api/BusInfo
        [HttpPost]
        public async Task<ActionResult<BusInfo>> CreateBus([FromBody] BusInfo busInfo)
        {
            if (busInfo == null)
            {
                return BadRequest(new { message = "Invalid bus data." });
            }

            var busPlateExists = await _context.Set<BusInfo>().AnyAsync(b => b.BusPlate == busInfo.BusPlate);
            if (busPlateExists)
            {
                return BadRequest(new { message = $"A bus with the plate '{busInfo.BusPlate}' already exists." });
            }

            var busTypeExists = await _context.Set<BusType>().AnyAsync(bt => bt.BusTypeID == busInfo.BusTypeID);
            if (!busTypeExists)
            {
                return BadRequest(new { message = $"BusType with ID {busInfo.BusTypeID} does not exist." });
            }

            _context.Set<BusInfo>().Add(busInfo);
            await _context.SaveChangesAsync();

            //return CreatedAtAction(nameof(GetBus), new { id = busInfo.BusID }, busInfo);
            return Ok("Bus successfully created.");
        }
        #endregion

        #region UpdateBus
        // PUT: api/BusInfo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBus(Guid id, [FromBody] BusInfo busInfo)
        {
            if (id != busInfo.BusID)
            {
                return BadRequest(new { message = "Bus ID mismatch." });
            }

            _context.Entry(busInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusInfoExists(id))
                {
                    return BadRequest(new { message = "Bus not found." });
                }
                else
                {
                    throw;
                }
            }

            return Ok("The selected bus is successfully updated.");
        }
        #endregion

        #region DeleteBus
        // DELETE: api/BusInfo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBus(int id)
        {
            var busInfo = await _context.Set<BusInfo>().FindAsync(id);
            if (busInfo == null)
            {
                return BadRequest(new { message = "Bus not found." });
            }

            _context.Set<BusInfo>().Remove(busInfo);
            await _context.SaveChangesAsync();

            return Ok("The selected bus is successfully deleted.");
        }
        #endregion

        private bool BusInfoExists(Guid id)
        {
            return _context.Set<BusInfo>().Any(e => e.BusID == id);
        }
    }
}
