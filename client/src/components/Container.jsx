import React, { useEffect } from 'react';
import Navbar from './common/Navbar';
import Footer from './Footer';
import { useAuth } from '../utils/AuthContext';

const Container = ({ children }) => {
  const { auth } = useAuth();

  useEffect(() => {
    const clearSeatsTimeout = setTimeout(() => {
      localStorage.removeItem('selectedSchedule');
      localStorage.removeItem('selectedSeats');
    }, 60 * 1000 * 5); // 5 minutes
    return () => clearTimeout(clearSeatsTimeout);
  }, []);

  return (
    <div className='font-poppins flex flex-col min-h-screen'>
      <Navbar auth={auth} />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
