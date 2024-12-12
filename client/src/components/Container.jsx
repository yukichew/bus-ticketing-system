import React, { useEffect } from 'react';
import Navbar from './common/Navbar';
import Footer from './Footer';

const Container = ({ children }) => {
  useEffect(() => {
    const clearSeatsTimeout = setTimeout(() => {
      localStorage.removeItem('selectedSchedule');
      localStorage.removeItem('selectedReturnSchedule');
      localStorage.removeItem('onwardSelectedSeats');
      localStorage.removeItem('returnSelectedSeats');
      localStorage.removeItem('busSearch');
      localStorage.removeItem('isRoundTrip');
    }, 60 * 1000 * 5); // 5 minutes
    return () => clearTimeout(clearSeatsTimeout);
  }, []);

  return (
    <div className='font-poppins flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
