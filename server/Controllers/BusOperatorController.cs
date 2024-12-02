//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using server.Data;
//using server.Models;

//namespace server.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class BusOperatorController : Controller
//    {
//        private readonly ApplicationDbContext _context;
//        private readonly UserManager<BusOperator> _userManager;

//        public BusOperatorController(ApplicationDbContext context, UserManager<BusOperator> userManager)
//        {
//            _context = context;
//            _userManager = userManager;
//        }

//        // GET: api/BusOperator
//        [HttpGet]
//        public async Task<ActionResult> GetAllBusOperator()
//        {
//            var busOperators = await _context.Set<BusOperator>().ToListAsync();
//            return Ok(busOperators);
//        }

//        // GET: api/BusOperator/{id}
//        [HttpGet("{id}")]
//        public async Task<ActionResult> GetBusOperator(int id)
//        {
//            var busOperator = await _context.BusOperators.FindAsync(id);
//            if (busOperator == null)
//            {
//                return NotFound();
//            }

//            return Ok(busOperator);
//        }

//        // POST: api/BusOperator
//        [HttpPost]
//        public async Task<ActionResult> CreateBusOperator([FromBody] BusOperator busOperator)
//        {
//            if (busOperator == null)
//                return BadRequest();

//            if (!string.IsNullOrEmpty(busOperator.PasswordHash))
//            {
//                var result = await _userManager.CreateAsync(busOperator, busOperator.PasswordHash);

//                if (!result.Succeeded)
//                {
//                    return BadRequest(result.Errors);
//                }
//            }

//            _context.BusOperators.Add(busOperator);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction(nameof(GetBusOperator), new { id = busOperator.BusOperatorID }, busOperator);
//        }

//        // PUT: api/BusOperator/{id}
//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateBusOperator(int id, [FromBody] BusOperator busOperator)
//        {
//            if (id != busOperator.BusOperatorID)
//                return BadRequest("BusOperator ID mismatch");

//            var existingBusOperator = await _context.BusOperators.FindAsync(id);
//            if (existingBusOperator == null)
//                return NotFound();

//            existingBusOperator.CompanyName = busOperator.CompanyName;
//            existingBusOperator.CompanyEmail = busOperator.CompanyEmail;
//            existingBusOperator.CompanyContact = busOperator.CompanyContact;
//            existingBusOperator.Address = busOperator.Address;
//            existingBusOperator.BusImages = busOperator.BusImages;
//            existingBusOperator.Bio = busOperator.Bio;
//            existingBusOperator.IsRefundable = busOperator.IsRefundable;
//            existingBusOperator.ServiceAndReputations = busOperator.ServiceAndReputations;
//            existingBusOperator.FullName = busOperator.FullName;
//            existingBusOperator.ContactNo = busOperator.ContactNo;
//            existingBusOperator.Status = busOperator.Status;

//            if (!string.IsNullOrEmpty(busOperator.PasswordHash))
//            {
//                var result = await _userManager.ChangePasswordAsync(existingBusOperator, existingBusOperator.PasswordHash, busOperator.PasswordHash);

//                if (!result.Succeeded)
//                {
//                    return BadRequest(result.Errors);
//                }
//            }

//            await _context.SaveChangesAsync();

//            return Ok("The selected bus operator is successfully updated.");
//        }

//        // DELETE: api/BusOperator/{id}
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteBusOperator(int id)
//        {
//            var busOperator = await _context.BusOperators.FindAsync(id);
//            if (busOperator == null)
//                return NotFound();

//            _context.BusOperators.Remove(busOperator);
//            await _context.SaveChangesAsync();

//            return Ok("The selected bus operator is successfully deleted.");
//        }
//    }
//}
