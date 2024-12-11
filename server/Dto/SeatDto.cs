using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class SeatDto
    {
        [Required(ErrorMessage = "Seat number is required")]
        public int SeatNumber { get; set; }
        public PassengerDto Passenger { get; set; }
    }
}
