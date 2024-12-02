using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("AspNetDriver")]
    public class Driver
    {
        [Key]
        [Required]
        public int DriverID { get; set; }

        [Required]
        [StringLength(256)]
        public string Fullname { get; set; }

        [Required]
        [StringLength(50)]
        public string IcNo { get; set; }

        [Required]
        [StringLength(50)]
        public string ContactNo { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime DrivingLicense { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}
