using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class PassengerDto
    {
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Fullname is required")]
        public string? Fullname { get; set; }
        [Required(ErrorMessage = "Phone number is required")]
        public string? PhoneNumber { get; set; }
    }
}
