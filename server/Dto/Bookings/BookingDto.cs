using System.ComponentModel.DataAnnotations;
using server.Dto.Bookings;

namespace server.Dto
{
    public class BookingDto
    {
        [Required(ErrorMessage = "Onward trip is required")]
        public TripDetails OnwardTrip { get; set; }
        public TripDetails? ReturnTrip { get; set; }
    }

    public class TripDetails
    {
        [Required(ErrorMessage = "Bus schdule id is required")]
        public Guid BusScheduleID { get; set; }
        [Required(ErrorMessage = "Total amount is required")]
        public double AmountPaid { get; set; }
        [Required(ErrorMessage = "Seats is required")]
        public List<SeatDto> Seats { get; set; }
    }
}
