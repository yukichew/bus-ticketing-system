import React from 'react';
import { BsTelephone } from 'react-icons/bs';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { PiLineVerticalBold } from 'react-icons/pi';
import CustomInput from '../../../components/common/CustomInput';

const PassengerForm = ({ passengerNumber, seatNumber }) => {
  return (
    <form className='space-y-2 bg-slate-50 border rounded-lg shadow-md p-3'>
      <div className='text-sm flex flex-row items-center pb-1'>
        <p className='font-semibold'>Passenger {passengerNumber}</p>
        <PiLineVerticalBold className='fill-primary mx-2' />
        <p className='font-medium text-gray-600'>Seat {seatNumber}</p>
      </div>

      <CustomInput
        id={`name-${seatNumber}`}
        name={`name-${seatNumber}`}
        placeholder={'Full Name'}
        type={'text'}
        icon={IoPersonOutline}
        required
        value={''}
        onChange={() => {}}
      />

      <div className='flex space-x-3'>
        <CustomInput
          id={`email-${seatNumber}`}
          name={`email-${seatNumber}`}
          placeholder={'Email'}
          type={'email'}
          icon={MdOutlineEmail}
          required
          value={''}
          onChange={() => {}}
        />
        <CustomInput
          id={`contact-${seatNumber}`}
          name={`contact-${seatNumber}`}
          placeholder={'Contact Number'}
          type={'tel'}
          icon={BsTelephone}
          required
          value={''}
          onChange={() => {}}
        />
      </div>
    </form>
  );
};

export default PassengerForm;
