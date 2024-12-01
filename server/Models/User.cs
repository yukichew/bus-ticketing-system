using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class User : IdentityUser
    {
        public string? EmailOTP { get; set; }
        public DateTime? OTPExpiry { get; set; }

        public DateTime? LastOTPSent { get; set; }
    }
}