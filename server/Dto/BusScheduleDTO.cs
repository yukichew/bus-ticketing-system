namespace server.Dto
{
    public class BusScheduleDTO
    {
        public bool IsRecurring { get; set; }
        public int BusID { get; set; }
        public int DriverID { get; set; }
        public RoutesDTO Routes { get; set; }
        public RecurringOptionsDTO? RecurringOptions { get; set; }
        public string ScheduleStatus { get; set; }
        public string Status { get; set; }
    }

}
