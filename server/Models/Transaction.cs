using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TransactionID { get; set; }
        [Required]
        public Guid BookingID { get; set; }
        [ForeignKey("BookingID")]
        public virtual Booking? Booking { get; set; }
        [Required]
        public string PaymentIntentID { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Purpose { get; set; }
    }
}
