import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import * as yup from "yup";
import { validateField } from "../../utils/validate";

const UserRegistration = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible((prevState) => !prevState);
    };

    const registerSchema = yup.object().shape({
        fullname: yup
          .string()
          .required("Fullname is required"),
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
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
        if (field === "fullname") setFullname(value);
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
        if (field === "cpassword") setCPassword(value);
        validateField(field, value, setErrors, registerSchema);
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
                            Create An Account
                        </h3>
                        <div className='font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto'>
                            Please enter all the details
                        </div>
                        <form className='mt-12'>
                            <CustomInput
                                id={'name'}
                                name={'name'}
                                placeholder={'Full Name'}
                                type={'text'}
                                required
                                icon={CiUser}
                                onChange={(e) => handleChange("fullname", e.target.value)}
                                error={errors.fullname}
                            />
                            <div className='mt-3'>
                                <CustomInput
                                    id={'email'}
                                    name={'email'}
                                    placeholder={'Email'}
                                    type={'text'}
                                    required
                                    icon={TfiEmail}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    error={errors.email}
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

                            <div className='mt-16'>
                                <CustomButton title={'Submit'} onClick={handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
    );
};

export default UserRegistration;