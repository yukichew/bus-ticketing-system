using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class LoginDto : VerifyEmailDto
    {
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}