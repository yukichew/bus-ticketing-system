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

        // GET: api/BusInfo
        [HttpGet]
        public async Task<ActionResult> GetAllBus()
        {
            var busInfo = await _context.Set<BusInfo>()
                                .Include(b => b.BusType)
                                .ToListAsync();
            return Ok(busInfo);
        }

        // GET: api/BusInfo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusInfo>> GetBus(int id)
        {
            var busInfo = await _context.Set<BusInfo>()
                                .Include(b => b.BusType)
                                .FirstOrDefaultAsync(b => b.BusID == id);

            if (busInfo == null)
            {
                return NotFound();
            }

            return Ok(busInfo);
        }

        // POST: api/BusInfo
        [HttpPost]
        public async Task<ActionResult<BusInfo>> CreateBus([FromBody] BusInfo busInfo)
        {
            if (busInfo == null)
            {
                return BadRequest();
            }

            var busPlateExists = await _context.Set<BusInfo>().AnyAsync(b => b.BusPlate == busInfo.BusPlate);
            if (busPlateExists)
            {
                return Conflict($"A bus with the plate '{busInfo.BusPlate}' already exists.");
            }

            var busTypeExists = await _context.Set<BusType>().AnyAsync(bt => bt.BusTypeID == busInfo.BusTypeID);
            if (!busTypeExists)
            {
                return BadRequest($"BusType with ID {busInfo.BusTypeID} does not exist.");
            }

            _context.Set<BusInfo>().Add(busInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBus), new { id = busInfo.BusID }, busInfo);
        }

        // PUT: api/BusInfo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBus(int id, [FromBody] BusInfo busInfo)
        {
            if (id != busInfo.BusID)
            {
                return BadRequest();
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
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("The selected bus is successfully updated.");
        }

        // DELETE: api/BusInfo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBus(int id)
        {
            var busInfo = await _context.Set<BusInfo>().FindAsync(id);
            if (busInfo == null)
            {
                return NotFound();
            }

            _context.Set<BusInfo>().Remove(busInfo);
            await _context.SaveChangesAsync();

            return Ok("The selected bus is successfully deleted.");
        }

        private bool BusInfoExists(int id)
        {
            return _context.Set<BusInfo>().Any(e => e.BusID == id);
        }
    }
}
