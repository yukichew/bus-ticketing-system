using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("AspNetBusSchedule")]
    public class BusSchedule
    {
        [Key]
        [Required]
        public int BusScheduleID { get; set; }

        [Column(TypeName = "date")]
        public DateTime TravelDate { get; set; }

        [Column(TypeName = "time")]
        public TimeSpan ETD { get; set; }

        [Column(TypeName = "time")]
        public TimeSpan ETA { get; set; }

        [Required]
        [StringLength(50)]
        public string ScheduleStatus { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [Required]
        public bool IsRecurring { get; set; }

        public int? RecurringOptionID { get; set; }

        [ForeignKey("RecurringOptionID")]
        public virtual RecurringOption? RecurringOptions { get; set; }

        [Required]
        public int BusID { get; set; }

        [ForeignKey("BusID")]
        public virtual BusInfo? BusInfo { get; set; }

        [Required]
        public int DriverID { get; set; }

        [ForeignKey("DriverID")]
        public virtual Driver? Drivers { get; set; }

        public int RouteID { get; set; }

        [ForeignKey("RouteID")]
        public virtual Routes? Routes { get; set; }

        public string? Reasons { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }
    }
}
