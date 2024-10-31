import React from 'react';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/Footer';
import TripSummary from '../../components/user/TripSummary';

const Payment = () => {
  return (
    <div className='font-poppins'>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto space-y-5 pt-10 pb-12 px-10'>
        <div className='md:col-span-2 border-t-4 border-t-primary rounded-lg p-4 shadow-md'>
          <h2 className='text-lg font-semibold'>Secure Payment Page</h2>
          <p className='text-gray-500 text-sm'>
            Please complete your payment to confirm your booking
          </p>
        </div>

        <div className='bg-slate-50 rounded-lg shadow-sm border p-4'>
          <h2 className='text-lg font-semibold'>Pickup & Drop off</h2>
          <TripSummary />
          <div className='flex justify-between font-semibold border-t-2 mt-3 pt-3'>
            <p>Seat No.</p>
            <p>18, 16, 25</p>
          </div>

          <div className='flex justify-between font-semibold border-t-2 mt-3 pt-3'>
            <p>Amount</p>
            <p>RM 72.00</p>
          </div>
        </div>

        <div className='md:p-4'>
          <h2 className='text-lg font-semibold'>Payment</h2>
          <p className='text-gray-700 mt-1'>Please enter your card details.</p>

          <form className='mt-5 space-y-4'>
            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
              <CustomInput
                id={'fullname'}
                name={'fullname'}
                placeholder={'Full Name (as displayed on card)'}
                type={'text'}
                required
                value={''}
                onChange={() => {}}
              />
              <CustomInput
                id={'cardnumber'}
                name={'cardnumber'}
                placeholder={'Card Number (xxxx-xxxx-xxxx-xxxx)'}
                type={''}
                required
                value={''}
                onChange={() => {}}
              />
            </div>

            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-3'>
              <CustomInput
                id={'cardExpiry'}
                name={'cardExpiry'}
                placeholder={'Card Expiration (MM/YY)'}
                type={'text'}
                required
                value={''}
                onChange={() => {}}
              />
              <CustomInput
                id={'cvv'}
                name={'cvv'}
                placeholder={'CVV'}
                type={'number'}
                required
                value={''}
                onChange={() => {}}
              />
            </div>
            <CustomButton title={'Pay Now'} type={'submit'} className={''} />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
