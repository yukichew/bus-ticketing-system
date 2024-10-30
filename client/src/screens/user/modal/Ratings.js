import React from 'react';
import RatingSummary from '../../../components/user/RatingSummary';
import Review from '../../../components/user/Review';
import { reviews } from '../../../constants/Dummy';

const Ratings = () => {
  return (
    <>
      <RatingSummary />
      <h2 className='text-lg font-semibold mt-5'>Reviews</h2>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </>
  );
};

export default Ratings;
