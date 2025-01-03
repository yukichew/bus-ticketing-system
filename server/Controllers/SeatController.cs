﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeatController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region filter seats by bus schedule api
        // GET: api/Seat?busScheduleId={busScheduleId}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seat>>> FilterSeats([FromQuery] string busScheduleId)
        {
            Guid busScheduleGuid = Guid.Empty;
            if (!string.IsNullOrEmpty(busScheduleId) && !Guid.TryParse(busScheduleId, out busScheduleGuid))
            {
                return BadRequest("Invalid bus schedule ID");
            }

            var seatNumbers = await _context.Seats
                .Where(s => s.Booking.BusScheduleID == busScheduleGuid && (s.Status == "Occupied" || s.Status == "Reserved"))
                .Select(s => s.SeatNumber)
                .ToListAsync();

            return Ok(seatNumbers);
        }
        #endregion

        #region get passenger list api
        // GET: api/Seat/PassengerList
        [HttpGet("PassengerList")]
        public async Task<ActionResult<IEnumerable<Seat>>> GetPassengerList([FromQuery] string busScheduleId)
        {
            Guid busScheduleGuid = Guid.Empty;
            if (!string.IsNullOrEmpty(busScheduleId) && !Guid.TryParse(busScheduleId, out busScheduleGuid))
            {
                return BadRequest("Invalid bus schedule ID");
            }

            var passengers = await _context.Seats
                .Where(s => s.Booking.BusScheduleID == busScheduleGuid && (s.Booking.BookingStatus == "Confirmed"))
                .OrderBy(s => s.SeatNumber)
                .ToListAsync();

            return Ok(passengers);
        }
        #endregion
    }
}
