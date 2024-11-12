import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomButton from '../../../components/common/CustomButton';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import PassengerForm from './PassengerForm';

const Booking = () => {
  const location = useLocation();
  const selectedSeats = location.state?.selectedSeats || [];

  return (
    <>
      <Navbar />

      <div className='max-w-7xl mx-auto space-y-5 pt-10 pb-12 px-10'>
        {/* trip summary */}
        <div className='bg-slate-50 border p-4 rounded-md shadow-md border-t-4 border-t-primary'>
          <div className='text-center'>
            <h3 className='font-bold text-lg'>Trip Summary</h3>
            <p className='text-sm'>Departure Date Time: 28 Feb 2024 12:00 PM</p>
          </div>

          <div className='flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Departure</p>
              <p>Batu Pahat Bus Terminal</p>
            </div>
            <div className='text-right'>
              <p className='font-semibold'>Arrival</p>
              <p>TBS (Terminal Bersepadu Selatan)</p>
            </div>
          </div>
        </div>

        {/* passenger details */}
        <div>
          <h2 className='text-xl font-bold mb-2 pl-1'>Passenger Details</h2>
          {selectedSeats.map((seatNumber, index) => (
            <PassengerForm
              key={seatNumber}
              seatNumber={seatNumber}
              passengerNumber={index + 1}
            />
          ))}
        </div>

        {/* price */}
        <div className='bg-slate-50 p-4 rounded-md shadow-md border'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-lg font-bold'>Total Amount</h3>
            </div>
            <div>
              <h3 className='text-lg font-bold'>
                RM {6.0 * selectedSeats.length}
              </h3>
            </div>
          </div>
        </div>

        <CustomButton
          title={'PROCEED TO PAYMENT'}
          type={'submit'}
          className={'w-1/5 ml-auto'}
        />
      </div>

      <Footer />
    </>
  );
};

export default Booking;
