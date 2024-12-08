using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class RoutesDTO
    {
        [Required(ErrorMessage = "Boarding Location is required")]
        public Guid BoardingLocationID { get; set; }

        [Required(ErrorMessage = "Departure Time is required")]
        public string DepartureTime { get; set; }

        [Required(ErrorMessage = "Arrival Location is required")]
        public Guid ArrivalLocationID { get; set; }

        [Required(ErrorMessage = "Arrival Time is required")]
        public string arrivalTime { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public double Price { get; set; }
    }

}
