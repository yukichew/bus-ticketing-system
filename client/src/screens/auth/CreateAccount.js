import React, {useState} from 'react';
import { CiUser } from "react-icons/ci";
import { IoKeyOutline, IoEye, IoEyeOff, IoCalendarOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import CustomButton from '../../components/common/CustomButton';
import CustomField from '../../components/common/CustomInput';

const CreateAccount = ({ switchToLogin }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    
    const submitForm= () => {
        switchToLogin();
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    }

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(prevState => !prevState);
    }

    return (
        <>
            <h3 className="font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl">
                Create An Account
            </h3>
            <div className="font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto">
                Please enter all the details
            </div>
            <form className="mt-12">
                <CustomField
                    id={'name'}
                    name={'name'}
                    placeholder={'Full Name'}
                    type={'text'}
                    required
                    icon={CiUser}
                />
                <div className="mt-3">
                    <CustomField
                        id={'email'}
                        name={'email'}
                        placeholder={'Email'}
                        type={'text'}
                        required
                        icon={TfiEmail}
                    />
                </div>
                <div className="mt-3">
                    <CustomField
                        id={'dob'}
                        name={'dob'}
                        placeholder={'Date Of Birth'}
                        type={'text'}
                        required
                        icon={IoCalendarOutline}
                    />
                </div>
                <div className="relative mt-3">
                    <CustomField
                        id={'password'}
                        name={'password'}
                        placeholder={'Password'}
                        type={isPasswordVisible ? 'text' : 'password'}
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

                <div className="mt-16">
                    <CustomButton 
                        title={'Submit'}
                        onClick={submitForm}
                    />
                </div>
            </form>
        </>
    );
};

export default CreateAccount;