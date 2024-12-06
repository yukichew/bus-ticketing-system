using server.Models;

namespace server.Dto
{
    public class BookingDto
    {
        public int BookingID { get; set; }
        public int BusScheduleID { get; set; }
        public double AmountPaid { get; set; }
        public List<SeatDto> Seats { get; set; }
    }
}
