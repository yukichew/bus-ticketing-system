using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace server.Models
{
    public class BusType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BusTypeID { get; set; }

        [Required]
        public int NoOfSeats { get; set; }

        [Required]
        [StringLength(50)]
        public string Types { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
        public virtual BusOperator? PostedBy { get; set; }
    }
}
