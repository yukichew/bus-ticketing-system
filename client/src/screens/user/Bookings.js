import React from 'react';
import { bookings } from '../../components/constants/Dummy';
import BookingCard from '../../components/user/BookingCard';

const Bookings = () => {
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
