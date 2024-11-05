export const bus = {
  name: "KKKL Express",
  images: [
    "https://cdn.busonlineticket.com/vehicle-images/kkkl-express-1.jpg",
    "https://cdn.busonlineticket.com/vehicle-images/kkkl-express-2.jpg",
  ],
};

export const bookings = [
  {
    bookingID: "BNG123456",
    tripNo: 123456,
    busOperator: "Super Nice Express",
    busType: "Executive (2+1)",
    date: "01/10/2024",
    departureTime: "10:15",
    departureLocation: "Batu Pahat",
    boardingLocation: "Batu Pahat Bus Terminal",
    arrivalTime: "14:15",
    arrivalLocation: "Kuala Lumpur",
    price: "35.00",
    seatNo: "A1",
    status: "Completed",
    purchaseAt: "01/10/2024",
    passengerName: "John Doe",
  },
  {
    bookingID: 2,
    tripNo: 123457,
    busOperator: "Super Nice Express",
    busType: "Executive (2+1)",
    date: "01/10/2024",
    departureTime: "10:15",
    departureLocation: "Batu Pahat",
    boardingLocation: "Batu Pahat Bus Terminal",
    arrivalTime: "14:15",
    arrivalLocation: "Kuala Lumpur",
    price: "35.00",
    seatNo: "A1",
    status: "Completed",
    purchaseAt: "01/10/2024",
    passengerName: "John Doe",
  },
];

export const busSchedule = [
  {
    id: 1,
    name: "Super Nice Express",
    type: "Executive (2+1)",
    duration: "4h",
    departureTime: "10:15",
    departureLocation: "JB Larkin",
    arrivalTime: "14:15",
    arrivalLocation: "Penang Sentral",
    rating: 4.5,
    passengers: 27,
    price: "RM 35.00",
  },
  {
    id: 2,
    name: "Super Nice Express",
    type: "Executive (2+1)",
    duration: "4h",
    departureTime: "10:15",
    departureLocation: "JB Larkin",
    arrivalTime: "14:15",
    arrivalLocation: "Penang Sentral",
    rating: 4.5,
    passengers: 27,
    price: "RM 35.80",
  },
  {
    id: 3,
    name: "Super Nice Express",
    type: "Executive (2+1)",
    duration: "4h",
    departureTime: "10:15",
    departureLocation: "JB Larkin",
    arrivalTime: "14:15",
    arrivalLocation: "Penang Sentral",
    rating: 4.5,
    passengers: 27,
    price: "RM 12.00",
  },
  {
    id: 4,
    name: "Super Nice Express",
    type: "Executive (2+1)",
    duration: "4h",
    departureTime: "10:15",
    departureLocation: "JB Larkin",
    arrivalTime: "14:15",
    arrivalLocation: "Penang Sentral",
    rating: 4.5,
    passengers: 27,
    price: "RM 35.00",
  },
  {
    id: 5,
    name: "Super Nice Express",
    type: "Executive (2+1)",
    duration: "4h",
    departureTime: "10:15",
    departureLocation: "JB Larkin",
    arrivalTime: "14:15",
    arrivalLocation: "Penang Sentral",
    rating: 4.5,
    passengers: 27,
    price: "RM 35.00",
  },
];

export const reviews = [
  {
    id: 1,
    name: "John Doe",
    date: "20/01/2024",
    rating: 4,
    comment:
      "The delay was over an hour which I thought they had pushed us to the next timing slot since there were only 3 passenger for the original allocated time slot. The driver was rude, smoked while driving, and the smell disrupt passenger on board.",
  },
  {
    id: 2,
    name: "John Doe",
    date: "20/01/2024",
    rating: 3,
    comment:
      "The delay was over an hour which I thought they had pushed us to the next timing slot since there were only 3 passenger for the original allocated time slot.",
  },
];

