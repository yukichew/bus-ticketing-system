import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { TfiEmail } from 'react-icons/tfi';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import * as yup from "yup";
import { validateField } from "../../utils/validate";

const EmailVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { source, type } = location.state || {};
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const verifyEmail = (e) => {
        e.preventDefault();

        // Only navigate if verified
        if (source === "register") {
            // Perform actions for registration
            // Show a toast message for registration

            navigate("/otp-verification", { state: { source: "register", type } });
        } else if (source === "forgot-password") {
            // Perform actions for password reset
            // Show a toast message for password reset

            navigate("/otp-verification", { state: { source: "forgot-password" } });
        }
    };

    const verifyEmailSchema = yup.object().shape({
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
    });
    
    const handleChange = (field, value) => {
        if (field === "email") setEmail(value);
        validateField(field, value, setErrors, verifyEmailSchema);
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
                            {source === 'register' ? 'Create An Account' : 'Reset Your Password'}
                        </h3>
                        <div className='font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto'>
                            Please enter your email for verification
                        </div>
                        <form className='mt-8'>
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

                            <div className='mt-28'>
                                <CustomButton title={'Verify Email'} onClick={verifyEmail} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailVerification;