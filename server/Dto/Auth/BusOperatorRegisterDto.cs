using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class BusOperatorRegisterDto : RegisterDto
    {
        [Required(ErrorMessage = "Company name is required")]
        public string Address { get; set; }
        [Required(ErrorMessage = "Bus images are required")]
        public List<string> BusImages { get; set; }
        public bool IsRefundable { get; set; }
    }
}