export const OneStarReviews = [
  {
    id: 1,
    name: "Mary Jones",
    date: "15/01/2024",
    rating: 1,
    comment:
      "Terrible experience. The driver never showed up, and I had to wait for over 2 hours.",
  },
  {
    id: 2,
    name: "Sam Wilson",
    date: "10/02/2024",
    rating: 1,
    comment:
      "The vehicle broke down midway, and the driver was completely unprofessional about it.",
  },
  {
    id: 3,
    name: "Anna Green",
    date: "05/03/2024",
    rating: 1,
    comment:
      "Worst experience ever! The driver didn’t pick me up, and customer service was unhelpful.",
  },
];

export const TwoStarsReviews = [
  {
    id: 1,
    name: "Tom Lee",
    date: "17/01/2024",
    rating: 2,
    comment:
      "The driver was rude and the car was not clean. Not happy with the service.",
  },
  {
    id: 2,
    name: "Rachel Adams",
    date: "25/01/2024",
    rating: 2,
    comment:
      "Driver was late by 30 minutes, and the air conditioning didn’t work properly. Could be better.",
  },
  {
    id: 3,
    name: "Mark Davis",
    date: "08/02/2024",
    rating: 2,
    comment:
      "Not the best. The car smelled bad, and the ride was bumpy. Expected better for the price.",
  },
];

export const ThreeStarsReviews = [
  {
    id: 1,
    name: "Alice Brown",
    date: "18/01/2024",
    rating: 3,
    comment:
      "The delay was over an hour, but the rest of the service was decent. Could be improved.",
  },
  {
    id: 2,
    name: "Peter Clarkson",
    date: "02/02/2024",
    rating: 3,
    comment:
      "Average experience. Driver was polite, but the car wasn’t in great shape.",
  },
  {
    id: 3,
    name: "Lisa Grey",
    date: "14/02/2024",
    rating: 3,
    comment:
      "Nothing special. It was a decent ride, but the driver didn’t follow the shortest route.",
  },
];

export const FourStarsReviews = [
  {
    id: 1,
    name: "John Doe",
    date: "20/01/2024",
    rating: 4,
    comment:
      "The delay was over an hour, which I thought they had pushed us to the next timing slot. The driver was rude, smoked while driving, and the smell disrupted passengers on board.",
  },
  {
    id: 2,
    name: "Michael Scott",
    date: "28/01/2024",
    rating: 4,
    comment:
      "Good overall. A bit of a delay, but the driver was very courteous and the car was comfortable.",
  },
];

export const FiveStarsReviews = [
  {
    id: 1,
    name: "Jane Smith",
    date: "22/01/2024",
    rating: 5,
    comment:
      "Excellent service! The driver was punctual and the car was very clean. Highly recommend this service!",
  },
  {
    id: 2,
    name: "David Lee",
    date: "01/02/2024",
    rating: 5,
    comment:
      "Fantastic! The driver was very friendly, and the car was spotless. Highly recommend.",
  },
  {
    id: 3,
    name: "Emily White",
    date: "10/02/2024",
    rating: 5,
    comment:
      "Best ride I’ve had! Driver was early, car was very clean, and the entire trip was smooth. Will definitely use again!",
  },
];

export const policies = [
  "No rescheduling",
  "No cancellation or refund after booking",
  "No refund for no-show or late arrival",
];

