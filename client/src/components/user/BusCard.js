import React from 'react';
import { FaStar } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { LiaSquareFullSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import CustomButton from '../common/CustomButton';

const BusCard = ({ schedule }) => {
  return (
    <div className='rounded-lg font-poppins shadow-md mb-4 w-11/12 lg:max-w-7xl mx-auto bg-slate-50 border'>
      <div className='grid grid-cols-1 md:grid-cols-6 p-4 items-center'>
        {/* bus operator name */}
        <div className='flex flex-row items-center'>
          <img
            src='https://play-lh.googleusercontent.com/d1cjmKV2dLeDJZEUqv4lBtu9d8gEj28kElEVJC2STrvnkBAWnZierYGzm-p6YiFOJgSv'
            alt={schedule.name}
            className='rounded-full w-10 h-10 md:w-14 md:h-14'
          />
          <div className='ml-2'>
            <p className='text-sm font-semibold md:text-base'>
              {schedule.name}
            </p>
            <p className='font-medium text-gray-600 text-xs md:text-sm'>
              {schedule.type}
            </p>
          </div>
        </div>

        <p className='font-bold text-lg md:hidden'>{schedule.price}</p>

        {/* departure and arrival */}
        <div className='grid grid-cols-3 items-center col-span-3 text-center mt-4 mb-4 md:mt-0 md:mb-0'>
          <div>
            <p className='font-semibold text-lg md:text-xl'>
              {schedule.departureTime}
            </p>
            <p className='text-gray-600 text-xs md:text-sm'>
              {schedule.departureLocation}
            </p>
          </div>

          <div className='text-center'>
            <p className='text-gray-500 text-sm font-medium'>
              {schedule.duration}
            </p>
            <div className='flex items-center justify-center mx-2 text-gray-300'>
              <LiaSquareFullSolid size={10} />
              <div className='border-t-2 border-gray-300 w-full -mx-1'></div>
              <LiaSquareFullSolid size={10} />
            </div>
          </div>

          <div>
            <p className='font-semibold text-lg md:text-xl'>
              {schedule.arrivalTime}
            </p>
            <p className='text-gray-600 text-xs md:text-sm'>
              {schedule.arrivalLocation}
            </p>
          </div>
        </div>

        {/* price and capacity */}
        <div className='grid grid-cols-2 items-center'>
          <p className='hidden md:block mx-auto font-bold text-xl'>
            {schedule.price}
          </p>

          <div className='flex-row flex md:flex-col md:justify-center md:items-center md:ml-auto'>
            <div className='bg-green-600 rounded-md p-1 md:p-2'>
              <div className='flex flex-row items-center text-white'>
                <FaStar className='w-2 md:w-3' />
                <p className='font-medium text-xs md:text-sm ml-1'>
                  {schedule.rating}
                </p>
              </div>
            </div>

            <div className='flex flex-row items-center text-gray-600 ml-2 md:ml-0 md:mt-1'>
              <GoPeople className='w-3 md:w-4' />
              <p className='font-medium text-xs text-center pl-1'>
                {schedule.passengers}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='hidden md:block w-3/5'>
            <CustomButton title='SELECT' className='font-semibold' />
          </div>
          <Link
            to={`/bus/${schedule.id}`}
            className='text-sm md:text-base text-primary mt-1 font-medium hover:underline'
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusCard;
