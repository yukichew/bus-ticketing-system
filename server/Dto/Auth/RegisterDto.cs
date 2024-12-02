using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class RegisterDto : LoginDto
    {
        [Required(ErrorMessage = "Full name is required")]
        public string? Fullname { get; set; }
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string? ConfirmPassword { get; set; }
    }
}