using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Models;
using Stripe;
using Stripe.Checkout;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public TransactionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> CheckOut(TransactionDto transactionDto)
        {
            var booking = await _context.Booking.FindAsync(transactionDto.BookingID);

            try
            {
                var stripeService = new PaymentIntentService();
                var paymentIntent = await stripeService.CreateAsync(new PaymentIntentCreateOptions
                {
                    Amount = (long)(transactionDto.Amount * 100),  // Convert to cents
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
                    Purpose = "Booking"
                };
                _context.Transaction.Add(transaction);
                await _context.SaveChangesAsync();

                //return Ok(new { CheckoutSessionUrl = session.Url });
                return Ok(new
                {
                    PaymentIntentClientSecret = paymentIntent.ClientSecret,
                    TransactionID = transaction.TransactionID
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
            }
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var webhookSecret = _config["Stripe:WebhookSecret"];
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    webhookSecret
                );

                if (stripeEvent.Type == "checkout.session.completed")
                {
                    var session = stripeEvent.Data.Object as Session;
                    var bookingId = int.Parse(session.ClientReferenceId);

                    var booking = await _context.Booking.FindAsync(bookingId);
                    if (booking != null && booking.BookingStatus == "Pending")
                    {
                        booking.BookingStatus = "Confirmed";
                        booking.AmountPaid = booking.AmountPaid;
                        booking.UpdatedAt = DateTime.Now;

                        var seats = await _context.Seats
                            .Where(s => s.BookingID == booking.BookingID)
                            .ToListAsync();

                        seats.ForEach(s => s.Status = "Booked");

                        await _context.SaveChangesAsync();
                    }
                }
                else if (stripeEvent.Type == "checkout.session.expired" || stripeEvent.Type == "payment_intent.payment_failed")
                {
                    var session = stripeEvent.Data.Object as Session;
                    var bookingId = int.Parse(session.ClientReferenceId);

                    var booking = await _context.Booking.FindAsync(bookingId);
                    if (booking != null && booking.BookingStatus == "Pending")
                    {
                        booking.BookingStatus = "Failed";
                        booking.UpdatedAt = DateTime.Now;

                        var seats = await _context.Seats
                            .Where(s => s.BookingID == booking.BookingID)
                            .ToListAsync();

                        seats.ForEach(s => s.Status = "Available");

                        await _context.SaveChangesAsync();
                    }
                }


                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Webhook error", error = ex.Message });
            }
        }

    }
}
