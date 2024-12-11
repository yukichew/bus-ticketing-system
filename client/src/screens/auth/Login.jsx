import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { login } from '../../api/auth';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { validateField } from '../../utils/validate';
import { useAuth } from '../../utils/AuthContext';
import LoginHero from '../../components/LoginHero';

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { setAuth } = useAuth();

  const handleNavigation = (action) => {
    if (action === 'register-user') {
      navigate('/email-verification', {
        state: { source: 'register', type: 'user' },
      });
    } else if (action === 'register-bo') {
      navigate('/bus-operator-registration');
    } else if (action === 'forgot-password') {
      navigate('/email-verification', { state: { source: 'forgot-password' } });
    }
  };

  const togglePasswordVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
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
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    validateField(field, value, setErrors, loginSchema);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response?.error) {
      return toast.error(response.message);
    }
    toast.success('Login successful');
    setAuth({
      token: response.token,
      role: response.role,
    });
    setIsAdmin(response.role === 'Admin');
    navigate(
      response.role === 'Admin'
        ? '/admin-dashboard'
        : response.role === 'BusOperator'
        ? '/bo/dashboard'
        : '/'
    );
  };

  return (
    <div className='flex h-screen'>
      {/* Left Side */}
      <div className="flex-1 bg-slate-50 flex items-center justify-center relative">
        <LoginHero />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center">
        <div className='w-full max-w-md p-8'>
          <h3 className='font-poppins text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl'>
            Welcome Back!
          </h3>
          <div className='font-poppins text-center text-sm text-gray-500'>
            Please enter your details
          </div>
          <form
            className='mt-8'
            onSubmit={handleSubmit}
          >
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
            <div className='relative mt-3'>
              <CustomInput
                id={'password'}
                name={'password'}
                placeholder={'Password'}
                type={visible ? 'text' : 'password'}
                required
                icon={IoKeyOutline}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
              />
              <div
                className='absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {visible ? (
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

            <div className='font-poppins text-left mt-3'>
              <button
                type='button'
                onClick={() => handleNavigation('forgot-password')}
                className='text-sm hover:text-primary text-gray-500 underline transition duration-200'
              >
                Forgot Password?
              </button>
            </div>

            <div className='mt-9'>
              <CustomButton title={'Login'} />
            </div>
          </form>

          {!isAdmin && (
            <div className='font-poppins text-center text-sm text-gray-500 mt-4'>
              Haven't registered yet? <br />
              <button
                type='button'
                onClick={() => handleNavigation('register-user')}
                className='underline hover:text-primary transition duration-200'
              >
                Register as User
              </button>{' '}
              or{' '}
              <button
                type='button'
                onClick={() => handleNavigation('register-bo')}
                className='underline hover:text-primary transition duration-200'
              >
                Register as Bus Operator
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
