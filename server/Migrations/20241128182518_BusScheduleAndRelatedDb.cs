#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class BusScheduleAndRelatedDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRecurringOption",
                columns: table => new
                {
                    RecurringOptionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Options = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: true),
                    FromDate = table.Column<DateTime>(type: "date", nullable: true),
                    ToDate = table.Column<DateTime>(type: "date", nullable: true),
                    SelectDays = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRecurringOption", x => x.RecurringOptionID);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetRecurringOption ADD CONSTRAINT CK_AspNetRecurringOption_Status CHECK (Status IN ('Active', 'Inactive'))");

            migrationBuilder.CreateTable(
                name: "AspNetDriver",
                columns: table => new
                {
                    DriverID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fullname = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    IcNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DrivingLicense = table.Column<DateTime>(type: "date", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetDriver", x => x.DriverID);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetDriver ADD CONSTRAINT CK_AspNetDriver_Status CHECK (Status IN ('Active', 'Inactive'))");

            migrationBuilder.CreateTable(
                name: "AspNetRoute",
                columns: table => new
                {
                    RouteID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Origin = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    BoardingLocationID = table.Column<int>(type: "int", nullable: false),
                    ETD = table.Column<TimeSpan>(type: "time", nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ArrivalLocationID = table.Column<int>(type: "int", nullable: false),
                    ETA = table.Column<TimeSpan>(type: "time", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoute", x => x.RouteID);
                    table.ForeignKey(
                        name: "FK_AspNetRoute_AspNetLocations_BoardingLocationID",
                        column: x => x.BoardingLocationID,
                        principalTable: "AspNetLocations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AspNetRoute_AspNetLocations_ArrivalLocationID",
                        column: x => x.ArrivalLocationID,
                        principalTable: "AspNetLocations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetRoute ADD CONSTRAINT CK_AspNetRoute_Status CHECK (Status IN ('Active', 'Inactive'))");

            migrationBuilder.CreateTable(
                name: "AspNetBusSchedule",
                columns: table => new
                {
                    BusScheduleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsRecurring = table.Column<bool>(type: "bit", nullable: false),
                    RecurringOptionID = table.Column<int>(type: "int", nullable: true),
                    BusID = table.Column<int>(type: "int", nullable: false),
                    DriverID = table.Column<int>(type: "int", nullable: false),
                    RouteID = table.Column<int>(type: "int", nullable: false),
                    ScheduleStatus = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetBusSchedule", x => x.BusScheduleID);
                    table.ForeignKey(
                        name: "FK_AspNetBusSchedule_AspNetBusInfo_BusID",
                        column: x => x.BusID,
                        principalTable: "AspNetBusInfo",
                        principalColumn: "BusID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AspNetBusSchedule_AspNetRecurringOption_RecurringOptionID",
                        column: x => x.RecurringOptionID,
                        principalTable: "AspNetRecurringOption",
                        principalColumn: "RecurringOptionID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AspNetBusSchedule_AspNetDriver_DriverID",
                        column: x => x.DriverID,
                        principalTable: "AspNetDriver",
                        principalColumn: "DriverID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetBusSchedule_AspNetRoute_RouteID",
                        column: x => x.RouteID,
                        principalTable: "AspNetRoute",
                        principalColumn: "RouteID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusSchedule ADD CONSTRAINT CK_AspNetBusSchedule_Status CHECK (Status IN ('Active', 'Inactive'))");
            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusSchedule ADD CONSTRAINT CK_AspNetBusSchedule_ScheduleStatus CHECK (ScheduleStatus IN ('Scheduled', 'On Time', 'En Route', 'Delayed', 'Postponed', 'Canceled'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "AspNetBusSchedule");
            migrationBuilder.DropTable(name: "AspNetRecurringOption");
            migrationBuilder.DropTable(name: "AspNetDriver");
            migrationBuilder.DropTable(name: "AspNetRoute");
        }
    }
}