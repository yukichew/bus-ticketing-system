import React, { useEffect, useState } from "react";
import BookingCard from "../../components/user/BookingCard";
import Container from "../../components/Container";
import { useAuth } from "../../utils/AuthContext";
import { getBookings } from "../../api/booking";

const Trips = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        const result = await getBookings(user.email);
        setBookings(result);
      };

      fetchBookings();
    }
  }, [user]);

  return (
    <Container>
      <div className='py-5'>
        {bookings.length === 0 ? (
          <div className='text-center text-lg text-slate-600'>
            You have not booked any trips yet.
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Trips;
