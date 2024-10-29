import React from 'react';
import { CiLock } from 'react-icons/ci';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';

const OTPVerification = ({
  switchToCreateAccount,
  switchToResetPassword,
  source,
}) => {
  const verifyOTP = (e) => {
    e.preventDefault();

    if (source === 'register') {
      switchToCreateAccount();
    } else if (source === 'forgot-password') {
      switchToResetPassword();
    }
  };

  return (
    <>
      <h3 className='font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
        {source === 'register' ? 'Create An Account' : 'Reset Your Password'}
      </h3>
      <div className='font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto'>
        Please enter the 6-digit-code
      </div>
      <form className='mt-12'>
        <CustomInput
          id={'otp'}
          name={'otp'}
          placeholder={'Verification Code'}
          type={'text'}
          required
          icon={CiLock}
        />

        <div className='font-poppins text-left text-sm text-gray-500 mt-3'>
          Didn't receive the code?{' '}
          <span className='underline text-primary cursor-pointer'>Resend</span>
        </div>

        <div className='mt-16'>
          <CustomButton title={'Verify OTP'} onClick={verifyOTP} />
        </div>
      </form>
    </>
  );
};

export default OTPVerification;
