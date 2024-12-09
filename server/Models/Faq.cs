using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Faq
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid FaqId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Category { get; set; }

        [Required]
        [MaxLength(250)]
        public string Question { get; set; }

        [Required]
        public string Answer { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
