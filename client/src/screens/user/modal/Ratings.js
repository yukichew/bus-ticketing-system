import React from 'react';
import RatingSummary from '../../../components/user/RatingSummary';
import Review from '../../../components/user/Review';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    date: '20/01/2024',
    rating: 4,
    comment:
      'The delay was over an hour which I thought they had pushed us to the next timing slot since there were only 3 passenger for the original allocated time slot. The driver was rude, smoked while driving, and the smell disrupt passenger on board.',
  },
  {
    id: 2,
    name: 'John Doe',
    date: '20/01/2024',
    rating: 3,
    comment:
      'The delay was over an hour which I thought they had pushed us to the next timing slot since there were only 3 passenger for the original allocated time slot.',
  },
];

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
