import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CiLock } from "react-icons/ci";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import CustomButton from '../components/common/CustomButton';
import CustomField from '../components/common/CustomInput';

const OTPVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { source } = location.state || {};

    const verifyOTP = () => {
        console.log("Source:", source);

        if (source === 'register') {
            navigate('/create-account');
        } else if (source === 'forgot-password') {
            navigate('/reset-password');
        }
    };

    return (
        <div>
            <Navbar />

            <div className="flex justify-center items-center px-4 py-24">
                <div className="w-full max-w-lg xl:px-8 xl:w-5/12 ml-auto mr-0">
                    <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                        <h3 className="font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl">
                            {source === 'register' ? 'Create An Account' : 'Reset Your Password'}
                        </h3>
                        <div className="font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto">
                            Please enter the 6-digit-code
                        </div>
                        <form className="mt-12">
                            <CustomField
                                id={'otp'}
                                name={'otp'}
                                placeholder={'Verification Code'}
                                type={'text'}
                                required
                                icon={CiLock}
                            />

                            <div className="font-poppins text-left text-sm text-gray-500 mt-3">
                                Didn't receive the code? <span className="underline text-primary cursor-pointer">Resend</span>
                            </div>

                            <div className="mt-10">
                                <CustomButton 
                                    title={'Verify OTP'}
                                    onClick={verifyOTP}
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

export default OTPVerification;
