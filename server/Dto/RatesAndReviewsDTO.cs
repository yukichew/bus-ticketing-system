using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class RatesAndReviewsDTO
    {
        public int ID { get; set; }

        public string BusOperatorID { get; set; }

        public string Comment { get; set; }
        [Required(ErrorMessage = "Rate is required")]
        public int Rate { get; set; }
        [Required(ErrorMessage = "PostedById is required")]
        public int PostedById { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }
}