export const transactions = [
  {
    transactionNo: "TXN001",
    purchaseAt: "2024-10-01T10:30:00Z",
    purchaseBy: "John Doe",
    paymentType: "Credit Card",
    amountPaid: 150.0,
    refundReason: "Cancellation",
    status: "Request for Refund",
  },
  {
    transactionNo: "TXN002",
    purchaseAt: "2024-10-02T14:45:00Z",
    purchaseBy: "Jane Smith",
    paymentType: "PayPal",
    amountPaid: 75.5,
    refundReason: "Cancellation",
    status: "Request for Refund",
  },
  {
    transactionNo: "TXN003",
    purchaseAt: "2024-10-03T09:15:00Z",
    purchaseBy: "Alice Johnson",
    paymentType: "Debit Card",
    amountPaid: 200.0,
    refundReason: "Cancellation",
    status: "Request for Refund",
  },
  {
    transactionNo: "TXN004",
    purchaseAt: "2024-10-04T16:00:00Z",
    purchaseBy: "Bob Brown",
    paymentType: "Bank Transfer",
    amountPaid: 300.75,
    refundReason: "Cancellation",
    status: "Processing Refund",
  },
  {
    transactionNo: "TXN005",
    purchaseAt: "2024-10-05T12:30:00Z",
    purchaseBy: "Charlie Davis",
    paymentType: "Cash",
    amountPaid: 120.25,
    refundReason: "Cancellation",
    status: "Processing Refund",
  },
  {
    transactionNo: "TXN006",
    purchaseAt: "2024-10-06T11:00:00Z",
    purchaseBy: "Emily Clark",
    paymentType: "Mobile Payment",
    amountPaid: 45.99,
    refundReason: "",
    status: "Completed",
  },
  {
    transactionNo: "TXN007",
    purchaseAt: "2024-10-07T13:15:00Z",
    purchaseBy: "David Wilson",
    paymentType: "Credit Card",
    amountPaid: 180.5,
    refundReason: "Cancellation",
    status: "Refunded",
  },
  {
    transactionNo: "TXN008",
    purchaseAt: "2024-10-08T15:00:00Z",
    purchaseBy: "Grace Lee",
    paymentType: "PayPal",
    amountPaid: 99.99,
    refundReason: "Cancellation",
    status: "Refunded",
  },
  {
    transactionNo: "TXN009",
    purchaseAt: "2024-10-09T08:45:00Z",
    purchaseBy: "Michael Harris",
    paymentType: "Debit Card",
    amountPaid: 250.0,
    refundReason: "",
    status: "Completed",
  },
  {
    transactionNo: "TXN010",
    purchaseAt: "2024-10-10T17:30:00Z",
    purchaseBy: "Sarah Wilson",
    paymentType: "Cash",
    amountPaid: 60.0,
    refundReason: "",
    status: "Completed",
  },
];

export const passengers = [
  {
    id: "1",
    fullName: "Aminah Abdul Rahim",
    email: "aminah.rahim@example.com",
    dob: "1987-04-12",
    phoneNumber: "+60123456789",
    status: "Active",
  },
  {
    id: "2",
    fullName: "Hafiz Mohamed Yusof",
    email: "hafiz.yusof@example.com",
    dob: "1992-11-21",
    phoneNumber: "+60129876543",
    status: "Active",
  },
  {
    id: "3",
    fullName: "Nurul Iman Binti Ismail",
    email: "nurul.iman@example.com",
    dob: "1995-08-30",
    phoneNumber: "+60172345678",
    status: "Active",
  },
  {
    id: "4",
    fullName: "Kavitha Krishnan",
    email: "kavitha.krishnan@example.com",
    dob: "1989-03-15",
    phoneNumber: "+60125678901",
    status: "Active",
  },
  {
    id: "5",
    fullName: "Lee Chong Wei",
    email: "lee.chongwei@example.com",
    dob: "1984-10-21",
    phoneNumber: "+60167854321",
    status: "Active",
  },
  {
    id: "6",
    fullName: "Jessica Tan",
    email: "jessica.tan@example.com",
    dob: "1990-12-05",
    phoneNumber: "+60123467890",
    status: "Deactivated",
  },
  {
    id: "7",
    fullName: "Ahmad Bin Zulkifli",
    email: "ahmad.zulkifli@example.com",
    dob: "1994-02-18",
    phoneNumber: "+60123458976",
    status: "Active",
  },
  {
    id: "8",
    fullName: "Sara Mohd Amir",
    email: "sara.amir@example.com",
    dob: "1993-07-27",
    phoneNumber: "+60183456789",
    status: "Active",
  },
  {
    id: "9",
    fullName: "Farhan Abdullah",
    email: "farhan.abdullah@example.com",
    dob: "1985-05-30",
    phoneNumber: "+60197812345",
    status: "Active",
  },
  {
    id: "10",
    fullName: "Liyana Hashim",
    email: "liyana.hashim@example.com",
    dob: "1996-09-13",
    phoneNumber: "+60165432789",
    status: "Deactivated",
  },
];

