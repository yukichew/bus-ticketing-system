import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const elementStyle = {
  base: {
    color: "#32325d",
    fontFamily: '"Poppins", sans-serif',
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
  },
};

const PaymentCard = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className='mb-3'>
      <label className='text-gray-700 my-1 text-sm pl-1'>Card Number</label>
      <div className='border rounded-lg p-3 shadow-sm'>
        <CardNumberElement options={{ style: elementStyle }} />
      </div>
    </div>
    <div className='mb-4 grid grid-cols-2 gap-4'>
      <div>
        <label className='text-gray-700 my-1 text-sm pl-1'>Expiry Date</label>
        <div className='border rounded-lg p-3 shadow-sm'>
          <CardExpiryElement options={{ style: elementStyle }} />
        </div>
      </div>
      <div>
        <label className='text-gray-700 my-1 text-sm pl-1'>CVC</label>
        <div className='border rounded-lg p-3 shadow-sm'>
          <CardCvcElement options={{ style: elementStyle }} />
        </div>
      </div>
    </div>
  </form>
);

export default PaymentCard;
