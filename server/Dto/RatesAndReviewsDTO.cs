using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class RatesAndReviewsDTO
    {
        public int ID { get; set; }

        public string BusOperatorID { get; set; }

        public string Comment { get; set; }

        public int Rate { get; set; }

        public int PostedById { get; set; }

        public string Status { get; set; }
    }
}
