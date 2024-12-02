//using System;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace server.Models
//{
//    [Table("AspNetRatesAndReviews")]
//    public class RatesAndReviews
//    {
//        [Key]
//        public int ID { get; set; }

//        [ForeignKey("BusOperator")]
//        public int BusOperatorID { get; set; }
//        public BusOperator BusOperator { get; set; }

//        [ForeignKey("Passenger")]
//        public int PassengerID { get; set; }
//        public Passengers Passenger { get; set; }

//        [MaxLength(1000)]
//        public string? Comment { get; set; }

//        [Range(1, 5)]
//        public int Rates { get; set; }

//        public DateTime Date { get; set; }

//        [MaxLength(50)]
//        [Required]
//        public string Status { get; set; }
//    }
//}
