import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLocalPhone } from "react-icons/md";
import Navbar from '../components/navbar/Navbar';
import CustomButton from '../components/common/CustomButton';
import TextField from '../components/common/TextField';

const Register = () => {
    const navigate = useNavigate();

    const getOTPVerification = () => {
        navigate('/otp-verification', { state: { source: 'register' } });
    }

    return (
        <div>
            <Navbar />

            <div className="flex justify-center items-center px-4 py-16">
                <div className="w-full max-w-lg xl:px-8 xl:w-5/12 ml-auto mr-0">
                    <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                        <h3 className="font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                            Create An Account
                        </h3>
                        <form className="mt-12">
                            <TextField
                                id={'phoneNo'}
                                name={'phoneNo'}
                                placeholder={'Phone Number'}
                                type={'text'}
                                required
                                icon={MdOutlineLocalPhone}
                            />

                            <div className="mt-5">
                                <CustomButton 
                                    title={'Get Verification Code'}
                                    onClick={getOTPVerification}
                                />
                            </div>
                        </form>

                        <div className="font-poppins text-center text-sm text-gray-500 mt-5">
                            - or sign in with -
                        </div>

                        <div className="flex justify-center mt-2">
                            <img
                                src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg'
                                alt="Google Logo"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>

                        <div className="font-poppins text-center text-sm text-gray-500 mt-16">
                            Already has an account?{' '}
                            <Link 
                                to='/login' 
                                className="underline hover:text-primary transition duration-200"
                            >
                                Login here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default Register;