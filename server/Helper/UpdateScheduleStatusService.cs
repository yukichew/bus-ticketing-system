using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using server.Data;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace server.Helper
{
    public class UpdateScheduleStatusService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public UpdateScheduleStatusService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                        await UpdateOnTimeStatus(context);
                        await UpdateEnRouteStatus(context);
                        await UpdateCompletedStatus(context);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }

                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }

        private async Task UpdateOnTimeStatus(ApplicationDbContext context)
        {
            var currentDate = DateTime.Now.Date;
            var targetDate = currentDate.AddDays(7);

            var busSchedules = await context.BusSchedules
                .Where(bs => bs.ScheduleStatus == "Scheduled" && bs.TravelDate.Date == targetDate)
                .ToListAsync();

            foreach (var schedule in busSchedules)
            {
                schedule.ScheduleStatus = "On Time";
            }

            await context.SaveChangesAsync();
        }

        private async Task UpdateEnRouteStatus(ApplicationDbContext context)
        {
            var currentTime = DateTime.Now.TimeOfDay;
            var currentDate = DateTime.Now.Date;

            var fiveMinutesBefore = currentTime.Add(TimeSpan.FromMinutes(-5));
            var fiveMinutesAfter = currentTime.Add(TimeSpan.FromMinutes(5));

            var busSchedules = await context.BusSchedules
                .Where(bs => bs.ScheduleStatus == "On Time"
                             && bs.TravelDate.Date == currentDate
                             && (bs.ETD >= fiveMinutesBefore && bs.ETD <= fiveMinutesAfter))
                .ToListAsync();

            foreach (var schedule in busSchedules)
            {
                schedule.ScheduleStatus = "En Route";
            }

            await context.SaveChangesAsync();
        }

        private async Task UpdateCompletedStatus(ApplicationDbContext context)
        {
            var currentTime = DateTime.Now.TimeOfDay;
            var currentDate = DateTime.Now.Date;

            var busSchedules = await context.BusSchedules
                .Where(bs => bs.ScheduleStatus == "En Route"
                             && bs.TravelDate.Date == currentDate
                             && bs.ETA <= currentTime)
                .ToListAsync();

            foreach (var schedule in busSchedules)
            {
                schedule.ScheduleStatus = "Completed";
            }

            await context.SaveChangesAsync();
        }
    }
}
