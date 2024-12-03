using server.Models;

namespace server.Dto
{
    public class BookingDto
    {
        public int BookingID { get; set; }
        public int BusScheduleID { get; set; }
        public virtual BusSchedule BusSchedule { get; set; }
        public int PassengerID { get; set; }
        public virtual Passenger? Passenger { get; set; }
        public string BookingStatus { get; set; }
        public double AmountPaid { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<int> seatNumbers { get; set; }
    }
}
