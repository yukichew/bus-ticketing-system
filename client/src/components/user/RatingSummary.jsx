import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import Stars from '../common/Stars';

const RatingBar = ({ rating, percentage }) => {
  return (
    <div className='flex items-center'>
      <p className='text-sm text-gray-600 font-semibold w-8'>{rating}</p>
      <FaStar
        size={18}
        className='fill-gray-600'
      />
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
const RatingSummary = ({ reviews }) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRatings = reviews.length;
      const avgRating =
        reviews.reduce((sum, review) => sum + review.rate, 0) / totalRatings;
      setAverageRating(avgRating);
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  return (
    <div className='max-w-sm font-poppins'>
      <h2 className='font-semibold text-lg'>Ratings</h2>

      {/* overall ratings */}
      <div className='text-center flex items-center mb-5'>
        {averageRating !== null ? (
          <>
            <Stars rating={averageRating} />
            <p className='pl-2 text-sm text-gray-600 font-semibold'>
              {averageRating.toFixed(1)}{' '}
              <span className='text-xs'>({reviews.length} Ratings)</span>
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* ratings overview */}
      <div className='space-y-2'>
        {[5, 4, 3, 2, 1].map((rating) => (
          <RatingBar
            key={rating}
            rating={`${rating}.0`}
            percentage={
              (reviews.filter((review) => review.rate === rating).length /
                reviews.length) *
              100
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
