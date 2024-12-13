using System.ComponentModel.DataAnnotations;

namespace server.Dto.Bookings
{
    public class SeatDto
    {
        [Required(ErrorMessage = "Seat number is required")]
        public int SeatNumber { get; set; }
        [Required(ErrorMessage = "Passenger is required")]
        public PassengerDto Passenger { get; set; }
    }
}
