import React, { useEffect, useState } from 'react';
import RatingSummary from '../../../components/user/RatingSummary';
import Review from '../../../components/user/Review';
import { getActiveRatings } from '../../../api/rating';

const Ratings = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const results = await getActiveRatings(id);
      setReviews(results);
    };

    fetchReviews();
  }, []);

  return (
    <>
      <RatingSummary reviews={reviews} />
      <h2 className='text-lg font-semibold mt-5'>Reviews</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
          />
        ))
      ) : (
        <p className=''>No reviews available</p>
      )}
    </>
  );
};

export default Ratings;
