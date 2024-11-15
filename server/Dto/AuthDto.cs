using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class AuthDto
    {
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}