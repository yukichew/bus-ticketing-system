using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class BookingDto
    {
        [Required(ErrorMessage = "Bus schedule id is required")]
        public Guid BusScheduleID { get; set; }
        [Required(ErrorMessage = "Total amount is required")]
        public double AmountPaid { get; set; }
        public List<SeatDto> Seats { get; set; }
    }
}
