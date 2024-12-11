import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import Rating from '../../screens/user/modal/Rating';
import Modal from '../common/Modal';
import Ticket from './Ticket';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ booking, seatNumber, user }) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [viewPdf, setViewPdf] = useState(false);
  const [ratingView, setRatingView] = useState(false);

  const handleViewPdf = () => {
    setViewPdf(true);
    setDropdownVisible(false);
  };

  const handleRateReview = () => {
    setRatingView(true);
    setDropdownVisible(false);
  };

  const handleContinuePayment = () => {
    navigate('/payment', {
      state: {
        bookingID: booking.bookingID,
        email: user.email,
        fullname: user.fullname,
        amountPaid: booking.amountPaid,
      },
    });
  };

  return (
    <div className='rounded-lg font-poppins shadow-md mb-4 mx-auto bg-slate-50 border'>
      <div className='grid grid-cols-1 md:grid-cols-10 p-6 gap-2 items-center'>
        {/* trip date and time */}
        <div className=''>
          <p className='font-extrabold text-xl md:text-2xl text-primary'>
            {' '}
            {format(new Date(booking.busSchedule.travelDate), 'dd')}
          </p>
          <p className='text-gray-600 text-sm md:text-base'>
            {format(new Date(booking.busSchedule.travelDate), 'MMM yyyy')}
          </p>
        </div>

        {/* departure and arrival */}
        <div className='col-span-3 pl-3'>
          <p className='font-semibold md:text-lg'>
            {booking.busSchedule.routes.boardingLocation.state} -{' '}
            {booking.busSchedule.routes.arrivalLocation.state}
          </p>
          <p className='text-gray-600 text-sm'>
            {booking.busSchedule.postedBy.fullname}
          </p>
        </div>

        {/* boarding */}
        <div className='col-span-3 pl-2'>
          <p className='font-semibold'>Boarding</p>
          <p className='text-gray-500 font-medium text-sm'>
            {booking.busSchedule.routes.boardingLocation.name}
          </p>
          <p className='text-gray-500 font-medium text-sm'>
            {booking.busSchedule.etd}
          </p>
        </div>

        {/* status */}
        <div className='col-span-2'>
          <p className='font-semibold'>{booking.bookingStatus}</p>
          <p className='text-gray-500 text-sm'>ID: {booking.bookingID}</p>
        </div>

        {/* action button */}
        <div className='flex justify-end'>
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className='w-fit text-gray-500 hover:text-primary'
            aria-label='More'
          >
            <SlOptionsVertical size={18} />
          </button>

          {dropdownVisible && (
            <div className='absolute mt-6 w-48 bg-white border border-gray-200 rounded-md shadow-lg text-gray-700 font-medium'>
              <button
                onClick={handleViewPdf}
                className='block w-full py-3 hover:bg-gray-100'
              >
                Ticket Details
              </button>
              <button
                onClick={handleRateReview}
                className='block w-full py-3 hover:bg-gray-100'
              >
                Rate and Review
              </button>
              {booking.bookingStatus === 'Pending' && (
                <button
                  onClick={handleContinuePayment}
                  className='block w-full py-3 hover:bg-gray-100 text-red-500'
                >
                  Continue Payment
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PDF viewer modal */}
      <Modal
        isVisible={viewPdf}
        onClose={() => setViewPdf(false)}
        className='w-11/12 md:w-3/4 lg:w-1/2'
      >
        <Ticket
          booking={booking}
          seatNumber={seatNumber}
          user={user}
        />
      </Modal>

      {/* Rate and review modal */}
      <Modal
        isVisible={ratingView}
        onClose={() => setRatingView(false)}
        className='w-11/12 md:w-3/4 lg:w-1/2'
      >
        <Rating
          booking={booking}
          user={user}
          onSuccess={() => setRatingView(false)}
        />
      </Modal>
    </div>
  );
};

export default BookingCard;
