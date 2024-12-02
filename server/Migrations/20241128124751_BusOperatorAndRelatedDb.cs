using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class BusOperatorAndRelatedDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetPassengers",
                columns: table => new
                {
                    PassengerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetPassengers", x => x.PassengerID);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetPassengers ADD CONSTRAINT CK_AspNetPassengers_Status CHECK (Status IN ('Active', 'Inactive'))");

            migrationBuilder.CreateTable(
                name: "AspNetBusOperator",
                columns: table => new
                {
                    BusOperatorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CompanyEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CompanyContact = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CompanyLogo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BusImages = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRefundable = table.Column<bool>(type: "bit", nullable: true),
                    ServiceAndReputations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    RatesAndReviewID = table.Column<int>(type: "int", nullable: true),
                    SalesAndRevenueID = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetBusOperator", x => x.BusOperatorID);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusOperator ADD CONSTRAINT CK_AspNetBusOperator_Status CHECK (Status IN ('Pending for Review', 'Active', 'Inactive'))");

            migrationBuilder.CreateTable(
                name: "AspNetRatesAndReviews",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusOperatorID = table.Column<int>(type: "int", nullable: false),
                    PassengerID = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rates = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRatesAndReviews", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AspNetRatesAndReviews_AspNetBusOperator_BusOperatorID",
                        column: x => x.BusOperatorID,
                        principalTable: "AspNetBusOperator",
                        principalColumn: "BusOperatorID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetRatesAndReviews_AspNetPassengers_PassengerID",
                        column: x => x.PassengerID,
                        principalTable: "AspNetPassengers",
                        principalColumn: "PassengerID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetRatesAndReviews ADD CONSTRAINT CK_AspNetRatesAndReviews_Status CHECK (Status IN ('Posted', 'Reported', 'Pending for Review'))");

            migrationBuilder.CreateTable(
                name: "AspNetSalesAndRevenue",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusOperatorID = table.Column<int>(type: "int", nullable: false),
                    TotalIncome = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalRefund = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetSalesAndRevenue", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AspNetSalesAndRevenue_AspNetBusOperator_BusOperatorID",
                        column: x => x.BusOperatorID,
                        principalTable: "AspNetBusOperator",
                        principalColumn: "BusOperatorID",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "AspNetSalesAndRevenue");
            migrationBuilder.DropTable(name: "AspNetRatesAndReviews");
            migrationBuilder.DropTable(name: "AspNetPassengers");
            migrationBuilder.DropTable(name: "AspNetBusOperator");
        }
    }
}