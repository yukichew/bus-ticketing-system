﻿namespace server.Dto
{
    public class BusScheduleDTO
    {
        public DateTime TravelDate { get; set; }
        public string ETD { get; set; }
        public string ETA { get; set; }
        public bool IsRecurring { get; set; }
        public int BusID { get; set; }
        public int DriverID { get; set; }
        public RoutesDTO Routes { get; set; }
        public RecurringOptionsDTO? RecurringOptions { get; set; }
        public string ScheduleStatus { get; set; }
        public string Status { get; set; }
    }

}
