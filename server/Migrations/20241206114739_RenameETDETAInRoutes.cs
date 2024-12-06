using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RenameETDETAInRoutes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ETD",
                table: "Routes",
                newName: "departureTime");

            migrationBuilder.RenameColumn(
                name: "ETA",
                table: "Routes",
                newName: "arrivalTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "departureTime",
                table: "Routes",
                newName: "ETD");

            migrationBuilder.RenameColumn(
                name: "arrivalTime",
                table: "Routes",
                newName: "ETA");
        }
    }
}
