using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class BusOperator : User
    {
        [Required]
        [MaxLength(500)]
        public string Address { get; set; }
        public string? CompanyLogo { get; set; }
        [Required]
        public List<string> BusImages { get; set; } = new List<string>();
        public string? Bio { get; set; }
        public bool? IsRefundable { get; set; }
    }
}
