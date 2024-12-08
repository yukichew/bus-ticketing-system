using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class RecurringOptionsDTO
    {
        [Required(ErrorMessage = "Options is required")]
        public string Options { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public List<string>? SelectDays { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }

}
