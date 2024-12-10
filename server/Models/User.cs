using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class User : IdentityUser
    {
        public string? Fullname { get; set; }
        public string? Status { get; set; }
    }
}