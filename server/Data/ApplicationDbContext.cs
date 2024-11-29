
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<BusType> BusTypes { get; set; }
        public DbSet<BusInfo> BusInfo { get; set; }
        public DbSet<Locations> Locations { get; set; }
        //public DbSet<Passengers> Passengers { get; set; }
        //public DbSet<BusOperator> BusOperators { get; set; }
        //public DbSet<RatesAndReviews> RatesAndReviews { get; set; }
        //public DbSet<SalesAndRevenue> SalesAndRevenue { get; set; }

        public DbSet<RecurringOption> RecurringOptions { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Routes> Routes { get; set; }
        public DbSet<BusSchedule> BusSchedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BusInfo>()
                .HasOne(b => b.BusType)
                .WithMany()
                .HasForeignKey(b => b.BusTypeID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}