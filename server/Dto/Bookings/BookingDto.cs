using server.Models;

namespace server.Dto
{
    public class BookingDto
    {
        public Guid BusScheduleID { get; set; }
        public double AmountPaid { get; set; }
        public List<SeatDto> Seats { get; set; }
    }
}
