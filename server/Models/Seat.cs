using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Seat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string SeatId { get; set; }
        [Required]
        public int SeatNumber { get; set; }

        [Required]
        public int BookingID { get; set; }

        [ForeignKey("BookingID")]
        public virtual Booking? Booking { get; set; }
    }
}
