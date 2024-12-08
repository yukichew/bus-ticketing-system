using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class ResetPasswordDto : ValidateOTPDto
    {
        [Required(ErrorMessage = "New password is required")]
        public string? NewPassword { get; set; }
    }
}
