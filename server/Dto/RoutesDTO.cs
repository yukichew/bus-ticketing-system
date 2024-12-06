namespace server.Dto
{
    public class RoutesDTO
    {
        public int BoardingLocationID { get; set; }
        public string departureTime { get; set; }
        public int ArrivalLocationID { get; set; }
        public string arrivalTime { get; set; }
        public string Status { get; set; }
        public double Price { get; set; }
    }

}
