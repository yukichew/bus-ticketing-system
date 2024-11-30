using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("AspNetRoute")]
    public class Routes
    {
        [Key]
        [Required]
        public int RouteID { get; set; }

        [Required]
        [StringLength(256)]
        public string Origin { get; set; }

        [Required]
        public int BoardingLocationID { get; set; }

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan ETD { get; set; }

        [Required]
        [StringLength(256)]
        public string Destination { get; set; }

        [Required]
        public int ArrivalLocationID { get; set; }

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan ETA { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}