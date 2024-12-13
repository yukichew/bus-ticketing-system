import React, { useEffect, useState } from 'react';
import RatingSummary from '../../../components/user/RatingSummary';
import Review from '../../../components/user/Review';
import { getActiveRatings } from '../../../api/rating';

const Ratings = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const results = await getActiveRatings(id);
      setReviews(Array.isArray(results) ? results : []);
    };

    fetchReviews();
  }, [id]);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <>
          <RatingSummary reviews={reviews} />
          <h2 className='text-lg font-semibold mt-5'>Reviews</h2>
          {reviews.map((review) => (
            <Review
              key={review.id}
              review={review}
            />
          ))}
        </>
      ) : (
        <p>No reviews available</p>
      )}
    </>
  );
};

export default Ratings;
