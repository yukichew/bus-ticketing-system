using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace server.Models
{
    public class RatesAndReviews
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        [Required]
        [StringLength(450)]
        public string BusOperatorID { get; set; }
        [ForeignKey("BusOperatorID")]
        public virtual BusOperator BusOperator { get; set; }
        [StringLength(450)]
        public string Comment { get; set; }
        [Required]
        public int Rate { get; set; }
        [Required]
        public Guid PostedById { get; set; }
        [ForeignKey("PostedById")]
        public virtual Passenger PostedBy { get; set; }
        [Required]
        public DateTime PostedAt { get; set; }
        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}