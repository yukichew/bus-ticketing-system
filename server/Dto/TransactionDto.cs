using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class TransactionDto
    {
        [Required]
        public int BookingID { get; set; }
        public double Amount { get; set; }
    }
}
