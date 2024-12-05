import React, { useState } from "react";
import CustomButton from "../../components/common/CustomButton";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";
import TripSummary from "../../components/user/TripSummary";
import { useLocation } from "react-router-dom";

import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { confirmTransaction, initiatePayment } from "../../api/booking";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { bookingID, schedule, seats, email, amountPaid, fullname } =
    location.state || {};
  const [loading, setLoading] = useState(false);

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
      return alert(
        `Payment failed: ${result.error.message}. Please try again.`
      );
    }

    await confirmTransaction(transaction.transactionID, "Succeeded");
    alert("Payment successful!");
    setLoading(false);
  };

  return (
    <div className='font-poppins'>
      <Navbar />
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
            <p>{seats.join(", ")}</p>
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
      <Footer />
    </div>
  );
};

export default Payment;
