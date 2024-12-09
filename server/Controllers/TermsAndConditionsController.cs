using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TermsAndConditionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TermsAndConditionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region GET all Terms & Conditions
        [HttpGet("all")]
        public async Task<IActionResult> GetAllTerms()
        {
            var terms = await _context.TermsAndConditions.ToListAsync();
            return Ok(terms);
        }
        #endregion

        #region GET all active Terms & Conditions
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveTerms()
        {
            var activeTerms = await _context.TermsAndConditions
                                             .Where(t => t.Status == "Active")
                                             .ToListAsync();
            return Ok(activeTerms);
        }
        #endregion

        #region GET a single Terms & Conditions entry
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingleTerm(int id)
        {
            var term = await _context.TermsAndConditions.FindAsync(id);
            if (term == null) return NotFound();

            return Ok(term);
        }
        #endregion

        #region POST - Create new Terms and Conditions
        [HttpPost]
        public async Task<IActionResult> CreateTerms([FromBody] TermsAndConditions terms)
        {
            terms.CreatedAt = DateTime.Now;
            terms.Status = "Active";
            _context.TermsAndConditions.Add(terms);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSingleTerm), new { id = terms.TACId }, terms);
        }
        #endregion

        #region PUT - Update Terms & Conditions
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTerms(Guid id, [FromBody] TermsAndConditions terms)
        {
            if (id != terms.TACId)
            {
                return BadRequest();
            }

            var existingTac = await _context.TermsAndConditions.FindAsync(id);

            if (existingTac == null)
            {
                Console.WriteLine($"No record found with ID {id}");
                return NotFound();
            }

            Console.WriteLine($"Before updating: UpdatedAt = {existingTac.UpdatedAt}");

            // Update fields
            existingTac.PolicyTitle = terms.PolicyTitle;
            existingTac.Terms = terms.Terms;
            existingTac.Status = terms.Status;
            existingTac.UpdatedAt = DateTime.Now;

            _context.Entry(existingTac).Property(e => e.UpdatedAt).IsModified = true;

            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine($"After SaveChanges: UpdatedAt = {existingTac.UpdatedAt}");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.TermsAndConditions.AnyAsync(e => e.TACId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return Ok("Terms and Conditions successfully updated.");
        }
        #endregion

        #region DELETE - Delete Terms and Conditions
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTerm(Guid id)
        {
            var term = await _context.TermsAndConditions.FindAsync(id);
            if (term == null) return NotFound();

            _context.TermsAndConditions.Remove(term);
            await _context.SaveChangesAsync();

            return Ok("Terms and Conditions successfully deleted.");
        }
        #endregion
    }
}
