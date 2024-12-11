﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("Roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("UserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("UserTokens", (string)null);
                });

            modelBuilder.Entity("server.Models.Booking", b =>
                {
                    b.Property<Guid>("BookingID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("AmountPaid")
                        .HasColumnType("float");

                    b.Property<string>("BookingStatus")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("BusScheduleID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("ReturnBusScheduleID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("BookingID");

                    b.HasIndex("BusScheduleID");

                    b.HasIndex("ReturnBusScheduleID");

                    b.ToTable("Booking");
                });

            modelBuilder.Entity("server.Models.BusInfo", b =>
                {
                    b.Property<Guid>("BusID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BusPlate")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("BusTypeID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("PostedById")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("BusID");

                    b.HasIndex("BusPlate")
                        .IsUnique();

                    b.HasIndex("BusTypeID");

                    b.HasIndex("PostedById");

                    b.ToTable("BusInfo");
                });

            modelBuilder.Entity("server.Models.BusSchedule", b =>
                {
                    b.Property<Guid>("BusScheduleID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BusID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("ETA")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("ETD")
                        .HasColumnType("time");

                    b.Property<bool>("IsRecurring")
                        .HasColumnType("bit");

                    b.Property<string>("PostedById")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Reasons")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("RecurringOptionID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RouteID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ScheduleStatus")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<DateTime>("TravelDate")
                        .HasColumnType("date");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("BusScheduleID");

                    b.HasIndex("BusID");

                    b.HasIndex("PostedById");

                    b.HasIndex("RecurringOptionID");

                    b.HasIndex("RouteID");

                    b.ToTable("BusSchedules");
                });

            modelBuilder.Entity("server.Models.BusType", b =>
                {
                    b.Property<Guid>("BusTypeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("NoOfSeats")
                        .HasColumnType("int");

                    b.Property<string>("PostedById")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Types")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("BusTypeID");

                    b.HasIndex("PostedById");

                    b.ToTable("BusTypes");
                });

            modelBuilder.Entity("server.Models.Faq", b =>
                {
                    b.Property<Guid>("FaqId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("FaqId");

                    b.ToTable("Faqs");
                });

            modelBuilder.Entity("server.Models.Locations", b =>
                {
                    b.Property<Guid>("LocationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("LocationID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("server.Models.Passenger", b =>
                {
                    b.Property<Guid>("PassengerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PassengerID");

                    b.ToTable("Passenger");
                });

            modelBuilder.Entity("server.Models.RatesAndReviews", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BookingID")
                        .HasMaxLength(450)
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasMaxLength(450)
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("PostedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("PostedById")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Rate")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("ID");

                    b.HasIndex("BookingID");

                    b.ToTable("RatesAndReviews");
                });

            modelBuilder.Entity("server.Models.RecurringOption", b =>
                {
                    b.Property<Guid>("RecurringOptionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<DateTime?>("FromDate")
                        .HasColumnType("date");

                    b.Property<string>("Options")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("SelectDays")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<DateTime?>("ToDate")
                        .HasColumnType("date");

                    b.HasKey("RecurringOptionID");

                    b.ToTable("RecurringOptions");
                });

            modelBuilder.Entity("server.Models.Routes", b =>
                {
                    b.Property<Guid>("RouteID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ArrivalLocationID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<TimeSpan>("ArrivalTime")
                        .HasColumnType("time");

                    b.Property<Guid>("BoardingLocationID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<TimeSpan>("DepartureTime")
                        .HasColumnType("time");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("RouteID");

                    b.HasIndex("ArrivalLocationID");

                    b.HasIndex("BoardingLocationID");

                    b.ToTable("Routes");
                });

            modelBuilder.Entity("server.Models.Seat", b =>
                {
                    b.Property<Guid>("SeatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BookingID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PassengerID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SeatNumber")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SeatId");

                    b.HasIndex("BookingID");

                    b.HasIndex("PassengerID");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("server.Models.TermsAndConditions", b =>
                {
                    b.Property<Guid>("TACId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("PolicyTitle")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Terms")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("TACId");

                    b.ToTable("TermsAndConditions");
                });

            modelBuilder.Entity("server.Models.Transaction", b =>
                {
                    b.Property<Guid>("TransactionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Amount")
                        .HasColumnType("float");

                    b.Property<Guid>("BookingID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("PaymentIntentID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Purpose")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TransactionID");

                    b.HasIndex("BookingID");

                    b.ToTable("Transaction");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Fullname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("Users", (string)null);

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("server.Models.BusOperator", b =>
                {
                    b.HasBaseType("server.Models.User");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Bio")
                        .HasColumnType("nvarchar(max)");

                    b.PrimitiveCollection<string>("BusImages")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompanyLogo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsRefundable")
                        .HasColumnType("bit");

                    b.ToTable("BusOperators", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("server.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("server.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("server.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Booking", b =>
                {
                    b.HasOne("server.Models.BusSchedule", "BusSchedule")
                        .WithMany()
                        .HasForeignKey("BusScheduleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.BusSchedule", "ReturnBusSchedule")
                        .WithMany()
                        .HasForeignKey("ReturnBusScheduleID");

                    b.Navigation("BusSchedule");

                    b.Navigation("ReturnBusSchedule");
                });

            modelBuilder.Entity("server.Models.BusInfo", b =>
                {
                    b.HasOne("server.Models.BusType", "BusType")
                        .WithMany()
                        .HasForeignKey("BusTypeID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("server.Models.BusOperator", "PostedBy")
                        .WithMany()
                        .HasForeignKey("PostedById");

                    b.Navigation("BusType");

                    b.Navigation("PostedBy");
                });

            modelBuilder.Entity("server.Models.BusSchedule", b =>
                {
                    b.HasOne("server.Models.BusInfo", "BusInfo")
                        .WithMany()
                        .HasForeignKey("BusID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.BusOperator", "PostedBy")
                        .WithMany()
                        .HasForeignKey("PostedById");

                    b.HasOne("server.Models.RecurringOption", "RecurringOptions")
                        .WithMany()
                        .HasForeignKey("RecurringOptionID");

                    b.HasOne("server.Models.Routes", "Routes")
                        .WithMany()
                        .HasForeignKey("RouteID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BusInfo");

                    b.Navigation("PostedBy");

                    b.Navigation("RecurringOptions");

                    b.Navigation("Routes");
                });

            modelBuilder.Entity("server.Models.BusType", b =>
                {
                    b.HasOne("server.Models.BusOperator", "PostedBy")
                        .WithMany()
                        .HasForeignKey("PostedById");

                    b.Navigation("PostedBy");
                });

            modelBuilder.Entity("server.Models.RatesAndReviews", b =>
                {
                    b.HasOne("server.Models.Booking", "Booking")
                        .WithMany()
                        .HasForeignKey("BookingID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("server.Models.Routes", b =>
                {
                    b.HasOne("server.Models.Locations", "ArrivalLocation")
                        .WithMany()
                        .HasForeignKey("ArrivalLocationID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("server.Models.Locations", "BoardingLocation")
                        .WithMany()
                        .HasForeignKey("BoardingLocationID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ArrivalLocation");

                    b.Navigation("BoardingLocation");
                });

            modelBuilder.Entity("server.Models.Seat", b =>
                {
                    b.HasOne("server.Models.Booking", "Booking")
                        .WithMany()
                        .HasForeignKey("BookingID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Passenger", "Passenger")
                        .WithMany()
                        .HasForeignKey("PassengerID");

                    b.Navigation("Booking");

                    b.Navigation("Passenger");
                });

            modelBuilder.Entity("server.Models.Transaction", b =>
                {
                    b.HasOne("server.Models.Booking", "Booking")
                        .WithMany()
                        .HasForeignKey("BookingID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("server.Models.BusOperator", b =>
                {
                    b.HasOne("server.Models.User", null)
                        .WithOne()
                        .HasForeignKey("server.Models.BusOperator", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
