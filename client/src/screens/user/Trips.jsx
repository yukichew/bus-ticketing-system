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
        {bookings.map((booking) => (
          <BookingCard booking={booking} key={booking.bookingID} />
        ))}
      </div>
    </Container>
  );
};

export default Trips;
