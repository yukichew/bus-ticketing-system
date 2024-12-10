using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Helper
{
    public class BookingExpirationService : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<BookingExpirationService> _logger;
        private readonly EmailService _emailService;

        public BookingExpirationService(IServiceScopeFactory serviceScopeFactory, ILogger<BookingExpirationService> logger, EmailService emailService)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
            _emailService = emailService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                    var expiredBookings = await context.Booking
                        .Where(b => b.BookingStatus == "Pending" && b.CreatedAt <= DateTime.Now.AddMinutes(-5))
                        .ToListAsync();

                    foreach (var booking in expiredBookings)
                    {
                        booking.BookingStatus = "Cancelled";
                        var seats = await context.Seats.Where(s => s.BookingID == booking.BookingID).ToListAsync();
                        context.Seats.RemoveRange(seats);
                        _logger.LogInformation($"Booking {booking.BookingID} expired and canceled.");

                        var passenger = seats.FirstOrDefault()?.Passenger;
                        if (passenger != null)
                        {
                            await _emailService.SendEmailAsync(
                                passenger.Fullname,
                                passenger.Email,
                                "Booking Expired",
                                "Your booking has expired due to non-payment.");
                        }
                    }

                    await context.SaveChangesAsync();
                }

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}

