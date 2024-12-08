import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import * as yup from "yup";
import { validateField } from "../../utils/validate";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character (e.g., !, @, #)"
      )
      .required("Password is required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Confirm password and Password are not match.")
      .required("Confirm Password is required"),
  });

  const handleChange = (field, value) => {
    if (field === "password") setPassword(value);
    if (field === "cpassword") setCPassword(value);
    validateField(field, value, setErrors, resetPasswordSchema);
  };
  
  const handleSubmit = () => {
    navigate("/login");
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
                <p className='mt-4 text-gray-600'>
                    RideNGo stands as Malaysia's leading online platform for bus
                    ticketing, <br/>earning the trust of millions of global travellers.
                </p>
            </div>
        </div>

        {/* Right Side */}
        <div className='flex-1 flex items-center justify-center'>
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
                    type={isPasswordVisible ? 'text' : 'newpassword'}
                    required
                    icon={IoKeyOutline}
                    onChange={(e) => handleChange("password", e.target.value)}
                    error={errors.password}
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
                    onChange={(e) => handleChange("cpassword", e.target.value)}
                    error={errors.cpassword}
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

                <div className='mt-28'>
                  <CustomButton title={'Confirm'} onClick={handleSubmit} />
                </div>
              </form>
            </div>
        </div>
      </div>

      
    </>
  );
};

export default ResetPassword;
