using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto.Auth;
using server.Helper;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusOperatorController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly EmailService _emailService;

        public BusOperatorController(ApplicationDbContext context, UserManager<User> userManager, EmailService emailService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
        }

        #region Update BusOperator API
        [HttpPut("update-bus-operator/{id}")]
        public async Task<IActionResult> UpdateBusOperator(string id, [FromBody] BusOperator busOperator)
        {
            var busOperatorRoleId = await _context.Roles
                .Where(r => r.Name == "BusOperator")
                .Select(r => r.Id)
                .FirstOrDefaultAsync();

            if (busOperatorRoleId == null)
            {
                return BadRequest(new { message = "BusOperator role not found." });
            }

            var existBusOperator = await (from user in _context.Users
                                     join userRole in _context.UserRoles on user.Id equals userRole.UserId
                                     where userRole.RoleId == busOperatorRoleId && user.Id == id
                                     select user).OfType<BusOperator>()
                                      .FirstOrDefaultAsync();

            if (existBusOperator == null)
            {
                return NotFound(new { message = $"Bus operator with ID {id} not found." });
            }

            // Update the BusOperator properties
            existBusOperator.Fullname = busOperator.Fullname;
            existBusOperator.PhoneNumber = busOperator.PhoneNumber;
            existBusOperator.Address = busOperator.Address;
            existBusOperator.CompanyLogo = busOperator.CompanyLogo;
            existBusOperator.BusImages = busOperator.BusImages;
            existBusOperator.Bio = busOperator.Bio;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = $"Bus operator with ID {id} has been successfully updated." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the bus operator.", details = ex.Message });
            }
        }
        #endregion

        #region Update BusOperator Status API
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateBusOperatorStatus(string id, [FromBody] string status)
        {
            if (string.IsNullOrEmpty(status))
            {
                return BadRequest(new { message = "Status cannot be empty." });
            }

            var busOperatorRoleId = await _context.Roles
                .Where(r => r.Name == "BusOperator")
                .Select(r => r.Id)
                .FirstOrDefaultAsync();

            if (busOperatorRoleId == null)
            {
                return BadRequest(new { message = "BusOperator role not found." });
            }

            var busOperator = await (from user in _context.Users
                                     join userRole in _context.UserRoles on user.Id equals userRole.UserId
                                     where userRole.RoleId == busOperatorRoleId && user.Id == id
                                     select user).OfType<BusOperator>()
                                      .FirstOrDefaultAsync();

            if (busOperator == null)
            {
                return NotFound(new { message = $"Bus operator with ID {id} not found." });
            }

            busOperator.Status = status;

            await _context.SaveChangesAsync();

            return Ok(new { message = $"Status of bus operator with ID {id} has been updated to {status}." });
        }
        #endregion

        #region Generate Return Message for Rejected Application Method
        private async Task SendRejectEmail(string name, string email)
        {
            var subject = "Your Bus Operator Application Status";
            var message = $"Dear {name},\n\nWe regret to inform you that your bus operator application has been rejected.\n\nThank you for your interest.\n\nBest regards,\nTeam RideNGo";
            await _emailService.SendEmailAsync(email, email, subject, message);
            
        }
        #endregion

        #region Reject Bus Operator Application API
        [HttpPut("reject-application/{id}")]
        public async Task<IActionResult> RejectApplication(string id)
        {
            var busOperator = await _context.Users
                .Where(user => user.Id == id)
                .OfType<BusOperator>()
                .FirstOrDefaultAsync();

            if (busOperator == null)
            {
                return NotFound(new { message = $"Bus operator with ID {id} not found." });
            }

            busOperator.Status = "Inactive";
            await _context.SaveChangesAsync();

            try
            {
                await SendRejectEmail(busOperator.UserName, busOperator.Email);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to send rejection email.", error = ex.Message });
            }

            return Ok(new { message = $"Application has been rejected for Bus operator with ID {id}." });
        }
        #endregion

        #region GET all Bus Operators Count with Status Filter
        // GET: api/BusOperators/count?status=Active
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetBusOperatorsCount([FromQuery] string status)
        {

            if (string.IsNullOrEmpty(status))
            {
                return BadRequest(new { message = "Status parameter is required." });
            }

            var validStatuses = new List<string> { "Active", "Inactive", "Pending"};

            if (!validStatuses.Contains(status))
            {
                return BadRequest(new { message = "Invalid status parameter." });
            }

            var busOperatorRoleId = await _context.Roles
                .Where(r => r.Name == "BusOperator")
                .Select(r => r.Id)
                .FirstOrDefaultAsync();

            if (busOperatorRoleId == null)
            {
                return BadRequest(new { message = "BusOperator role not found." });
            }

            var busOperatorsCount = await (from user in _context.Users
                                           join userRole in _context.UserRoles on user.Id equals userRole.UserId
                                           where userRole.RoleId == busOperatorRoleId && user.Status == status
                                           select user).CountAsync();

            return Ok(busOperatorsCount);
        }
        #endregion
    }
}
