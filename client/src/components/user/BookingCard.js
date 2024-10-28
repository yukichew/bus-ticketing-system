import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const BookingCard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className='rounded-lg font-poppins shadow-md mb-4 w-11/12 lg:max-w-7xl mx-auto bg-slate-50 border'>
      <div className='grid grid-cols-1 md:grid-cols-7 p-6 gap-2 items-center'>
        {/* trip date and time */}
        <div className=''>
          <p className='font-extrabold text-xl md:text-2xl text-primary'>15</p>
          <p className='text-gray-600 text-sm md:text-base'>October 2024</p>
        </div>

        {/* departure and arrival */}
        <div className='col-span-2'>
          <p className='font-semibold md:text-lg'>Batu Pahat - Kuala Lumpur</p>
          <p className='text-gray-600 text-sm'>KKKL Express</p>
        </div>

        {/* boarding */}
        <div className='col-span-2'>
          <p className='font-semibold'>Boarding</p>
          <p className='text-gray-500 font-medium text-sm'>
            Batu Pahat Bus Terminal - 15: 00
          </p>
        </div>

        {/* status */}
        <div className=''>
          <p className='font-semibold'>Completed</p>
          <p className='text-gray-500 text-sm'>Booking ID: 123456</p>
        </div>

        {/* action */}
        <div className='flex justify-end'>
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className='w-fit text-gray-500 hover:text-primary'
            aria-label='More'
          >
            <SlOptionsVertical size={18} />
          </button>

          {dropdownVisible && (
            <div className='absolute mt-6 w-48 bg-white border border-gray-200 rounded-md shadow-lg text-gray-700 font-medium'>
              <Link
                to='/ticket-details'
                className='block px-4 py-3 hover:bg-gray-100'
              >
                Ticket Details
              </Link>
              <Link
                to='/rate-review'
                className='block px-4 py-3 hover:bg-gray-100'
              >
                Rate and Review
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
