﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Booking
    {
        [Key]
        [Required]
        public int BookingID { get; set; }

        [Required]
        public int BusScheduleID { get; set; }

        [ForeignKey("BusScheduleID")]
        public virtual BusSchedule? BusSchedule { get; set; }

        [Required]
        public int PassengerID { get; set; }

        [ForeignKey("PassengerID")]
        public virtual Passenger? Passenger { get; set; }

        [Required]
        [StringLength(50)]
        public string BookingStatus { get; set; }

        [Required]
        public double AmountPaid { get; set; }

        [Required]
        public DateTime BookingDate { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }
    }
}
