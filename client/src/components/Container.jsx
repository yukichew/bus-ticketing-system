import React from "react";
import Navbar from "./common/Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = ({ children }) => {
  return (
    <div className='font-poppins'>
      <ToastContainer position='top-center' autoClose={3000} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
