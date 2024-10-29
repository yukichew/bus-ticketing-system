import React from 'react';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Navbar from '../../components/navbar/Navbar';
import Seatmap from '../../components/user/Seatmap';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Seatmap />
      <Footer />
    </div>
  );
};

export default Home;