export const busOperators = [
  {
    id: "1",
    companyName: "Trans Malaysia Express",
    companyEmail: "info@transmalaysia.com",
    contactNumber: "+60387654321",
    address: "No. 25, Jalan Ampang, Kuala Lumpur, 50450",
    status: "Deactivated",
  },
  {
    id: "2",
    companyName: "Golden Coach Travels",
    companyEmail: "support@goldencoach.com",
    contactNumber: "+60754321098",
    address: "45, Jalan Tebrau, Johor Bahru, 80000",
    status: "Active",
  },
  {
    id: "3",
    companyName: "Rapid Penang Express",
    companyEmail: "contact@rapidpenang.com",
    contactNumber: "+6045671234",
    address: "88, Lebuh Chulia, George Town, Penang, 10200",
    status: "Active",
  },
  {
    id: "4",
    companyName: "Borneo Star Line",
    companyEmail: "inquiries@borneostarline.com",
    contactNumber: "+6082234567",
    address: "Lot 10, Jalan Tunku Abdul Rahman, Kota Kinabalu, 88000",
    status: "Deactivated",
  },
  {
    id: "5",
    companyName: "East Coast Travel",
    companyEmail: "contact@eastcoasttravel.com",
    contactNumber: "+6092345678",
    address: "25, Jalan Sultan Ismail, Kuala Terengganu, 20100",
    status: "Active",
  },
  {
    id: "6",
    companyName: "Southern Cross Coaches",
    companyEmail: "hello@southerncross.com",
    contactNumber: "+60125678910",
    address: "18, Jalan Tun Razak, Malacca City, 75200",
    status: "Active",
  },
  {
    id: "7",
    companyName: "Skyline Express",
    companyEmail: "services@skylineexpress.com",
    contactNumber: "+60378901234",
    address: "12A, Persiaran KLCC, Kuala Lumpur, 50088",
    status: "Active",
  },
  {
    id: "8",
    companyName: "Green Line Travels",
    companyEmail: "support@greenlinetravels.com",
    contactNumber: "+6058765432",
    address: "19, Jalan Sultan Azlan Shah, Ipoh, Perak, 31400",
    status: "Active",
  },
  {
    id: "9",
    companyName: "Central Highland Coaches",
    companyEmail: "info@centralhighland.com",
    contactNumber: "+6052348765",
    address: "21, Cameron Valley, Tanah Rata, Pahang, 39000",
    status: "Active",
  },
  {
    id: "10",
    companyName: "Sabah Adventures Travel",
    companyEmail: "info@sabahadventures.com",
    contactNumber: "+6088223456",
    address: "Lot 30, Jalan Kepayan, Kota Kinabalu, Sabah, 88200",
    status: "Active",
  },
];

