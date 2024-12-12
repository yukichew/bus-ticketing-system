import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import * as yup from 'yup';
import { validateField } from '../../utils/validate';
import { register } from '../../api/auth';
import { toast } from 'react-toastify';
import LoginHero from '../../components/LoginHero';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const { email } = location.state || {};

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const registerSchema = yup.object().shape({
    fullname: yup.string().required('Fullname is required'),
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
    cpassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Confirm password must match password'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(
        /^\+60\d{9,10}$/,
        'Phone number must be in the format +60123456789'
      ),
  });

  const handleChange = (field, value) => {
    const formState = {
      fullname,
      password,
      cpassword,
      phoneNumber,
      [field]: value,
    };

    if (field === 'fullname') setFullname(value);
    if (field === 'password') setPassword(value);
    if (field === 'phoneNumber') setPhoneNumber(value);
    if (field === 'cpassword') setCPassword(value);

    validateField(field, value, setErrors, registerSchema, formState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(
        { fullname, password, cpassword, phoneNumber },
        { abortEarly: false }
      );
      const registerDetails = {
        fullname,
        email,
        password,
        confirmPassword: cpassword,
        phoneNumber,
      };
      const response = await register(registerDetails);
      if (response?.error) {
        return toast.error(response.message);
      }
      toast.success('Registration successful');
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
              Create An Account
            </h3>
            <div className='font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto'>
              Please enter all the details
            </div>
            <form className='mt-10'>
              <CustomInput
                id={'name'}
                name={'name'}
                placeholder={'Full Name'}
                type={'text'}
                required
                icon={CiUser}
                onChange={(e) => handleChange('fullname', e.target.value)}
                error={errors.fullname}
              />
              <div className='mt-3'>
                <CustomInput
                  id={'phoneNumber'}
                  name={'phoneNumber'}
                  placeholder={'Contact Number'}
                  type={'text'}
                  required
                  icon={TfiEmail}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  error={errors.phoneNumber}
                />
              </div>
              <div className='relative mt-3'>
                <CustomInput
                  id={'password'}
                  name={'password'}
                  placeholder={'Password'}
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  icon={IoKeyOutline}
                  onChange={(e) => handleChange('password', e.target.value)}
                  error={errors.password}
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

              <div className='relative mt-3'>
                <CustomInput
                  id={'cpassword'}
                  name={'cpassword'}
                  placeholder={'Confirm Password'}
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  required
                  icon={IoKeyOutline}
                  onChange={(e) => handleChange('cpassword', e.target.value)}
                  error={errors.cpassword}
                />
                <div
                  className='absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer'
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {isConfirmPasswordVisible ? (
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
                  title={'Submit'}
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

export default UserRegistration;
