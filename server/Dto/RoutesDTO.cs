namespace server.Dto
{
    public class RoutesDTO
    {
        public string Origin { get; set; }
        public int BoardingLocationID { get; set; }
        public string ETD { get; set; }
        public string Destination { get; set; }
        public int ArrivalLocationID { get; set; }
        public string ETA { get; set; }
        public string Status { get; set; }
    }

}
