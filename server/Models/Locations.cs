using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace server.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Locations
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid LocationID { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string State { get; set; }

        [StringLength(500)]
        public string Address { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}
