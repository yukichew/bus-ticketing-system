import React, { useState } from 'react';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import Stars from '../../../components/common/Stars';
import { format } from 'date-fns';
import * as yup from 'yup';
import { validateField } from '../../../utils/validate';
import { addRating } from '../../../api/rating';
import { toast } from 'react-toastify';

const Rating = ({ booking, user, onSuccess }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const ratingSchema = yup.object().shape({
    rating: yup.number().required('Rating is required'),
    comment: yup.string().required('Review is required'),
  });

  const handleChange = (field, value) => {
    if (field === 'comment') setComment(value);
    if (field === 'rating') setRating(value);
    validateField(field, value, setErrors, ratingSchema);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ratingDetails = {
      bookingId: booking.bookingID,
      rate: rating,
      comment,
      status: 'Active',
    };

    const response = await addRating(ratingDetails, user.token);

    if (response?.error) {
      return toast.error(response.message);
    }

    toast.success('Rating added successfully');
    onSuccess();
  };
  
  return (
    <>
      {/* header */}
      <div className='font-semibold text-center mb-5'>
        <h2 className='text-lg'>Rate and Review Your Trip</h2>
        <p className='text-primary'>
          with {booking.busSchedule.postedBy.userName}
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 mb-3'>
        {/* trip summary */}
        <div className='bg-gray-100 p-4 rounded-md mb-4 md:mb-0'>
          <p className='text-primary tracking-wide font-semibold'>
            TRIP SUMMARY
          </p>
          <p className='text-xs'>
            Trip No. :{' '}
            <span className='font-medium'>
              {booking.busSchedule.busScheduleID}
            </span>
          </p>

          {/* departure and arrival */}
          <div className='grid grid-cols-2 text-sm mt-3 md:mt-6 border-b-2 pb-3'>
            <div>
              <p className='font-semibold'>
                {booking.busSchedule.routes.boardingLocation.state}
              </p>
              <p className='text-gray-500'>
                {booking.busSchedule.routes.boardingLocation.name}
              </p>
            </div>
            <div>
              <p className='font-semibold'>
                {booking.busSchedule.routes.arrivalLocation.state}
              </p>
              <p className=' text-gray-500'>
                {booking.busSchedule.routes.arrivalLocation.name}
              </p>
            </div>
          </div>

          {/* boarding */}
          <div className='grid grid-cols-2 text-sm mt-3 items-center border-b-2 pb-3'>
            <p className='font-medium'>
              {format(new Date(booking.busSchedule.travelDate), 'dd/MM/yyyy')}
            </p>
            <p className='font-medium'>{booking.busSchedule.etd}</p>
          </div>

          {/* bus operator */}
          <div className='grid grid-cols-2 text-sm mt-3 items-center'>
            <p>{booking.busSchedule.postedBy.userName}</p>
          </div>
        </div>

        {/* rating and review */}
        <div className='md:px-4 space-y-3'>
          <div className='text-sm text-gray-500 space-y-2'>
            <p>How would you rate the experience on this trip?</p>
            <Stars
              isClickable
              size={24}
              onRatingChange={(value) => handleChange('rating', value)}
            />
            <p>1 star = Terrible, 5 stars = Excellent</p>
          </div>

          <CustomInput
            id={'comment'}
            name={'comment'}
            placeholder={'Review'}
            type={'text'}
            multiline
            required
            onChange={(e) => handleChange('comment', e.target.value)}
            error={errors.comment}
          />
          <CustomButton
            title='SUBMIT'
            type='submit'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Rating;
