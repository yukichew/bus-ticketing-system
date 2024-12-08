using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Faq
    {
        public int FaqId { get; set; } 

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
