using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Routes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RouteID { get; set; }

        [Required]
        public Guid BoardingLocationID { get; set; }

        public virtual Locations BoardingLocation { get; set; }

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan DepartureTime { get; set; }

        [Required]
        public Guid ArrivalLocationID { get; set; }

        public virtual Locations ArrivalLocation { get; set; }

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan ArrivalTime { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [Required]
        public double Price { get; set; }
    }
}