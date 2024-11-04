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
