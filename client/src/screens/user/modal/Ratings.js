import React from 'react';
import { reviews } from '../../../components/constants/Dummy';
import RatingSummary from '../../../components/user/RatingSummary';
import Review from '../../../components/user/Review';

const Ratings = () => {
  return (
    <div>
      <RatingSummary />
      <h2 className='text-lg font-semibold mt-5'>Reviews</h2>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default Ratings;
