using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dto
{
    public class TransactionDto
    {
        [Required]
        public int BookingID { get; set; }
        [ForeignKey("BookingID")]
        public double Amount { get; set; }
    }
}
