using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class BusType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetBusType",
                columns: table => new
                {
                    BusTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoOfSeats = table.Column<int>(type: "int", nullable: false),
                    Types = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetBusType", x => x.BusTypeID);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusType ADD CONSTRAINT CK_AspNetBusType_Status CHECK (Status IN ('Active', 'Inactive'))");

            migrationBuilder.CreateTable(
                name: "AspNetBusInfo",
                columns: table => new
                {
                    BusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusPlate = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    BusTypeID = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetBusInfo", x => x.BusID);
                    table.ForeignKey(
                        name: "FK_AspNetBusInfo_AspNetBusType",
                        column: x => x.BusTypeID,
                        principalTable: "AspNetBusType",
                        principalColumn: "BusTypeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.Sql(
                "ALTER TABLE AspNetBusInfo ADD CONSTRAINT CK_AspNetBusInfo_Status CHECK (Status IN ('Active', 'Inactive'))");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetBusInfo_AspNetBusTypeID",
                table: "AspNetBusInfo",
                column: "BusTypeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetBusInfo");

            migrationBuilder.DropTable(
                name: "AspNetBusType");
        }
    }
}