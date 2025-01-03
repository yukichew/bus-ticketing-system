﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class BusSchedule
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BusScheduleID { get; set; }

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

        public Guid? RecurringOptionID { get; set; }

        [ForeignKey("RecurringOptionID")]
        public virtual RecurringOption? RecurringOptions { get; set; }

        [Required]
        public Guid BusID { get; set; }

        [ForeignKey("BusID")]
        public virtual BusInfo? BusInfo { get; set; }

        public Guid RouteID { get; set; }

        [ForeignKey("RouteID")]
        public virtual Routes? Routes { get; set; }

        public string? Reasons { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }

        public virtual BusOperator? PostedBy { get; set; }
    }
}
