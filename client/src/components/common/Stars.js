import React from 'react';
import { FaStar } from 'react-icons/fa6';

const Stars = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className='flex justify-center space-x-1'>
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={index} size={18} className='fill-yellow-400' />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar key={index + filledStars} size={18} className='fill-gray-300' />
      ))}
    </div>
  );
};

export default Stars;
