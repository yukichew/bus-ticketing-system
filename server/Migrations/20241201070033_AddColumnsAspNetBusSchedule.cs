using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class AddColumnsAspNetBusSchedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reasons",
                table: "AspNetBusSchedule",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "AspNetBusSchedule",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "AspNetBusSchedule",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reasons",
                table: "AspNetBusSchedule");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "AspNetBusSchedule");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "AspNetBusSchedule");
        }
    }
}
