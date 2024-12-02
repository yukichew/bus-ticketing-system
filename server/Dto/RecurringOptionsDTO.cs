namespace server.Dto
{
    public class RecurringOptionsDTO
    {
        public string Options { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public List<string>? SelectDays { get; set; }
        public string Status { get; set; }
    }

}
