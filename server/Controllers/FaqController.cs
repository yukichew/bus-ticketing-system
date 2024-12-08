using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaqController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FaqController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region GET all FAQs
        [HttpGet("all")]
        public async Task<IActionResult> GetAllFaqs()
        {
            var faqs = await _context.Faqs.ToListAsync();
            return Ok(faqs);
        }
        #endregion

        #region GET all active FAQs
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveFaqs()
        {
            var activeFaqs = await _context.Faqs
                                           .Where(f => f.Status == "Active")
                                           .ToListAsync();
            return Ok(activeFaqs);
        }
        #endregion

        #region GET a single FAQ
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFaq(Guid id)
        {
            var faq = await _context.Faqs.FindAsync(id);
            if (faq == null) return NotFound();
            return Ok(faq);
        }
        #endregion

        #region POST - Create a new FAQ
        [HttpPost]
        public async Task<IActionResult> CreateFaq([FromBody] Faq faq)
        {
            faq.CreatedAt = DateTime.Now;
            faq.Status = "Active";
            _context.Faqs.Add(faq);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFaq), new { id = faq.FaqId }, new
            {
                faqId = faq.FaqId,
                question = faq.Question,
                answer = faq.Answer
            });
        }
        #endregion

        #region PUT - Update a FAQ
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFaq(Guid id, [FromBody] Faq faq)
        {
            if (id != faq.FaqId) return BadRequest();

            var existingFaq = await _context.Faqs.FindAsync(id);

            if (existingFaq == null)
                return NotFound();

            existingFaq.Question = faq.Question ?? existingFaq.Question;
            existingFaq.Answer = faq.Answer ?? existingFaq.Answer;
            existingFaq.Category = faq.Category ?? existingFaq.Category;
            existingFaq.Status = faq.Status ?? existingFaq.Status;

            existingFaq.UpdatedAt = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Faqs.AnyAsync(e => e.FaqId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return Ok(new { success = true, message = "FAQ successfully updated." });
        }

        #endregion

        #region DELETE - Delete a FAQ
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaq(Guid id)
        {
            var faq = await _context.Faqs.FindAsync(id);
            if (faq == null) return NotFound();

            _context.Faqs.Remove(faq);
            await _context.SaveChangesAsync();

            return Ok("FAQ successfully deleted.");
        }
        #endregion
    }
}