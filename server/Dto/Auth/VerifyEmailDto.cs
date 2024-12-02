using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class VerifyEmailDto
    {
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
    }
}
