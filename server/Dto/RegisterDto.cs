using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class RegisterDto : AuthDto
    {
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string? ConfirmPassword { get; set; }
        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; }
    }
}