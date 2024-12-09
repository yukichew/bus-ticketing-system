import React, { useEffect, useState } from 'react';
import BookingCard from '../../components/user/BookingCard';
import Container from '../../components/Container';
import { useAuth } from '../../utils/AuthContext';
import { getBookings } from '../../api/booking';
import { getUserProfile } from '../../api/auth';

const Trips = () => {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      if (auth) {
        const profile = await getUserProfile(auth.token);
        setUser(profile);

        if (profile) {
          const result = await getBookings(profile.email);
          setBookings(result);
        }
      }
    };

    fetchProfileAndBookings();
  }, [auth]);

  return (
    <Container>
      <div className='w-4/5 mx-auto mt-7'>
        <h3 className='font-poppins font-bold text-2xl mb-5 pl-2'>
          Booking History
        </h3>
        {bookings.length === 0 ? (
          <div className='text-center text-lg text-slate-600'>
            You have not booked any trips yet.
          </div>
        ) : (
          <div className=''>
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking.booking}
                seatNumber={booking.seatNumber}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Trips;
