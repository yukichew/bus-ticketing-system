using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class BusOperator : User
    {
        [Required]
        [MaxLength(256)]
        public string CompanyName { get; set; }

        [Required]
        [MaxLength(256)]
        public string CompanyEmail { get; set; }

        [Required]
        [MaxLength(15)]
        public string CompanyContact { get; set; }

        [Required]
        [MaxLength(500)]
        public string Address { get; set; }

        public string? CompanyLogo { get; set; }

        [Required]
        public List<string> BusImages { get; set; } = new List<string>();

        public string? Bio { get; set; }

        public bool? IsRefundable { get; set; }

        public string? ServiceAndReputations { get; set; }

        public int? RatesAndReviewID { get; set; }
        public int? SalesAndRevenueID { get; set; }

        [MaxLength(50)]
        public string? Status { get; set; }
    }
}
