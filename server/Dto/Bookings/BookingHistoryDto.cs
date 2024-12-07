namespace server.Dto.Booking
{
    public class BookingHistoryDto
    {
        public server.Models.Booking Booking { get; set; }
        public List<int> SeatNumbers { get; set; }
    }
}
