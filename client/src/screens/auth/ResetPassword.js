import React, { useState } from 'react';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';

const ResetPassword = ({ switchToLogin }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const submitForm = () => {
    switchToLogin();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <h3 className='font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
        Reset Your Password
      </h3>
      <form className='mt-12'>
        <div className='relative mt-3'>
          <CustomInput
            id={'newpassword'}
            name={'newpassword'}
            placeholder={'New Password'}
            type={isPasswordVisible ? 'text' : 'newpassword'}
            required
            icon={IoKeyOutline}
          />
          <div
            className='absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer'
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <IoEye size={20} className='text-gray-400' />
            ) : (
              <IoEyeOff size={20} className='text-gray-400' />
            )}
          </div>
        </div>
        <div className='relative mt-3'>
          <CustomInput
            id={'cpassword'}
            name={'cpassword'}
            placeholder={'Confirm Password'}
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            required
            icon={IoKeyOutline}
          />
          <div
            className='absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer'
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? (
              <IoEye size={20} className='text-gray-400' />
            ) : (
              <IoEyeOff size={20} className='text-gray-400' />
            )}
          </div>
        </div>

        <div className='mt-16'>
          <CustomButton title={'Confirm'} onClick={submitForm} />
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
