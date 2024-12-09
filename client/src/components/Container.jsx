import React from 'react';
import Navbar from './common/Navbar';
import Footer from './Footer';

const Container = ({ children }) => {
  return (
    <div className='font-poppins flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
