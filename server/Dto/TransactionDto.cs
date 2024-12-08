using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class TransactionDto
    {
        [Required]
        public Guid BookingID { get; set; }
        public double Amount { get; set; }
        public string Email { get; set; }
    }
}
