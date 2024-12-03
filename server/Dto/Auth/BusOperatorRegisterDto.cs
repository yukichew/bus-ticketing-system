using System.ComponentModel.DataAnnotations;

namespace server.Dto.Auth
{
    public class BusOperatorRegisterDto : RegisterDto
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Contact is required")]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "Company name is required")]
        public string CompanyName { get; set; }
        [Required(ErrorMessage = "Company email is required")]
        public string CompanyEmail { get; set; }
        [Required(ErrorMessage = "Company contact is required")]
        public string CompanyContact { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }
        [Required(ErrorMessage = "Bus images are required")]
        public List<string> BusImages { get; set; }
        public bool IsRefundable { get; set; }
    }
}