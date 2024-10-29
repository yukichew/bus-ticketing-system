import React from 'react';
import Stars from '../common/Stars';

const Review = ({ review }) => {
  return (
    <div className='border rounded-lg font-poppins p-3 my-2'>
      <div className='flex flex-row justify-between mb-1'>
        <p className='text-sm font-semibold'>{review.name}</p>
        <p className='text-xs text-gray-400'>{review.date}</p>
      </div>

      <Stars rating={review.rating} size={15} />

      <p className='text-sm text-gray-500 text-justify mt-2'>
        {review.comment}
      </p>
    </div>
  );
};

export default Review;
