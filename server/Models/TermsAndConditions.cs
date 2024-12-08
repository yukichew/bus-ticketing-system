using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class TermsAndConditions
    {
        public int TACId { get; set; } 

        [Required]
        [MaxLength(100)]
        public string PolicyTitle { get; set; } 

        [Required]
        public string Terms { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; }

        public DateTime CreatedAt { get; set; } 
        public DateTime? UpdatedAt { get; set; }

        // Helper to handle conversion of terms
        public List<string> GetTermsList()
        {
            return Terms.Split(';').Select(t => t.Trim()).ToList();
        }

        public void SetTermsList(List<string> termsList)
        {
            Terms = string.Join("; ", termsList);
        }
    }
}
