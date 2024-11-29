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

        //[Required]
        public int RouteID { get; set; }

        [Required]
        [StringLength(50)]
        public string ScheduleStatus { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [ForeignKey("BusID")]
        public virtual BusInfo? BusInfo { get; }

        [ForeignKey("RecurringOptionID")]
        public virtual RecurringOption? RecurringOptions { get; }

        [ForeignKey("DriverID")]
        public virtual Driver? Drivers { get; }

        [ForeignKey("RouteID")]
        public virtual Routes? Routes { get; }
    }
}
