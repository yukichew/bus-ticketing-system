import React from 'react';
import { FaStar } from 'react-icons/fa6';
import Stars from '../../../components/common/Stars';

const RatingBar = ({ rating, percentage }) => {
  return (
    <div className='flex items-center'>
      <p className='text-sm text-gray-600 font-semibold w-8'>{rating}</p>
      <FaStar size={18} className='fill-gray-600' />
      <div className='bg-gray-300 rounded w-full h-3 ml-3'>
        <div
          className='h-full rounded bg-yellow-400'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className='text-sm text-gray-600 font-semibold ml-3 w-10'>
        {percentage}%
      </p>
    </div>
  );
};

const Ratings = () => {
  return (
    <div className='max-w-sm font-poppins'>
      <h2 className='font-bold text-lg'>Ratings</h2>

      {/* overall ratings */}
      <div className='text-center flex items-center mb-5'>
        <Stars rating={4} />
        <p className='pl-2 text-sm text-gray-600 font-semibold'>
          4.0 <span className='text-xs'>(153 Ratings)</span>
        </p>
      </div>

      {/* ratings overview */}
      <div className='space-y-4'>
        <RatingBar rating='5.0' percentage={66} />
        <RatingBar rating='4.0' percentage={33} />
        <RatingBar rating='3.0' percentage={16} />
        <RatingBar rating='2.0' percentage={8} />
        <RatingBar rating='1.0' percentage={6} />
      </div>
    </div>
  );
};

export default Ratings;
