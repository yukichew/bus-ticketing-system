import React from 'react';
import { FaStar } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { LiaSquareFullSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import CustomButton from '../common/CustomButton';

const BusCard = ({ schedule }) => {
  return (
    <div className='rounded-lg font-poppins w-full shadow-lg'>
      <div className='grid grid-cols-6 p-4 items-center'>
        {/* bus operator name */}
        <div className='flex flex-row items-center'>
          <img
            src='https://play-lh.googleusercontent.com/d1cjmKV2dLeDJZEUqv4lBtu9d8gEj28kElEVJC2STrvnkBAWnZierYGzm-p6YiFOJgSv'
            alt={schedule.name}
            className='rounded-full w-14 h-14'
          />
          <div className='ml-2'>
            <p className='font-semibold '>{schedule.name}</p>
            <p className='font-medium  text-sm text-gray-500'>
              {schedule.type}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-3 items-center col-span-3 text-center'>
          <div>
            <p className='font-semibold text-xl'>{schedule.departureTime}</p>
            <p className='text-gray-500 text-sm'>
              {schedule.departureLocation}
            </p>
          </div>

          <div className='text-center'>
            <p className='text-gray-400 text-sm font-medium'>
              {schedule.duration}
            </p>
            <div className='flex items-center justify-center mx-2 text-gray-300'>
              <LiaSquareFullSolid size={10} />
              <div className='border-t-2 border-gray-300 w-full -mx-1'></div>
              <LiaSquareFullSolid size={10} />
            </div>
          </div>

          <div>
            <p className='font-semibold text-xl'>{schedule.arrivalTime}</p>
            <p className='text-gray-500 text-sm'>{schedule.arrivalLocation}</p>
          </div>
        </div>

        {/* price and capacity */}
        <div className='grid grid-cols-2 items-center'>
          <p className='font-semibold text-2xl'>{schedule.price}</p>

          <div className='flex flex-col justify-center items-center'>
            <div className='bg-green-600 rounded-md py-2 px-3'>
              <div className='flex flex-row items-center text-white'>
                <FaStar size={15} />
                <p className='font-medium text-sm ml-1'>{schedule.rating}</p>
              </div>
            </div>

            <div className='flex flex-row items-center text-gray-500 mt-1'>
              <GoPeople />
              <p className='font-medium text-xs text-center pl-1'>
                {schedule.passengers}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <CustomButton title='SELECT' className='w-2/4' />
          <Link
            to={`/bus/${schedule.id}`}
            className='text-primary mt-1 font-medium hover:underline'
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusCard;
