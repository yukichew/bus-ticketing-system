using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRatesNReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RatesAndReviews_BusOperators_BusOperatorID",
                table: "RatesAndReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_RatesAndReviews_Passenger_PostedById",
                table: "RatesAndReviews");

            migrationBuilder.DropIndex(
                name: "IX_RatesAndReviews_BusOperatorID",
                table: "RatesAndReviews");

            migrationBuilder.DropIndex(
                name: "IX_RatesAndReviews_PostedById",
                table: "RatesAndReviews");

            migrationBuilder.DropColumn(
                name: "BusOperatorID",
                table: "RatesAndReviews");

            migrationBuilder.AlterColumn<string>(
                name: "PostedById",
                table: "RatesAndReviews",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "BookingID",
                table: "RatesAndReviews",
                type: "uniqueidentifier",
                maxLength: 450,
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_RatesAndReviews_BookingID",
                table: "RatesAndReviews",
                column: "BookingID");

            migrationBuilder.AddForeignKey(
                name: "FK_RatesAndReviews_Booking_BookingID",
                table: "RatesAndReviews",
                column: "BookingID",
                principalTable: "Booking",
                principalColumn: "BookingID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RatesAndReviews_Booking_BookingID",
                table: "RatesAndReviews");

            migrationBuilder.DropIndex(
                name: "IX_RatesAndReviews_BookingID",
                table: "RatesAndReviews");

            migrationBuilder.DropColumn(
                name: "BookingID",
                table: "RatesAndReviews");

            migrationBuilder.AlterColumn<Guid>(
                name: "PostedById",
                table: "RatesAndReviews",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "BusOperatorID",
                table: "RatesAndReviews",
                type: "nvarchar(450)",
                maxLength: 450,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_RatesAndReviews_BusOperatorID",
                table: "RatesAndReviews",
                column: "BusOperatorID");

            migrationBuilder.CreateIndex(
                name: "IX_RatesAndReviews_PostedById",
                table: "RatesAndReviews",
                column: "PostedById");

            migrationBuilder.AddForeignKey(
                name: "FK_RatesAndReviews_BusOperators_BusOperatorID",
                table: "RatesAndReviews",
                column: "BusOperatorID",
                principalTable: "BusOperators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RatesAndReviews_Passenger_PostedById",
                table: "RatesAndReviews",
                column: "PostedById",
                principalTable: "Passenger",
                principalColumn: "PassengerID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
