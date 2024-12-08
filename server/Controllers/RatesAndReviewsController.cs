using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatesAndReviewsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RatesAndReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region GetAllRatesAndReviews
        // GET: api/RatesAndReviews
        [HttpGet]
        public async Task<ActionResult> GetAllRatesAndReviews()
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .Include(b => b.BusOperator)
                .OrderByDescending(r => r.PostedAt)
                .ToListAsync();

            if (!ratesAndReviews.Any())
            {
                return Ok(new { message = "No rates and reviews found." });
            }

            var totalRatesAndReviews = ratesAndReviews.Count;

            var response = new
            {
                totalRatesAndReviews,
                ratesAndReviews
            };

            return Ok(response);
        }
        #endregion

        #region GetRatesAndReviews
        // GET: api/RatesAndReviews/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RatesAndReviews>> GetRatesAndReviews(int id)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                                .Include(b => b.BusOperator)
                                .OrderByDescending(r => r.PostedAt)
                                .FirstOrDefaultAsync(b => b.ID == id);

            if (ratesAndReviews == null)
            {
                return NotFound(new { message = $"Rate and review with ID {id} not found." });
            }

            return Ok(ratesAndReviews);
        }
        #endregion

        #region GetRatesAndReviewsByBusOperatorID
        // GET: api/RatesAndReviews/BusOperator/{busOperatorID}
        [HttpGet("BusOperator/{busOperatorID}")]
        public async Task<ActionResult> GetRatesAndReviewsByBusOperatorID(string busOperatorID)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .Include(b => b.BusOperator)
                .Where(r => r.BusOperatorID == busOperatorID)
                .OrderByDescending(r => r.PostedAt)
                .ToListAsync();

            if (!ratesAndReviews.Any())
            {
                return NotFound(new { message = "No rates and reviews found for the specified BusOperatorID." });
            }

            var totalRatesAndReviews = ratesAndReviews.Count;

            var response = new
            {
                totalRatesAndReviews,
                ratesAndReviews
            };

            return Ok(response);
        }
        #endregion

        #region AddRatesAndReviews
        // POST: api/RatesAndReviews
        [HttpPost]
        public async Task<ActionResult> AddRatesAndReviews([FromBody] RatesAndReviewsDTO ratesAndReviewsDto)
        {
            var busOperatorExists = await _context.BusOperators
                                                   .AnyAsync(b => b.Id == ratesAndReviewsDto.BusOperatorID);

            if (!busOperatorExists)
            {
                return BadRequest(new { message = "Invalid BusOperatorID." });
            }

            var ratesAndReviews = new RatesAndReviews
            {
                BusOperatorID = ratesAndReviewsDto.BusOperatorID,
                Comment = ratesAndReviewsDto.Comment,
                Rate = ratesAndReviewsDto.Rate,
                PostedById = ratesAndReviewsDto.PostedById,
                PostedAt = DateTime.Now,
                Status = ratesAndReviewsDto.Status
            };

            _context.RatesAndReviews.Add(ratesAndReviews);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRatesAndReviews), new { id = ratesAndReviews.ID }, ratesAndReviews);
        }
        #endregion

        #region UpdateRatesAndReviews
        // PUT: api/RatesAndReviews/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRatesAndReviews(int id, [FromBody] RatesAndReviewsDTO ratesAndReviewsDto)
        {
            var existingRatesAndReviews = await _context.RatesAndReviews.FindAsync(id);

            if (existingRatesAndReviews == null)
            {
                return NotFound(new { message = $"Rates and reviews with ID {id} not found." });
            }

            existingRatesAndReviews.BusOperatorID = ratesAndReviewsDto.BusOperatorID;
            existingRatesAndReviews.Comment = ratesAndReviewsDto.Comment;
            existingRatesAndReviews.Rate = ratesAndReviewsDto.Rate;
            existingRatesAndReviews.Status = ratesAndReviewsDto.Status;
            existingRatesAndReviews.PostedById = ratesAndReviewsDto.PostedById;

            _context.Entry(existingRatesAndReviews).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.RatesAndReviews.Any(r => r.ID == id))
                {
                    return NotFound(new { message = $"Rates and reviews with ID {id} not found." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "The selected rate and review is successfully updated." });
        }
        #endregion

        #region ReportRateAndReview
        // PUT: api/RatesAndReviews/UpdateReportedStatus/{id}
        [HttpPut("UpdateReportedStatus/{id}")]
        public async Task<IActionResult> UpdateReportedStatus(int id)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .FirstOrDefaultAsync(r => r.ID == id);

            if (ratesAndReviews == null)
            {
                return NotFound(new { message = "Rate and review not found." });
            }

            ratesAndReviews.Status = "Inactive";

            _context.Entry(ratesAndReviews).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "The review is Inactive now." });
        }
        #endregion

        #region DeleteRatesAndReviews
        // DELETE: api/RatesAndReviews/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRatesAndReviews(int id)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>().FindAsync(id);

            if (ratesAndReviews == null)
            {
                return NotFound(new { message = $"Rate and review with ID {id} not found." });
            }

            _context.Set<RatesAndReviews>().Remove(ratesAndReviews);
            await _context.SaveChangesAsync();

            return Ok(new { message = "The selected rate and review is successfully deleted." });
        }
        #endregion
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Models;
namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatesAndReviewsController : Controller
    {
        private readonly ApplicationDbContext _context;
        public RatesAndReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region GetAllRatesAndReviews
        // GET: api/RatesAndReviews
        [HttpGet]
        public async Task<ActionResult> GetAllRatesAndReviews()
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .Include(b => b.BusOperator)
                .OrderByDescending(r => r.PostedAt)
                .ToListAsync();
            var totalRatesAndReviews = ratesAndReviews.Count;
            var response = new
            {
                totalRatesAndReviews,
                ratesAndReviews
            };
            return Ok(response);
        }
        #endregion

        #region GetRatesAndReviews
        // GET: api/RatesAndReviews/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RatesAndReviews>> GetRatesAndReviews(Guid id)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                                .Include(b => b.BusOperator)
                                .OrderByDescending(r => r.PostedAt)
                                .FirstOrDefaultAsync(b => b.ID == id);
            if (ratesAndReviews == null)
            {
                return NotFound();
            }
            return Ok(ratesAndReviews);
        }
        #endregion

        #region GetRatesAndReviewsByBusOperatorID
        // GET: api/RatesAndReviews/BusOperator/{busOperatorID}
        [HttpGet("BusOperator/{busOperatorID}")]
        public async Task<ActionResult> GetRatesAndReviewsByBusOperatorID(string busOperatorID)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .Include(b => b.BusOperator)
                .Where(r => r.BusOperatorID == busOperatorID)
                .OrderByDescending(r => r.PostedAt)
                .ToListAsync();
            if (ratesAndReviews == null || !ratesAndReviews.Any())
            {
                return NotFound(new { message = "No rates and reviews found for the specified BusOperatorID." });
            }
            var totalRatesAndReviews = ratesAndReviews.Count;
            var response = new
            {
                totalRatesAndReviews,
                ratesAndReviews
            };
            return Ok(response);
        }
        #endregion

        #region AddRatesAndReviews
        // POST: api/RatesAndReviews
        [HttpPost]
        public async Task<ActionResult> AddRatesAndReviews([FromBody] RatesAndReviewsDTO ratesAndReviewsDto)
        {
            var busOperatorExists = await _context.BusOperators.AnyAsync(b => b.Id == ratesAndReviewsDto.BusOperatorID);
            if (!busOperatorExists)
            {
                return BadRequest("Invalid BusOperatorID");
            }
            var ratesAndReviews = new RatesAndReviews
            {
                BusOperatorID = ratesAndReviewsDto.BusOperatorID,
                Comment = ratesAndReviewsDto.Comment,
                Rate = ratesAndReviewsDto.Rate,
                PostedById = ratesAndReviewsDto.PostedById,
                PostedAt = DateTime.Now,
                Status = ratesAndReviewsDto.Status
            };
            _context.RatesAndReviews.Add(ratesAndReviews);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRatesAndReviews), new { id = ratesAndReviews.ID }, ratesAndReviews);
        }
        #endregion

        #region UpdateRatesAndReviews
        // PUT: api/RatesAndReviews/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRatesAndReviews(Guid id, [FromBody] RatesAndReviewsDTO ratesAndReviewsDto)
        {
            var existingRatesAndReviews = await _context.RatesAndReviews.FindAsync(id);
            if (existingRatesAndReviews == null)
            {
                return NotFound($"Rates and Reviews with ID {id} not found.");
            }
            existingRatesAndReviews.BusOperatorID = ratesAndReviewsDto.BusOperatorID;
            existingRatesAndReviews.Comment = ratesAndReviewsDto.Comment;
            existingRatesAndReviews.Rate = ratesAndReviewsDto.Rate;
            existingRatesAndReviews.Status = ratesAndReviewsDto.Status;
            existingRatesAndReviews.PostedById = ratesAndReviewsDto.PostedById;
            _context.Entry(existingRatesAndReviews).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.RatesAndReviews.Any(r => r.ID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok("The selected rate and review is successfully updated.");
        }
        #endregion

        #region ReportRateAndReview
        // PUT: api/RatesAndReviews/UpdateReportedStatus/{id}
        [HttpPut("UpdateReportedStatus/{id}")]
        public async Task<IActionResult> UpdateReportedStatus(Guid id)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .FirstOrDefaultAsync(r => r.ID == id);
            if (ratesAndReviews == null)
            {
                return NotFound(new { message = "Rate and review not found." });
            }
            ratesAndReviews.Status = "Inactive";
            _context.Entry(ratesAndReviews).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(new { message = "The review is Inactive now." });
        }
        #endregion

        #region DeleteRatesAndReviews
        // DELETE: api/RatesAndReviews/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRatesAndReviews(int id)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>().FindAsync(id);
            if (ratesAndReviews == null)
            {
                return NotFound();
            }
            _context.Set<RatesAndReviews>().Remove(ratesAndReviews);
            await _context.SaveChangesAsync();
            return Ok("The selected rate and review is successfully deleted.");
        }
        #endregion
    }
}