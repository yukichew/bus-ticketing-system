using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Passenger
    {
        [Key]
        [Required]
        public int PassengerID { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
