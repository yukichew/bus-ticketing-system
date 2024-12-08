using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBusType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PostedById",
                table: "BusTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BusTypes_PostedById",
                table: "BusTypes",
                column: "PostedById");

            migrationBuilder.AddForeignKey(
                name: "FK_BusTypes_BusOperators_PostedById",
                table: "BusTypes",
                column: "PostedById",
                principalTable: "BusOperators",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BusTypes_BusOperators_PostedById",
                table: "BusTypes");

            migrationBuilder.DropIndex(
                name: "IX_BusTypes_PostedById",
                table: "BusTypes");

            migrationBuilder.DropColumn(
                name: "PostedById",
                table: "BusTypes");
        }
    }
}
