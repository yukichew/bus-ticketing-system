using System.ComponentModel.DataAnnotations;
namespace server.Dto
{
    public class RatesAndReviewsDTO
    {
        public string BusOperatorID { get; set; }
        public string Comment { get; set; }
        public int Rate { get; set; }
        public Guid PostedById { get; set; }
        public string Status { get; set; }
    }
}