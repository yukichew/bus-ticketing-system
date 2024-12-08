using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class EditProfileDto
    {
        [Required(ErrorMessage = "Fullname is required.")]
        public string Fullname { get; set; }
        [Required(ErrorMessage = "Phone number is required.")]
        public string PhoneNumber { get; set; }
    }
}
