import React from 'react';
import BookingCard from '../../components/user/BookingCard';

const Bookings = () => {
  const bookings = [
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

  return (
    <div className='py-5 font-poppins'>
      <div className=''>
        {bookings.map((booking) => (
          <BookingCard booking={booking} key={booking.tripNo} />
        ))}
      </div>
    </div>
  );
};

export default Bookings;
