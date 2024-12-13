import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TfiEmail } from 'react-icons/tfi';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import * as yup from 'yup';
import { validateField } from '../../utils/validate';
import { forgotPassword, verifyEmail } from '../../api/auth';
import { toast } from 'react-toastify';
import LoginHero from '../../components/LoginHero';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { source, type } = location.state || {};
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      await verifyEmailSchema.validate({ email }, { abortEarly: false });
      if (source === 'register') {
        const response = await verifyEmail(email);
        if (response?.error) {
          return toast.error(response.message);
        }
        toast.success(response.message);
        navigate('/otp-verification', {
          state: { source: 'register', type, email },
        });
      } else if (source === 'forgot-password') {
        const response = await forgotPassword(email);
        if (response?.error) {
          return toast.error(response.message);
        }
        toast.success(response.message);
        navigate('/otp-verification', {
          state: { source: 'forgot-password', type, email },
        });
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const verifyEmailSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const handleChange = (field, value) => {
    if (field === 'email') setEmail(value);
    validateField(field, value, setErrors, verifyEmailSchema);
  };

  return (
    <>
      <div className='flex h-screen'>
        {/* Left Side */}
        <div className='flex-1 bg-slate-50 flex items-center justify-center relative'>
          <LoginHero />
        </div>

        {/* Right Side */}
        <div className='flex-1 flex items-center justify-center'>
          <div className='w-full max-w-md p-8'>
            <h3 className='font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
              {source === 'register'
                ? 'Create An Account'
                : 'Reset Your Password'}
            </h3>
            <div className='font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto'>
              Please enter your email for verification
            </div>
            <form className='mt-8'>
              <CustomInput
                id={'email'}
                name={'email'}
                placeholder={'Email'}
                type={'text'}
                required
                icon={TfiEmail}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
              />

              <div className='mt-6'>
                <CustomButton
                  title={'Verify Email'}
                  onClick={handleVerifyEmail}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
