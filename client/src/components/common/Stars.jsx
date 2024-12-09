import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';

const Stars = ({
  rating = 0,
  size = 18,
  isClickable = false,
  onRatingChange,
}) => {
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleClick = (index) => {
    if (isClickable) {
      const newRating = index + 1;
      setCurrentRating(newRating);
      onRatingChange && onRatingChange(newRating);
    }
  };

  return (
    <div className='flex space-x-1'>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={size}
          onClick={() => handleClick(index)}
          className={
            index < currentRating
              ? 'fill-yellow-400 cursor-pointer'
              : 'fill-gray-300'
          }
        />
      ))}
    </div>
  );
};

export default Stars;
