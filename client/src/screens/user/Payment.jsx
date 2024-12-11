import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/common/CustomButton';
import TripSummary from '../../components/user/TripSummary';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { confirmTransaction, initiatePayment } from '../../api/transaction';
import PaymentCard from '../../components/user/PaymentCard';
import Container from '../../components/Container';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { email, fullname, amountPaid, bookingID } = location.state || {};
  const schedule = JSON.parse(localStorage.getItem('selectedSchedule'));
  const returnSchedule = JSON.parse(
    localStorage.getItem('selectedReturnSchedule')
  );
  const seats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const navigate = useNavigate();

  useEffect(() => {
    if (!schedule) {
      toast.error('You have not selected a schedule.');
      navigate('/');
    }
  }, [schedule, navigate]);

  if (!schedule) {
    return null;
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const response = await initiatePayment({
      bookingID,
      email,
      amount: amountPaid,
    });

    const { paymentIntentClientSecret, transaction } = await response;
    const cardElement = elements.getElement(CardNumberElement);

    const result = await stripe.confirmCardPayment(paymentIntentClientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: fullname },
      },
    });

    if (result.error) {
      return toast.error(
        `Payment failed: ${result.error.message}. Please try again.`
      );
    }

    const isConfirmed = await confirmTransaction(
      transaction.transactionID,
      'Succeeded'
    );

    if (isConfirmed.error) {
      toast.error(isConfirmed.message);
    }

    setLoading(false);

    localStorage.removeItem('selectedSchedule');
    localStorage.removeItem('selectedReturnSchedule');
    localStorage.removeItem('onwardSelectedSeats');
    localStorage.removeItem('returnSelectedSeats');
    localStorage.removeItem('busSearch');
    localStorage.removeItem('isRoundTrip');
    navigate('/payment-success');
  };

  return (
    <Container>
      {loading && <Loader />}
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto space-y-5 pt-10 pb-12 px-10'>
        <div className='md:col-span-2 border-t-4 border-t-primary rounded-lg p-4 shadow-md'>
          <h2 className='text-lg font-semibold'>Secure Payment Page</h2>
          <p className='text-gray-500 text-sm'>
            Please complete your payment to confirm your booking
          </p>
        </div>

        <div className='bg-slate-50 rounded-lg shadow-sm border p-4'>
          <h2 className='text-lg font-semibold'>Pickup & Drop off</h2>
          <TripSummary schedule={schedule} />
          <div className='flex justify-between font-semibold border-t-2 mt-3 pt-3'>
            <p>Seat No.</p>
            <p>{seats.join(', ')}</p>
          </div>

          <div className='flex justify-between font-semibold border-t-2 mt-3 pt-3'>
            <p>Amount</p>
            <p>{schedule.amountPaid}</p>
          </div>
        </div>

        <div className='md:p-4'>
          <h2 className='text-lg font-semibold mb-3'>Payment Details</h2>
          <form onSubmit={handlePaymentSubmit}>
            <PaymentCard onSubmit={handlePaymentSubmit} />
            <CustomButton
              title='Pay Now'
              type='submit'
              disabled={loading || !stripe}
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Payment;
