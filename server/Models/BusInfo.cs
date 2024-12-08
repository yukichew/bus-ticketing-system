using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace server.Models
{
    [Index(nameof(BusPlate), IsUnique = true)]
    public class BusInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BusID { get; set; }

        [Required]
        [StringLength(50)]
        public string BusPlate { get; set; }

        [Required]
        public Guid BusTypeID { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        public virtual BusType? BusType { get; }
        public virtual BusOperator? PostedBy { get; set; }
    }
}
