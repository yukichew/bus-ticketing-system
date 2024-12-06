using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Models;
using Stripe;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public TransactionsController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        // GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransaction()
        {
            return await _context.Transaction.ToListAsync();
        }

        #region Check out using Stripe
        // POST: api/Transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> CheckOut(TransactionDto transactionDto)
        {
            var booking = await _context.Booking.FindAsync(transactionDto.BookingID);

            try
            {
                var stripeService = new PaymentIntentService();
                var paymentIntent = await stripeService.CreateAsync(new PaymentIntentCreateOptions
                {
                    Amount = (long)(transactionDto.Amount * 100),
                    Currency = "myr",
                    Metadata = new Dictionary<string, string>
            {
                { "BookingID", booking.BookingID.ToString() }
            }
                });

                var transaction = new Transaction
                {
                    BookingID = booking.BookingID,
                    PaymentIntentID = paymentIntent.Id,
                    Status = "Pending",
                    Amount = transactionDto.Amount,
                    CreatedAt = DateTime.Now,
                    Purpose = "Booking",
                    Booking = booking
                };
                _context.Transaction.Add(transaction);
                await _context.SaveChangesAsync();

                // Set a timer to release seats if payment is not completed
                _ = Task.Run(async () =>
                {
                    await Task.Delay(TimeSpan.FromMinutes(10));

                    var paymentStatus = await _context.Transaction
                        .Where(t => t.TransactionID == transaction.TransactionID)
                        .Select(t => t.Status)
                        .FirstOrDefaultAsync();

                    if (paymentStatus != "Succeeded")
                    {
                        var seatsToDelete = _context.Seats.Where(s => s.BookingID == booking.BookingID);
                        _context.Seats.RemoveRange(seatsToDelete);
                        booking.BookingStatus = "Cancelled";
                        _context.Booking.Update(booking);
                        await _context.SaveChangesAsync();
                    }
                });

                return Ok(new
                {
                    PaymentIntentClientSecret = paymentIntent.ClientSecret,
                    transaction
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
            }
        }
        #endregion

        #region Confirm transaction
        [HttpPost("ConfirmTransaction")]
        public async Task<IActionResult> ConfirmTransaction([FromBody] TransactionStatusDto statusDto)
        {
            var transaction = await _context.Transaction.FindAsync(statusDto.TransactionID);
            if (transaction == null)
            {
                return NotFound(new { message = "Transaction not found." });
            }

            if (statusDto.Status == "Succeeded")
            {
                transaction.Status = "Succeeded";
                var booking = transaction.Booking;
                booking.BookingStatus = "Confirmed";
                _context.Transaction.Update(transaction);
                _context.Booking.Update(booking);
            }
            else
            {
                transaction.Status = "Failed";
                var seatsToDelete = _context.Seats.Where(s => s.BookingID == transaction.BookingID);
                _context.Seats.RemoveRange(seatsToDelete);

                var booking = await _context.Booking.FindAsync(transaction.BookingID);
                booking.BookingStatus = "Cancelled";
                _context.Booking.Update(booking);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Transaction updated." });
        }
        #endregion
    }
}
