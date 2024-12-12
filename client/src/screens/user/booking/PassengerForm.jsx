import React, { useState } from 'react';
import { BsTelephone } from 'react-icons/bs';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { PiLineVerticalBold } from 'react-icons/pi';
import CustomInput from '../../../components/common/CustomInput';
import * as yup from 'yup';
import { validateField } from '../../../utils/validate';

const PassengerForm = ({ passengerNumber, seatNumber, onChange }) => {
  const [details, setDetails] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});

  const passengerSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    fullname: yup.string().required('Full name is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(
        /^\+60\d{9,10}$/,
        'Phone number must be in the format +60123456789'
      ),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      const updated = { ...prev, [name]: value };
      onChange(updated);
      validateField(name, value, setErrors, passengerSchema);
      return updated;
    });
  };

  return (
    <form className='space-y-2 bg-slate-50 border rounded-lg shadow-md p-3'>
      <div className='text-sm flex flex-row items-center pb-1'>
        <p className='font-semibold'>Passenger {passengerNumber}</p>
      </div>

      <CustomInput
        id={`fullname-${seatNumber}`}
        name={`fullname`}
        placeholder={'Full Name'}
        type={'text'}
        icon={IoPersonOutline}
        required
        value={details.fullname}
        onChange={handleChange}
        error={errors.fullname}
      />

      <div className='flex space-x-3'>
        <CustomInput
          id={`email-${seatNumber}`}
          name={`email`}
          placeholder={'Email'}
          type={'email'}
          icon={MdOutlineEmail}
          required
          value={details.email}
          onChange={handleChange}
          error={errors.email}
        />
        <CustomInput
          id={`phoneNumber-${seatNumber}`}
          name={`phoneNumber`}
          placeholder={'Contact Number'}
          type={'tel'}
          icon={BsTelephone}
          required
          value={details.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
      </div>
    </form>
  );
};

export default PassengerForm;
