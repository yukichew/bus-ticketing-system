import React, { useState } from 'react';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import CustomButton from '../../components/common/CustomButton';
import CustomField from '../../components/common/CustomInput';
import Navbar from '../../components/navbar/Navbar';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [visible, setVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div>
      <Navbar />

      <div className='flex justify-center items-center px-4 py-8'>
        <div className='w-full max-w-lg xl:px-8 xl:w-5/12'>
          <div className='bg-white rounded shadow-2xl p-7 sm:p-10'>
            <h3 className='font-poppins text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
              Welcome back!
            </h3>
            <div className='font-poppins text-center text-sm text-gray-500'>
              Please enter your details
            </div>
            <form className='mt-12'>
              <CustomField
                id={'email'}
                name={'email'}
                placeholder={'Email'}
                type={'text'}
                required
                icon={TfiEmail}
              />
              <div className='relative mt-3'>
                <CustomField
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
                <Link
                  to='/register'
                  state={{ source: 'forgot-password' }}
                  className='text-sm hover:text-primary text-gray-500 underline transition duration-200'
                >
                  Forgot Password?
                </Link>
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
                <Link
                  to='/register'
                  className='underline hover:text-primary transition duration-200'
                >
                  Register here
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
