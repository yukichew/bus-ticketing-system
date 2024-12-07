import React from "react";
import Navbar from "./common/Navbar";
import Footer from "./Footer";

const Container = ({ children }) => {
  return (
    <div className='font-poppins'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
