using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class UpdateAspNetBusSchedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusSchedule DROP CONSTRAINT CK_AspNetBusSchedule_ScheduleStatus");

            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusSchedule ADD CONSTRAINT CK_AspNetBusSchedule_ScheduleStatus CHECK (ScheduleStatus IN ('Scheduled', 'On Time', 'En Route', 'Delayed', 'Canceled', 'Completed'))");

            migrationBuilder.AddColumn<DateTime>(
                name: "TravelDate",
                table: "AspNetBusSchedule",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(2000, 1, 1));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ETD",
                table: "AspNetBusSchedule",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ETA",
                table: "AspNetBusSchedule",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusSchedule DROP CONSTRAINT CK_AspNetBusSchedule_ScheduleStatus");

            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusSchedule ADD CONSTRAINT CK_AspNetBusSchedule_ScheduleStatus CHECK (ScheduleStatus IN ('Scheduled', 'On Time', 'En Route', 'Delayed', 'Postponed', 'Canceled'))");

            migrationBuilder.DropColumn(
                name: "TravelDate",
                table: "AspNetBusSchedule");

            migrationBuilder.DropColumn(
                name: "ETD",
                table: "AspNetBusSchedule");

            migrationBuilder.DropColumn(
                name: "ETA",
                table: "AspNetBusSchedule");
        }
    }
}
