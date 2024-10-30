import React from 'react';
import BookingCard from '../../components/user/BookingCard';
import { bookings } from '../../constants/Dummy';

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
