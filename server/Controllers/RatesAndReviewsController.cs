﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Models;
using System.Security.Claims;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatesAndReviewsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public RatesAndReviewsController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        #region GetAllRatesAndReviews
        // GET: api/RatesAndReviews
        [HttpGet]
        public async Task<ActionResult> GetAllRatesAndReviews()
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .Include(b => b.Booking.BusSchedule.PostedBy)
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
        public async Task<ActionResult<RatesAndReviews>> GetRatesAndReviews(Guid id)
        {
            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                                .Include(b => b.Booking)
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
        // GET: api/RatesAndReviews/BusOperator
        [Authorize(Policy = "BusOperatorOnly")]
        [HttpGet("BusOperator")]
        public async Task<ActionResult> GetRatesAndReviewsByBusOperatorID()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var busOperator = await _context.Set<BusOperator>().FirstOrDefaultAsync(b => b.Id == userId);
            if (busOperator == null || busOperator.Status != "Active")
            {
                return Unauthorized(new { message = "Only active BusOperators can get buses details." });
            }

            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .Include(b => b.Booking)
                .Where(r => r.Status != "Inactive" && r.Booking.BusSchedule.PostedBy.Id == busOperator.Id)
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

        #region Get active rates and reviews api
        // GET: api/RatesAndReviews/BusOperator/Active/{busOperatorID}
        [HttpGet("Active/{busOperatorID}")]
        public async Task<ActionResult> GetActiveRatesAndReviewsByBusOperatorID(string busOperatorID)
        {
            var activeRatesAndReviews = await _context.Set<RatesAndReviews>()
                .Include(r => r.Booking)
                .ThenInclude(b => b.BusSchedule)
                .Where(r => r.Status == "Active" && r.Booking.BusSchedule.PostedBy.Id == busOperatorID)
                .OrderByDescending(r => r.PostedAt)
                .ToListAsync();
            if (!activeRatesAndReviews.Any())
            {
                return NotFound(new { message = "No active rates and reviews found for the specified bus operator." });
            }
            return Ok(activeRatesAndReviews);
        }
        #endregion

        #region Add rates and reviews api
        // POST: api/RatesAndReviews
        [Authorize(Policy = "MemberOnly")]
        [HttpPost]
        public async Task<ActionResult> AddRatesAndReviews([FromBody] RatesAndReviewsDTO ratesAndReviewsDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var booking = await _context.Booking.FindAsync(ratesAndReviewsDto.BookingId);
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found." });
            }

            if (!booking.BookingStatus.Equals("Confirmed"))
            {
                return BadRequest(new { message = "You can only review a completed booking." });
            }

            var passenger = await _context.Passenger.FirstOrDefaultAsync(p => p.Email == user.Email);
            if (passenger == null)
            {
                return NotFound(new { message = "Passenger not found." });
            }

            var existingReview = await _context.RatesAndReviews
                .FirstOrDefaultAsync(r => r.BookingID == ratesAndReviewsDto.BookingId && r.PostedById == passenger.PassengerID);

            if (existingReview != null)
            {
                return Conflict(new { message = "You have already posted a review for this booking." });
            }

            var ratesAndReviews = new RatesAndReviews
            {
                BookingID = ratesAndReviewsDto.BookingId,
                Booking = booking,
                Comment = ratesAndReviewsDto.Comment,
                Rate = ratesAndReviewsDto.Rate,
                PostedById = passenger.PassengerID,
                PostedAt = DateTime.Now,
                Status = ratesAndReviewsDto.Status
            };

            _context.RatesAndReviews.Add(ratesAndReviews);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRatesAndReviews), new { id = ratesAndReviews.ID }, ratesAndReviews);
        }
        #endregion

        #region ReportRateAndReview
        // PUT: api/RatesAndReviews/UpdateReportedStatus/{id}
        [Authorize(Policy = "BusOperatorOnly")]
        [HttpPut("UpdateReportedStatus/{id}")]
        public async Task<IActionResult> UpdateReportedStatus(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var busOperator = await _context.Set<BusOperator>().FirstOrDefaultAsync(b => b.Id == userId);
            if (busOperator == null || busOperator.Status != "Active")
            {
                return Unauthorized(new { message = "Only active BusOperators can get buses details." });
            }

            var ratesAndReviews = await _context.Set<RatesAndReviews>()
                .FirstOrDefaultAsync(r => r.ID == id);

            if (ratesAndReviews == null)
            {
                return NotFound(new { message = "Rate and review not found." });
            }

            ratesAndReviews.Status = "Pending for Review";

            _context.Entry(ratesAndReviews).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "The review is Pending for Review now." });
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

        #region ApproveAndRejectRatesAndReviews
        [HttpPut("update-rate-review-status/{id}")]
        public async Task<IActionResult> UpdateRateReviewStatus(Guid id, [FromBody] string status)
        {
            if (string.IsNullOrEmpty(status))
            {
                return BadRequest(new { message = "Status cannot be empty." });
            }

            var rateReview = await _context.RatesAndReviews
                .FirstOrDefaultAsync(rr => rr.ID == id);

            if (rateReview == null)
            {
                return NotFound(new { message = $"Rates and Review with ID {id} not found." });
            }

            rateReview.Status = status;

            await _context.SaveChangesAsync();

            return Ok(new { message = $"Status of Rates and Review with ID {id} has been updated to {status}." });
        }
        #endregion

        #region GET total reported reviews
        // GET: api/RatesAndReviews/count/pending
        [HttpGet("count/pending")]
        public async Task<ActionResult<int>> GetPendingForReviewCount()
        {
            
            var count = await _context.Set<RatesAndReviews>()
                                       .Where(r => r.Status == "Pending for Review")
                                       .CountAsync();

            return Ok(count);
        }
        #endregion
    }
}