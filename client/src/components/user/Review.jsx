import React, { useEffect, useState } from 'react';
import Stars from '../common/Stars';
import { getPassenger } from '../../api/passenger';
import { format } from 'date-fns';

const Review = ({ review }) => {
  const [passenger, setPassenger] = useState({});

  useEffect(() => {
    const fetchPassenger = async () => {
      const result = await getPassenger(review.postedById);
      setPassenger(result);
    };

    fetchPassenger();
  }, []);

  return (
    <div className='border rounded-lg p-3 my-2'>
      <div className='flex flex-row justify-between mb-1'>
        <p className='text-sm font-semibold'>{passenger.fullname}</p>
        <p className='text-xs text-gray-400'>
          {format(new Date(review.postedAt), 'MMM dd, yyyy HH:mm:ss')}
        </p>
      </div>

      <Stars
        rating={review.rate}
        size={15}
      />

      <p className='text-sm text-gray-500 text-justify mt-2'>
        {review.comment}
      </p>
    </div>
  );
};

export default Review;
