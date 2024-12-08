using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class BusScheduleDTO
    {
        public DateTime TravelDate { get; set; }

        [Required(ErrorMessage = "ETD is required")]
        public string ETD { get; set; }

        [Required(ErrorMessage = "ETD is required")]
        public string ETA { get; set; }

        [Required(ErrorMessage = "IsRecurring is required")]
        public bool IsRecurring { get; set; }

        [Required(ErrorMessage = "BusID is required")]
        public Guid BusID { get; set; }

        public RoutesDTO Routes { get; set; }

        public RecurringOptionsDTO? RecurringOptions { get; set; }

        [Required(ErrorMessage = "Schedule Status is required")]
        public string ScheduleStatus { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
        public string? Reasons { get; set; }
    }

}
