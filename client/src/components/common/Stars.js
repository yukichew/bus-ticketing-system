import React from 'react';
import { FaStar } from 'react-icons/fa6';

const Stars = ({ rating, size = 18 }) => {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className='flex space-x-1'>
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={index} size={size} className='fill-yellow-400' />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar
          key={index + filledStars}
          size={size}
          className='fill-gray-300'
        />
      ))}
    </div>
  );
};

export default Stars;
