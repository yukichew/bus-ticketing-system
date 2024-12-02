using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class RecurringOption
    {
        [Key]
        [Required]
        public int RecurringOptionID { get; set; }

        [Required]
        [StringLength(20)]
        public string Options { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }

        [Column(TypeName = "date")]
        public DateTime? FromDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ToDate { get; set; }

        [StringLength(50)]
        public string SelectDays { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}