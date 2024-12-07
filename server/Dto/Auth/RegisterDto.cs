using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class RegisterDto : LoginDto
    {
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string? ConfirmPassword { get; set; }
        [Required(ErrorMessage = "Full name is required")]
        public string? Fullname { get; set; }
        [Required(ErrorMessage = "Contact number is required")]
        public string PhoneNumber { get; set; }
    }
}