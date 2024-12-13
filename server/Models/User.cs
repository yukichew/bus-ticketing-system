using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class User : IdentityUser
    {
        public string? Fullname { get; set; }
        public string? Status { get; set; }
    }
}