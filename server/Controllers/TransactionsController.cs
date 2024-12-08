using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dto;
using server.Helper;
using server.Models;
using Stripe;
using System;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly EmailService _emailService;

        public TransactionsController(ApplicationDbContext context, IConfiguration config, EmailService emailService)
        {
            _context = context;
            _config = config;
            _emailService = emailService;
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
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found." });
            }

            try
            {
                var stripeService = new PaymentIntentService();
                var paymentIntent = await stripeService.CreateAsync(new PaymentIntentCreateOptions
                {
                    Amount = (long)(transactionDto.Amount * 100),
                    Currency = "myr",
                    ReceiptEmail = transactionDto.Email,
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

            var booking = transaction.Booking;
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found." });
            }

            var seats = _context.Seats.Where(s => s.BookingID == transaction.BookingID);

            if (statusDto.Status == "Succeeded")
            {
                transaction.Status = "Succeeded";
                booking.BookingStatus = "Confirmed";

                foreach (var seat in seats)
                {
                    seat.Status = "Occupied";
                    _context.Seats.Update(seat);
                }

                // send payment receipt email
                var passenger = seats.FirstOrDefault().Passenger;
                var receiptMessage = $"Dear {passenger.Fullname},\n\n" +
                                     $"Thank you for choosing RideNGo. Here are your receipt details:\n\n" +
                                     $"Your booking has been confirmed.\n" +
                                     $"Amount: RM {transaction.Amount}\n" +
                                     $"Transaction ID: {transaction.PaymentIntentID}\n\n" +
                                     $"We appreciate your booking with RideNGo. Have a great trip!\n\n" +
                                     $"Regards,\nRideNGo Team";

                await _emailService.SendEmailAsync(passenger.Fullname, passenger.Email, "RideNGo Payment Receipt", receiptMessage);
            }
            else
            {
                transaction.Status = "Failed";
                _context.Seats.RemoveRange(seats);
                booking.BookingStatus = "Cancelled";
            }

            _context.Transaction.Update(transaction);
            _context.Booking.Update(booking);

            await _context.SaveChangesAsync();
            return Ok(new { message = "Transaction updated." });
        }
        #endregion
    }
}
