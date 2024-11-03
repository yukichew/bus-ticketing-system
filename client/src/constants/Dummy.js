export const bus = {
  name: 'KKKL Express',
  images: [
    'https://cdn.busonlineticket.com/vehicle-images/kkkl-express-1.jpg',
    'https://cdn.busonlineticket.com/vehicle-images/kkkl-express-2.jpg',
  ],
};

export const bookings = [
  {
    bookingID: 'BNG123456',
    tripNo: 123456,
    busOperator: 'Super Nice Express',
    busType: 'Executive (2+1)',
    date: '01/10/2024',
    departureTime: '10:15',
    departureLocation: 'Batu Pahat',
    boardingLocation: 'Batu Pahat Bus Terminal',
    arrivalTime: '14:15',
    arrivalLocation: 'Kuala Lumpur',
    price: '35.00',
    seatNo: 'A1',
    status: 'Completed',
    purchaseAt: '01/10/2024',
    passengerName: 'John Doe',
  },
  {
    bookingID: 2,
    tripNo: 123457,
    busOperator: 'Super Nice Express',
    busType: 'Executive (2+1)',
    date: '01/10/2024',
    departureTime: '10:15',
    departureLocation: 'Batu Pahat',
    boardingLocation: 'Batu Pahat Bus Terminal',
    arrivalTime: '14:15',
    arrivalLocation: 'Kuala Lumpur',
    price: '35.00',
    seatNo: 'A1',
    status: 'Completed',
    purchaseAt: '01/10/2024',
    passengerName: 'John Doe',
  },
];

export const busSchedule = [
  {
    id: 1,
    name: 'Super Nice Express',
    type: 'Executive (2+1)',
    duration: '4h',
    departureTime: '10:15',
    departureLocation: 'JB Larkin',
    arrivalTime: '14:15',
    arrivalLocation: 'Penang Sentral',
    rating: 4.5,
    passengers: 27,
    price: 'RM 35.00',
  },
  {
    id: 2,
    name: 'Super Nice Express',
    type: 'Executive (2+1)',
    duration: '4h',
    departureTime: '10:15',
    departureLocation: 'JB Larkin',
    arrivalTime: '14:15',
    arrivalLocation: 'Penang Sentral',
    rating: 4.5,
    passengers: 27,
    price: 'RM 35.80',
  },
  {
    id: 3,
    name: 'Super Nice Express',
    type: 'Executive (2+1)',
    duration: '4h',
    departureTime: '10:15',
    departureLocation: 'JB Larkin',
    arrivalTime: '14:15',
    arrivalLocation: 'Penang Sentral',
    rating: 4.5,
    passengers: 27,
    price: 'RM 12.00',
  },
  {
    id: 4,
    name: 'Super Nice Express',
    type: 'Executive (2+1)',
    duration: '4h',
    departureTime: '10:15',
    departureLocation: 'JB Larkin',
    arrivalTime: '14:15',
    arrivalLocation: 'Penang Sentral',
    rating: 4.5,
    passengers: 27,
    price: 'RM 35.00',
  },
  {
    id: 5,
    name: 'Super Nice Express',
    type: 'Executive (2+1)',
    duration: '4h',
    departureTime: '10:15',
    departureLocation: 'JB Larkin',
    arrivalTime: '14:15',
    arrivalLocation: 'Penang Sentral',
    rating: 4.5,
    passengers: 27,
    price: 'RM 35.00',
  },
];

export const reviews = [
  {
    id: 1,
    name: 'John Doe',
    date: '20/01/2024',
    rating: 4,
    comment:
      'The delay was over an hour which I thought they had pushed us to the next timing slot since there were only 3 passenger for the original allocated time slot. The driver was rude, smoked while driving, and the smell disrupt passenger on board.',
  },
  {
    id: 2,
    name: 'John Doe',
    date: '20/01/2024',
    rating: 3,
    comment:
      'The delay was over an hour which I thought they had pushed us to the next timing slot since there were only 3 passenger for the original allocated time slot.',
  },
];

export const OneStarReviews = [
  {
    id: 1,
    name: 'Mary Jones',
    date: '15/01/2024',
    rating: 1,
    comment:
      'Terrible experience. The driver never showed up, and I had to wait for over 2 hours.',
  },
  {
    id: 2,
    name: 'Sam Wilson',
    date: '10/02/2024',
    rating: 1,
    comment:
      'The vehicle broke down midway, and the driver was completely unprofessional about it.',
  },
  {
    id: 3,
    name: 'Anna Green',
    date: '05/03/2024',
    rating: 1,
    comment:
      'Worst experience ever! The driver didn’t pick me up, and customer service was unhelpful.',
  },
];

export const TwoStarsReviews = [
  {
    id: 1,
    name: 'Tom Lee',
    date: '17/01/2024',
    rating: 2,
    comment:
      'The driver was rude and the car was not clean. Not happy with the service.',
  },
  {
    id: 2,
    name: 'Rachel Adams',
    date: '25/01/2024',
    rating: 2,
    comment:
      'Driver was late by 30 minutes, and the air conditioning didn’t work properly. Could be better.',
  },
  {
    id: 3,
    name: 'Mark Davis',
    date: '08/02/2024',
    rating: 2,
    comment:
      'Not the best. The car smelled bad, and the ride was bumpy. Expected better for the price.',
  },
];

export const ThreeStarsReviews = [
  {
    id: 1,
    name: 'Alice Brown',
    date: '18/01/2024',
    rating: 3,
    comment:
      'The delay was over an hour, but the rest of the service was decent. Could be improved.',
  },
  {
    id: 2,
    name: 'Peter Clarkson',
    date: '02/02/2024',
    rating: 3,
    comment:
      'Average experience. Driver was polite, but the car wasn’t in great shape.',
  },
  {
    id: 3,
    name: 'Lisa Grey',
    date: '14/02/2024',
    rating: 3,
    comment:
      'Nothing special. It was a decent ride, but the driver didn’t follow the shortest route.',
  },
];

export const FourStarsReviews = [
  {
    id: 1,
    name: 'John Doe',
    date: '20/01/2024',
    rating: 4,
    comment:
      'The delay was over an hour, which I thought they had pushed us to the next timing slot. The driver was rude, smoked while driving, and the smell disrupted passengers on board.',
  },
  {
    id: 2,
    name: 'Michael Scott',
    date: '28/01/2024',
    rating: 4,
    comment:
      'Good overall. A bit of a delay, but the driver was very courteous and the car was comfortable.',
  }
];

export const FiveStarsReviews = [
  {
    id: 1,
    name: 'Jane Smith',
    date: '22/01/2024',
    rating: 5,
    comment:
      'Excellent service! The driver was punctual and the car was very clean. Highly recommend this service!',
  },
  {
    id: 2,
    name: 'David Lee',
    date: '01/02/2024',
    rating: 5,
    comment:
      'Fantastic! The driver was very friendly, and the car was spotless. Highly recommend.',
  },
  {
    id: 3,
    name: 'Emily White',
    date: '10/02/2024',
    rating: 5,
    comment:
      'Best ride I’ve had! Driver was early, car was very clean, and the entire trip was smooth. Will definitely use again!',
  },
];

export const policies = [
  'No rescheduling',
  'No cancellation or refund after booking',
  'No refund for no-show or late arrival',
];
