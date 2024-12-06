using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddRatesAndReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RatesAndReviews",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusOperatorID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rate = table.Column<int>(type: "int", nullable: false),
                    PostedById = table.Column<int>(type: "int", nullable: false),
                    PostedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RatesAndReviews", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RatesAndReviews_BusOperators",
                        column: x => x.BusOperatorID,
                        principalTable: "BusOperators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RatesAndReviews_Passenger",
                        column: x => x.PostedById,
                        principalTable: "Passenger",
                        principalColumn: "PassengerID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RatesAndReviews_BusOperatorID",
                table: "RatesAndReviews",
                column: "BusOperatorID");

            migrationBuilder.CreateIndex(
                name: "IX_RatesAndReviews_PostedById",
                table: "RatesAndReviews",
                column: "PostedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RatesAndReviews");
        }
    }
}