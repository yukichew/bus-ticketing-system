namespace server.Dto
{
    public class RoutesDTO
    {
        public Guid BoardingLocationID { get; set; }
        public string DepartureTime { get; set; }
        public Guid ArrivalLocationID { get; set; }
        public string ArrivalTime { get; set; }
        public string Status { get; set; }
        public double Price { get; set; }
    }

}
