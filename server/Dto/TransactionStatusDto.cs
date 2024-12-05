using System.ComponentModel.DataAnnotations;

namespace server.Dto
{
    public class TransactionStatusDto
    {
        [Required(ErrorMessage = "Transaction ID is required.")]
        public string TransactionID { get; set; }
        [Required(ErrorMessage = "Transaction status is required.")]
        public string Status { get; set; }
    }
}
