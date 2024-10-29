import React, { useState } from 'react';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';

const Login = ({ switchToRegister }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [visible, setVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <>
      <h3 className='font-poppins text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
        Welcome Back!
      </h3>
      <div className='font-poppins text-center text-sm text-gray-500'>
        Please enter your details
      </div>
      <form className='mt-12'>
        <CustomInput
          id={'email'}
          name={'email'}
          placeholder={'Email'}
          type={'text'}
          required
          icon={TfiEmail}
        />
        <div className='relative mt-3'>
          <CustomInput
            id={'password'}
            name={'password'}
            placeholder={'Password'}
            type={visible ? 'text' : 'password'}
            required
            icon={IoKeyOutline}
          />
          <div
            className='absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer'
            onClick={togglePasswordVisibility}
          >
            {visible ? (
              <IoEye size={20} className='text-gray-400' />
            ) : (
              <IoEyeOff size={20} className='text-gray-400' />
            )}
          </div>
        </div>

        <div className='font-poppins text-left mt-3'>
          <button
            type='button'
            onClick={() => switchToRegister('forgot-password')}
            className='text-sm hover:text-primary text-gray-500 underline transition duration-200'
          >
            Forgot Password?
          </button>
        </div>

        <div className='mt-11'>
          <CustomButton title={'Login'} />
        </div>
      </form>

      <div className='font-poppins text-center text-sm text-gray-500 mt-5'>
        - or sign in with -
      </div>

      <div className='flex justify-center mt-2'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg'
          alt='Google Logo'
          className='w-10 h-10 rounded-full'
        />
      </div>

      {!isAdmin && (
        <div className='font-poppins text-center text-sm text-gray-500 mt-8'>
          Hasn't have an account yet?{' '}
          <button
            type='button'
            onClick={() => switchToRegister('')}
            className='underline hover:text-primary transition duration-200'
          >
            Register here
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
