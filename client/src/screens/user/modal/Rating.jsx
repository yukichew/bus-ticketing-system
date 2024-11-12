import React from 'react';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import Stars from '../../../components/common/Stars';

const Rating = () => {
  return (
    <>
      {/* header */}
      <div className='font-semibold text-center mb-5'>
        <h2 className='text-lg'>Rate and Review Your Trip</h2>
        <p className='text-primary'>with KKKL Express</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 mb-3'>
        {/* trip summary */}
        <div className='bg-gray-100 p-4 rounded-md mb-4 md:mb-0'>
          <p className='text-primary tracking-wide font-semibold'>
            TRIP SUMMARY
          </p>
          <p className='text-xs'>
            TICKET ID : <span className='font-medium'>MYTB953689031</span>
          </p>

          {/* departure and arrival */}
          <div className='grid grid-cols-2 text-sm mt-3 md:mt-6 border-b-2 pb-3'>
            <div>
              <p className='font-semibold'>Batu Pahat</p>
              <p className='text-gray-500'>Batu Pahat Bus Terminal</p>
            </div>
            <div>
              <p className='font-semibold'>Kuala Lumpur</p>
              <p className=' text-gray-500'>TBS (Terminal Bersepadu Selatan)</p>
            </div>
          </div>

          {/* boarding */}
          <div className='grid grid-cols-2 text-sm mt-3 items-center border-b-2 pb-3'>
            <p className='font-medium'>15/10/2024</p>
            <p className='font-medium'>8:30 AM</p>
          </div>

          {/* bus operator */}
          <div className='grid grid-cols-2 text-sm mt-3 items-center'>
            <p>KKKL Express</p>
            <p>Tuesday</p>
          </div>
        </div>

        {/* rating and review */}
        <div className='md:px-4 space-y-3'>
          <div className='text-sm text-gray-500 space-y-2'>
            <p>How would you rate the experience on this trip?</p>
            <Stars isClickable size={24} />
            <p>1 star = Terrible, 5 stars = Excellent</p>
          </div>

          <CustomInput
            id={'comment'}
            name={'comment'}
            placeholder={'Review'}
            type={'text'}
            multiline
            required
          />
          <CustomButton title='SUBMIT' type='submit' className='' />
        </div>
      </div>
    </>
  );
};

export default Rating;
