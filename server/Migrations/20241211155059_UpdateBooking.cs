using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ReturnBusScheduleID",
                table: "Booking",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Booking_ReturnBusScheduleID",
                table: "Booking",
                column: "ReturnBusScheduleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_BusSchedules_ReturnBusScheduleID",
                table: "Booking",
                column: "ReturnBusScheduleID",
                principalTable: "BusSchedules",
                principalColumn: "BusScheduleID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_BusSchedules_ReturnBusScheduleID",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_ReturnBusScheduleID",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "ReturnBusScheduleID",
                table: "Booking");
        }
    }
}
