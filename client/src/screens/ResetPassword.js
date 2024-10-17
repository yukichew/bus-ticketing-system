import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoKeyOutline, IoEye, IoEyeOff } from "react-icons/io5";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import CustomButton from '../components/common/CustomButton';
import CustomField from '../components/common/CustomInput';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    
    const submitForm= () => {
        navigate('/login');
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    }

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(prevState => !prevState);
    }

    return (
        <div>
            <Navbar />

            <div className="flex justify-center items-center px-4 py-16">
                <div className="w-full max-w-lg xl:px-8 xl:w-5/12 ml-auto mr-0">
                    <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                        <h3 className="font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl">
                            Reset your password
                        </h3>
                        <form className="mt-12">
                            <div className="relative mt-3">
                                <CustomField
                                    id={'newpassword'}
                                    name={'newpassword'}
                                    placeholder={'New Password'}
                                    type={isPasswordVisible ? 'text' : 'newpassword'}
                                    required
                                    icon={IoKeyOutline}
                                />
                                <div
                                    className="absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <IoEye size={20} className="text-gray-400" />
                                    ) : (
                                        <IoEyeOff size={20} className="text-gray-400" />
                                    )}
                                </div>
                            </div>
                            <div className="relative mt-3">
                                <CustomField
                                    id={'cpassword'}
                                    name={'cpassword'}
                                    placeholder={'Confirm Password'}
                                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                                    required
                                    icon={IoKeyOutline}
                                />
                                <div
                                    className="absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {isConfirmPasswordVisible ? (
                                        <IoEye size={20} className="text-gray-400" />
                                    ) : (
                                        <IoEyeOff size={20} className="text-gray-400" />
                                    )}
                                </div>
                            </div>

                            <div className="mt-12">
                                <CustomButton 
                                    title={'Confirm'}
                                    onClick={submitForm}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ResetPassword;
