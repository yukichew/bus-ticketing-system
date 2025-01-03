﻿using System.ComponentModel.DataAnnotations;

namespace server.Dto.Bookings
{
    public class TransactionStatusDto
    {
        [Required(ErrorMessage = "Transaction ID is required.")]
        public Guid TransactionID { get; set; }
        [Required(ErrorMessage = "Transaction status is required.")]
        public string Status { get; set; }
    }
}
