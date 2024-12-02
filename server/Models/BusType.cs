﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace server.Models
{
    [Table("AspNetBusType")]
    public class BusType
    {
        [Key]
        [Required]
        public int BusTypeID { get; set; }

        [Required]
        public int NoOfSeats { get; set; }

        [Required]
        [StringLength(50)]
        public string Types { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}