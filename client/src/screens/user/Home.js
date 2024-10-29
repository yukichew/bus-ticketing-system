import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import BusTickets from '../user/BusTickets';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BusTickets />
      <Footer />
    </div>
  );
};

export default Home;
