import React from 'react';
import { IoCalendarOutline } from 'react-icons/io5';
import CustomButton from './common/CustomButton';
import TextField from './common/TextField';

const Hero = () => {
  return (
    <section className='relative'>
      <img
        src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='absolute inset-0 object-cover w-full h-full'
      />
      <div className='relative bg-gray-900 bg-opacity-75'>
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
          <div className='flex flex-col items-center justify-between xl:flex-row'>
            <div className='w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12'>
              <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none'>
                The quick, brown fox <br className='hidden md:block' />
                jumps over a{' '}
                <span className='text-teal-accent-400'>lazy dog</span>
              </h2>
              <p className='max-w-xl mb-4 text-base text-gray-400 md:text-lg'>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                quae.
              </p>
              <a
                href='/'
                aria-label=''
                className='inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700'
              >
                Learn more
                <svg
                  className='inline-block w-3 ml-2'
                  fill='currentColor'
                  viewBox='0 0 12 12'
                >
                  <path d='M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z' />
                </svg>
              </a>
            </div>
            <div className='w-full max-w-xl xl:px-8 xl:w-5/12'>
              <div className='bg-white rounded shadow-2xl p-7 sm:p-10'>
                <h3 className='font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl'>
                  Buy Bus Tickets Online
                </h3>
                <form>
                  <TextField
                    id={'origin'}
                    name={'origin'}
                    placeholder={'From'}
                    type={'text'}
                    required
                  />
                  <TextField
                    id={'destination'}
                    name={'destination'}
                    placeholder={'To'}
                    type={'text'}
                    required
                  />
                  <TextField
                    id={'departureDate'}
                    name={'departureDate'}
                    placeholder={'Departure Date'}
                    type={'text'}
                    required
                    icon={IoCalendarOutline}
                  />
                  <TextField
                    id={'returnDate'}
                    name={'returnDate'}
                    placeholder={'Return Date'}
                    type={'text'}
                    required
                    icon={IoCalendarOutline}
                  />
                  <CustomButton title={'Search Buses'} />
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