export const applications = [
  {
    id: "1",
    companyName: "Trans Malaysia Express",
    companyEmail: "info@transmalaysia.com",
    contactNumber: "+60387654321",
    address: "No. 25, Jalan Ampang, Kuala Lumpur, 50450",
    status: "Approved",
  },
  {
    id: "2",
    companyName: "Golden Coach Travels",
    companyEmail: "support@goldencoach.com",
    contactNumber: "+60754321098",
    address: "45, Jalan Tebrau, Johor Bahru, 80000",
    status: "Pending",
  },
  {
    id: "3",
    companyName: "Rapid Penang Express",
    companyEmail: "contact@rapidpenang.com",
    contactNumber: "+6045671234",
    address: "88, Lebuh Chulia, George Town, Penang, 10200",
    status: "Approved",
  },
  {
    id: "4",
    companyName: "Borneo Star Line",
    companyEmail: "inquiries@borneostarline.com",
    contactNumber: "+6082234567",
    address: "Lot 10, Jalan Tunku Abdul Rahman, Kota Kinabalu, 88000",
    status: "Pending",
  },
  {
    id: "5",
    companyName: "East Coast Travel",
    companyEmail: "contact@eastcoasttravel.com",
    contactNumber: "+6092345678",
    address: "25, Jalan Sultan Ismail, Kuala Terengganu, 20100",
    status: "Pending",
  },
  {
    id: "6",
    companyName: "Southern Cross Coaches",
    companyEmail: "hello@southerncross.com",
    contactNumber: "+60125678910",
    address: "18, Jalan Tun Razak, Malacca City, 75200",
    status: "Pending",
  },
  {
    id: "7",
    companyName: "Skyline Express",
    companyEmail: "services@skylineexpress.com",
    contactNumber: "+60378901234",
    address: "12A, Persiaran KLCC, Kuala Lumpur, 50088",
    status: "Pending",
  },
  {
    id: "8",
    companyName: "Green Line Travels",
    companyEmail: "support@greenlinetravels.com",
    contactNumber: "+6058765432",
    address: "19, Jalan Sultan Azlan Shah, Ipoh, Perak, 31400",
    status: "Pending",
  },
  {
    id: "9",
    companyName: "Central Highland Coaches",
    companyEmail: "info@centralhighland.com",
    contactNumber: "+6052348765",
    address: "21, Cameron Valley, Tanah Rata, Pahang, 39000",
    status: "Pending",
  },
  {
    id: "10",
    companyName: "Sabah Adventures Travel",
    companyEmail: "info@sabahadventures.com",
    contactNumber: "+6088223456",
    address: "Lot 30, Jalan Kepayan, Kota Kinabalu, Sabah, 88200",
    status: "Pending",
  },
];

export const busRoutes = [
  {
    id: "1",
    busPlate: "ABC 1234",
    origin: "Kuala Lumpur",
    destination: "Penang",
    etd: "09:00",
    eta: "11:00",
    status: "Approved",
  },
  {
    id: "2",
    busPlate: "DEF 5678",
    origin: "Johor Bahru",
    destination: "Kuala Lumpur",
    etd: "09:00",
    eta: "11:00",
    status: "Approved",
  },
  {
    id: "3",
    busPlate: "GHI 9101",
    origin: "Malacca City",
    destination: "Kota Kinabalu",
    etd: "09:00",
    eta: "11:00",
    status: "Approved",
  },
  {
    id: "4",
    busPlate: "JKL 2345",
    origin: "George Town",
    destination: "Kuala Lumpur",
    etd: "09:00",
    eta: "11:00",
    status: "Pending",
  },
  {
    id: "5",
    busPlate: "MNO 6789",
    origin: "Kota Kinabalu",
    destination: "Sandakan",
    etd: "09:00",
    eta: "11:00",
    status: "Pending",
  },
  {
    id: "6",
    busPlate: "PQR 3456",
    origin: "Ipoh",
    destination: "Kuala Lumpur",
    etd: "09:00",
    eta: "11:00",
    status: "Pending",
  },
  {
    id: "7",
    busPlate: "STU 7890",
    origin: "Kuching",
    destination: "Sibu",
    etd: "09:00",
    eta: "11:00",
    status: "Pending",
  },
  {
    id: "8",
    busPlate: "VWX 1230",
    origin: "Kuala Terengganu",
    destination: "Kota Bharu",
    etd: "09:00",
    eta: "11:00",
    status: "Pending",
  },
  {
    id: "9",
    busPlate: "YZA 5678",
    origin: "Shah Alam",
    destination: "Malacca City",
    etd: "09:00",
    eta: "11:00",
    status: "Pending",
  },
  {
    id: "10",
    busPlate: "BCD 9012",
    origin: "Seremban",
    destination: "Kuala Lumpur",
    etd: "09:00",
    eta: "11:00",
    status: "Pending",
  },
];

