using System.ComponentModel.DataAnnotations;

namespace server.Dto.Bookings
{
    public class TransactionDto
    {
        [Required(ErrorMessage = "Booking id is required")]
        public Guid BookingID { get; set; }
        [Required(ErrorMessage = "Amount is required")]
        public double Amount { get; set; }
        [Required(ErrorMessage = "Payment email is required")]
        public string Email { get; set; }
    }
}
