using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Seat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SeatId { get; set; }
        [Required]
        public int SeatNumber { get; set; }

        [Required]
        public Guid BookingID { get; set; }

        [ForeignKey("BookingID")]
        public virtual Booking? Booking { get; set; }
        public virtual Passenger? Passenger { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
