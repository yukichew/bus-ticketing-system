import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CiLock } from 'react-icons/ci';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import * as yup from 'yup';
import { validateField } from '../../utils/validate';
import { validateOTP } from '../../api/auth';
import { toast } from 'react-toastify';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { source, type, email } = location.state || {};
  const [otp, setOTP] = useState('');
  const [errors, setErrors] = useState({});

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (source === 'register' && type === 'user') {
      await verifyOTPSchema.validate({ otp }, { abortEarly: false });
      if (source === 'register') {
        const response = await validateOTP(email, otp);
        if (response?.error) {
          return toast.error(response.message);
        }
        toast.success(response.message);
        navigate('/user-registration', {
          state: { email },
        });
      } else if (source === 'forgot-password') {
        navigate('/reset-password');
      }
    }
  };

  const verifyOTPSchema = yup.object().shape({
    otp: yup.string().required('OTP is required'),
  });

  const handleChange = (field, value) => {
    if (field === 'otp') setOTP(value);
    validateField(field, value, setErrors, verifyOTPSchema);
  };

  return (
    <>
      <div className='flex h-screen'>
        {/* Left Side */}
        <div className='flex-1 bg-slate-50 flex items-center justify-center'>
          <div className='text-center p-8'>
            <h2 className='font-poppins text-3xl font-semibold text-gray-800'>
              Welcome to RideNGo!
            </h2>
            <p className='mt-4 text-gray-600 lg:w-4/6 lg:mx-auto'>
              RideNGo stands as Malaysia's leading online platform for bus
              ticketing, earning the trust of millions of global travellers.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1 flex items-center justify-center'>
          <div className='w-full max-w-md p-8'>
            <h3 className='font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
              {source === 'register'
                ? 'Create An Account'
                : 'Reset Your Password'}
            </h3>
            <div className='font-poppins text-center text-sm text-gray-500 w-5/6 mx-auto'>
              A 6-digit OTP has sent to your verified email.
            </div>
            <form className='mt-8'>
              <CustomInput
                id={'otp'}
                name={'otp'}
                placeholder={'OTP'}
                type={'text'}
                required
                icon={CiLock}
                onChange={(e) => handleChange('otp', e.target.value)}
                error={errors.otp}
              />

              <div className='mt-6'>
                <CustomButton
                  title={'Verify OTP'}
                  onClick={verifyOTP}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
