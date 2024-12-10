import React, { useEffect, useState, useRef } from 'react';
import Stars from '../common/Stars';
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineReport } from "react-icons/md";
import { getPassenger } from '../../api/passenger';
import { updateReportedStatus } from '../../api/rating';
import { format } from 'date-fns';

const BOReview = ({ review, fetchRatesAndReviewData }) => {
  const token = sessionStorage.getItem('token');
  const [passenger, setPassenger] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const actionDropdownRef = useRef(null);

  const fetchPassenger = async () => {
    const result = await getPassenger(review.postedById);
    setPassenger(result);
  };

  useEffect(() => {
    fetchPassenger();
  }, []);

  const handleReport = async () => {
    const reviewID = review.id;
    await updateReportedStatus(reviewID, token);
    fetchRatesAndReviewData();
    alert("Review reported successfully!");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionDropdownRef.current &&
        !actionDropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className='border rounded-lg p-3 my-2'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-semibold font-poppins mb-1'>{passenger.fullname}</p>
        <div ref={actionDropdownRef} className='relative'>
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className='w-fit text-gray-500 hover:text-primary'
          >
            <CiMenuKebab />
          </button>
          {dropdownVisible && (
            <div className='mt-1 absolute right-0 w-40 bg-white border border-gray-200 rounded shadow-md text-gray-700 text-md font-small font-poppins z-10'>
              <button
                onClick={handleReport}
                className='flex items-center w-full hover:bg-gray-100 px-3 py-2'
              >
                <MdOutlineReport className='mr-2 text-xl' />
                <span className='text-left'>Report</span>
              </button>
            </div>
          )}
        </div>
      </div>
  
      <div className='flex items-center mt-1'>
        <Stars
          rating={review.rate}
          size={16}
        />
        <p className='ml-2 text-xs text-gray-400'>
          {review.postedAt
            ? format(new Date(review.postedAt), 'dd MMM yyyy, HH:mm')
            : 'Invalid Date'}
        </p>
      </div>
  
      <p className='text-sm text-gray-500 text-justify mt-2 font-poppins'>
        {review.comment}
      </p>
    </div>
  );
};

export default BOReview;