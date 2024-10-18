import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/navbar/Navbar';
import FilesUploadButton from '../components/common/FilesUploadButton';

const Home = () => {
  return (
    <div>
        <Navbar />
        <div className="flex items-center justify-center max-w-lg">
            <FilesUploadButton />
        </div>
        <Footer />
    </div>
  );
};

export default Home;
