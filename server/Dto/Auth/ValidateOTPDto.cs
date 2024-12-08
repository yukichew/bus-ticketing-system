using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class ValidateOTPDto : VerifyEmailDto
    {
        [Required(ErrorMessage = "OTP is required")]
        public string? OTP { get; set; }
    }
}
