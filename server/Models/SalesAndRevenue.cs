//using System;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace server.Models
//{
//    [Table("AspNetSalesAndRevenue")]
//    public class SalesAndRevenue
//    {
//        [Key]
//        public int ID { get; set; }

//        [ForeignKey("BusOperator")]
//        public int BusOperatorID { get; set; }
//        public BusOperator BusOperator { get; set; }

//        [Column(TypeName = "decimal(18,2)")]
//        [Range(0, double.MaxValue)]
//        public decimal TotalIncome { get; set; }

//        [Column(TypeName = "decimal(18,2)")]
//        [Range(0, double.MaxValue)]
//        public decimal TotalRefund { get; set; }
//    }
//}