export const faqData = [
  {
    id: 1,
    category: "General",
    question: "Do I need to register to make booking in RideNGo?",
    answer: "Yes, it is required to register to make a booking.",
    status: "Active",
  },
  {
    id: 2,
    category: "General",
    question:
      "I do not have a printer. Is it a must to take the printout of the ticket?",
    answer:
      "Yes. It is compulsory to print out the e-confirmation of the booking. However, for some bus company, printed e-confirmation is optional as long as you could provide the booking reference number (BOT No./BOT Reference No.). Kindly refer to the notes during your booking and the notes inside the e-confirmation email. You also need to present your ID or the booking reference number to get the boarding pass.Please note that payment receipt CANNOT be used for boarding. Please get the RideNGo Booking Confirmation Email via the email you used to make the booking.",
    status: "Active",
  },
  {
    id: 3,
    category: "Manage Booking",
    question: "Can I reschedule my trip?",
    answer:
      "Reschedule Policy may differ for each operator. If applicable, you can reschedule your bus trip via RideNGo Member Panel. Just log in to your member account and Manage your booking. You will see an option to Reschedule Booking if the booking is reschedulable.",
    status: "Active",
  },
  {
    id: 4,
    category: "Manage Booking",
    question: "Can I cancel my booking?",
    answer:
      "Cancellation and Refund Policy may differ for each operator. If applicable, cancellation and refund request can be done via RideNGo Member Panel or via Check My Booking. Just log in to your member account and Manage your booking. You will see an option to Cancel Booking if the booking is cancellable.",
    status: "Active",
  },
  {
    id: 5,
    category: "Payment & Refund",
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on 'Forgot Password?' on the login page. Enter your registered email, and we’ll send you a link to create a new password.",
    status: "Active",
  },
  {
    id: 6,
    category: "Payment & Refund",
    question:
      "Does the owner of the credit card, with which the ticket is purchased, need to be one of the passengers?",
    answer:
      "No. A passenger can use any card to pay for the ticket, not necessarily his own. However, please note that the passenger in whose name the ticket(s) is/are booked should carry a proof of his identity (along with the ticket) at the time of boarding the bus and the card holder deemed to agree to pay for the booking for this passenger.",
    status: "Active",
  },
  {
    id: 7,
    category: "Technical",
    question: "Is there any mobile friendly website or Apps?",
    answer:
      "Yes. There are mobile friendly website for you to make the booking. Just visit our website from your smart phone, it will redirect you to the mobile site. Alternatively, you may download the apps if you are using Apple or Android platform phone",
    status: "Active",
  },
  {
    id: 8,
    category: "Journey & Visa",
    question: "Will there be any toilet break along the journey?",
    answer:
      "The express bus will normally stop for 10 minutes for toilet break. If you have urgent matters, kindly inform the bus driver.",
    status: "Active",
  },
  {
    id: 9,
    category: "Journey & Visa",
    question: "Can I bring pets on-board?",
    answer:
      "No. Pets are not allowed on-board for bus, train and ferry even if they are in a carrier, crates or cage.",
    status: "Active",
  },
  {
    id: 10,
    category: "Journey & Visa",
    question: "Do I need to have my passport with me to board the express bus?",
    answer:
      "As per Malaysian Authorities rule, foreign traveller must have a recognized and valid passport or international travel document before boarding any express bus even for domestic destination. The bus company reserves the right to reject any copy of passport or copy of international document and passenger may be denied from boarding if the passenger fail to comply with the government rule.",
    status: "Active",
  },
];

export default faqData;
