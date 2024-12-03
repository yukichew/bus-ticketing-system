﻿using server.Models;

namespace server.Dto
{
    public class BookingDto
    {
        public int BookingID { get; set; }
        public int BusScheduleID { get; set; }
        public string BookingStatus { get; set; }
        public double AmountPaid { get; set; }
        public DateTime BookingDate { get; set; }
        public List<SeatDto> Seats { get; set; }
    }
}
