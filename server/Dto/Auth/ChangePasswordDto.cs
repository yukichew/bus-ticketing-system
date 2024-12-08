using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Old password is required")]
        public string? OldPassword { get; set; }

        [Required(ErrorMessage = "New password is required")]
        public string? NewPassword { get; set; }
    }
}
