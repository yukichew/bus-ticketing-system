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

        [Required]
        public bool IsRecurring { get; set; }

        public int? RecurringOptionID { get; set; }

        [Required]
        public int BusID { get; set; }

        [Required]
        public int DriverID { get; set; }

        public int RouteID { get; set; }

        [Required]
        [StringLength(50)]
        public string ScheduleStatus { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [ForeignKey("BusID")]
        public virtual BusInfo? BusInfo { get; set; }

        [ForeignKey("RecurringOptionID")]
        public virtual RecurringOption? RecurringOptions { get; set; }

        [ForeignKey("DriverID")]
        public virtual Driver? Drivers { get; set; }

        [ForeignKey("RouteID")]
        public virtual Routes? Routes { get; set; }
    }
}
