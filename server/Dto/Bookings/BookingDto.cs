using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class BookingDto
    {
        public TripDetails OnwardTrip { get; set; }
        public TripDetails? ReturnTrip { get; set; }
    }

    public class TripDetails
    {
        public Guid BusScheduleID { get; set; }
        public double AmountPaid { get; set; }
        public List<SeatDto> Seats { get; set; }
    }
}
