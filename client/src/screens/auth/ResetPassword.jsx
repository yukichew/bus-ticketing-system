import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import * as yup from 'yup';
import { validateField } from '../../utils/validate';
import { resetPassword } from '../../api/auth';
import { toast } from 'react-toastify';
import LoginHero from '../../components/LoginHero';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { email } = location.state || {};

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const resetPasswordSchema = yup.object().shape({
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character (e.g., !, @, #)'
      )
      .required('Password is required'),
  });

  const handleChange = (field, value) => {
    if (field === 'newPassword') setNewPassword(value);
    validateField(field, value, setErrors, resetPasswordSchema);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPasswordSchema.validate({ newPassword }, { abortEarly: false });

    try {
      const response = await resetPassword(email, newPassword);
      if (response?.error) {
        return toast.error(response.message);
      }
      toast.success(response.message);
      navigate('/login');
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className='flex h-screen'>
        {/* Left Side */}
        <div className='flex-1 bg-slate-50 flex items-center justify-center relative'>
          <LoginHero />
        </div>

        {/* Right Side */}
        <div className='relative flex-1 flex items-center justify-center'>
          <div className='w-full max-w-md p-8'>
            <h3 className='font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
              Reset Your Password
            </h3>
            <form className='mt-8'>
              <div className='relative mt-3'>
                <CustomInput
                  id={'newpassword'}
                  name={'newpassword'}
                  placeholder={'New Password'}
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  icon={IoKeyOutline}
                  onChange={(e) => handleChange('newPassword', e.target.value)}
                  error={errors.newPassword}
                />
                <div
                  className='absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer'
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <IoEye
                      size={20}
                      className='text-gray-400'
                    />
                  ) : (
                    <IoEyeOff
                      size={20}
                      className='text-gray-400'
                    />
                  )}
                </div>
              </div>
              <div className='mt-6'>
                <CustomButton
                  title={'Confirm'}
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
