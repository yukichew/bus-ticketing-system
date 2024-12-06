using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Routes
    {
        [Key]
        [Required]
        public int RouteID { get; set; }

        [Required]
        public int BoardingLocationID { get; set; }

        public virtual Locations BoardingLocation { get; set; }

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan departureTime { get; set; }

        [Required]
        public int ArrivalLocationID { get; set; }

        public virtual Locations ArrivalLocation { get; set; }

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan arrivalTime { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [Required]
        public double Price { get; set; }
    }
}