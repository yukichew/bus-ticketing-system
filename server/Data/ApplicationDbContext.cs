
using Microsoft.AspNetCore.Identity;
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

        public DbSet<BusOperator> BusOperators { get; set; }
        public DbSet<BusType> BusTypes { get; set; }
        public DbSet<BusInfo> BusInfo { get; set; }
        public DbSet<Locations> Locations { get; set; }
        public DbSet<RecurringOption> RecurringOptions { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Routes> Routes { get; set; }
        public DbSet<BusSchedule> BusSchedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity => entity.ToTable("Users"));
            modelBuilder.Entity<IdentityRole>(entity => entity.ToTable("Roles"));
            modelBuilder.Entity<IdentityUserRole<string>>(entity => entity.ToTable("UserRoles"));
            modelBuilder.Entity<IdentityUserClaim<string>>(entity => entity.ToTable("UserClaims"));
            modelBuilder.Entity<IdentityUserLogin<string>>(entity => entity.ToTable("UserLogins"));
            modelBuilder.Entity<IdentityRoleClaim<string>>(entity => entity.ToTable("RoleClaims"));
            modelBuilder.Entity<IdentityUserToken<string>>(entity => entity.ToTable("UserTokens"));

            modelBuilder.Entity<BusInfo>()
                .HasOne(b => b.BusType)
                .WithMany()
                .HasForeignKey(b => b.BusTypeID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Routes>()
                .HasOne(r => r.BoardingLocation)
                .WithMany()
                .HasForeignKey(r => r.BoardingLocationID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Routes>()
                .HasOne(r => r.ArrivalLocation)
                .WithMany()
                .HasForeignKey(r => r.ArrivalLocationID)
                .OnDelete(DeleteBehavior.Restrict);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        #region Handling UpdatedAt in AspNetBusSchedule
        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BusSchedule &&
                            (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                if (entry.Entity is BusSchedule busSchedule)
                {
                    if (entry.State == EntityState.Added)
                    {
                        busSchedule.CreatedAt = DateTime.Now;
                        busSchedule.UpdatedAt = busSchedule.CreatedAt;
                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        busSchedule.UpdatedAt = DateTime.Now;
                    }
                }
            }

            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BusSchedule &&
                            (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                if (entry.Entity is BusSchedule busSchedule)
                {
                    if (entry.State == EntityState.Added)
                    {
                        busSchedule.CreatedAt = DateTime.Now;
                        busSchedule.UpdatedAt = busSchedule.CreatedAt;
                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        busSchedule.UpdatedAt = DateTime.Now;
                    }
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
        #endregion
    }
}