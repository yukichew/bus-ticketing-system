using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace server.Models
{
    [Table("AspNetBusInfo")]
    [Index(nameof(BusPlate), IsUnique = true)]
    public class BusInfo
    {
        [Key]
        public int BusID { get; set; }

        [Required]
        [StringLength(50)]
        public string BusPlate { get; set; }

        [Required]
        public int BusTypeID { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        public BusType? BusType { get; }
    }
}
