import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomButton from './common/CustomButton';
import CustomInput from './common/CustomInput';
import DatePickerField from './common/DatePickerField';

const Hero = () => {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  return (
    <section className='relative'>
      <img
        src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='absolute inset-0 object-cover w-full h-full'
      />
      <div className='relative bg-gray-900 bg-opacity-65'>
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
          <div className='flex flex-col items-center justify-between xl:flex-row'>
            <div className='w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12'>
              <h2 className='font-poppins max-w-lg mb-4 text-3xl font-bold text-white sm:text-4xl sm:leading-tight'>
                Book Your Bus Tickets on RideNGo
              </h2>
              <p className='font-poppins max-w-xl mb-4 text-base text-gray-400 md:text-lg'>
                RideNGo stands as Malaysia's leading online platform for bus
                ticketing, earning the trust of millions of global travellers.
              </p>
              <Link
                href='/'
                aria-label=''
                className='font-poppins text-white inline-flex items-center font-semibold tracking-wider transition-colors duration-200'
              >
                Learn more <FaChevronRight className='inline-block w-3 ml-2' />
              </Link>
            </div>

            <div className='w-full max-w-xl xl:px-6 xl:w-5/12'>
              <div className='bg-white rounded p-8 sm:p-10'>
                <h3 className='font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl'>
                  Buy Bus Tickets Online
                </h3>
                <form className='space-y-4'>
                  <CustomInput
                    id={'origin'}
                    name={'origin'}
                    placeholder={'From'}
                    type={'text'}
                    required
                  />
                  <CustomInput
                    id={'destination'}
                    name={'destination'}
                    placeholder={'To'}
                    type={'text'}
                    required
                  />
                  <DatePickerField
                    id={'departureDate'}
                    name={'departureDate'}
                    placeholder={'Departure Date'}
                    required
                    selectedDate={departureDate}
                    setSelectedDate={setDepartureDate}
                  />
                  <DatePickerField
                    id={'returnDate'}
                    name={'returnDate'}
                    placeholder={'Return Date'}
                    required
                    selectedDate={returnDate}
                    setSelectedDate={setReturnDate}
                  />
                  <CustomButton title={'Search Buses'} type={'submit'} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
