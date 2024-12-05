using server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Dto
{
    public class TransactionDto
    {
        [Required]
        public int BookingID { get; set; }
        [ForeignKey("BookingID")]
        public virtual Booking? Booking { get; set; }
        public double Amount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}
