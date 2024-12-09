using System.ComponentModel.DataAnnotations;
namespace server.Dto
{
    public class RatesAndReviewsDTO
    {
        [Required(ErrorMessage = "Booking id is required")]
        public Guid BookingId { get; set; }
        [Required(ErrorMessage = "Comment is required")]
        public string Comment { get; set; }
        [Required(ErrorMessage = "Rate is required")]
        public int Rate { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }
}