import React, { useState } from 'react';
import BusScheduling from '../../../components/busOperator/BusScheduling';
import BusTypes from '../../../components/busOperator/BusTypes';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';

const ManageBus = () => {
  const [activeSection, setActiveSection] = useState('Main');

  const renderContent = () => {
    switch (activeSection) {
      case 'Bus Types':
        return <BusTypes />;
      case 'Bus Scheduling':
        return <BusScheduling />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className='w-4/5 mt-8 mx-auto'>
        <div className='flex items-center'>
          <h2 className='font-poppins font-bold text-2xl'>Bus Management</h2>
        </div>

        <div className='flex items-center space-x-8 mt-5 border-b'>
          <div
            onClick={() => setActiveSection('Bus Types')}
            className={`cursor-pointer pb-2 border-b-2 ${
              activeSection === 'Bus Types'
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-gray-400 hover:text-primary'
            } transition duration-300 flex items-center`}
          >
            <span>Bus Types</span>
          </div>

          <div
            onClick={() => setActiveSection('Bus Scheduling')}
            className={`cursor-pointer pb-2 border-b-2 ${
              activeSection === 'Bus Scheduling'
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-gray-400 hover:text-primary'
            } transition duration-300 flex items-center`}
          >
            <span>Bus Scheduling</span>
          </div>
        </div>

        <div className='mt-6 mb-6'>{renderContent()}</div>
      </div>

      <Footer />
    </>
  );
};

export default ManageBus;
