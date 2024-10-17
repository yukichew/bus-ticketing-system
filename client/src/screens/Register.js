import React, {useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiWarehouseDuotone } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import CustomButton from '../components/common/CustomButton';
import CustomField from '../components/common/CustomInput';
import FilesUploadButton from '../components/common/FilesUploadButton';

const Register = () => {
    const [selectedRole, setSelectedRole] = useState('passenger');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        companyname: '',
        companyemail: '',
        companycontact: '',
        address: '',
        fullname: '',
        email: '',
        contactno: '',
    });

    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    }

    const getOTPVerification = () => {
        navigate('/otp-verification', { state: { source: 'register' } });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted form data:', formData); // For testing
    };

    return (
        <div>
            <Navbar />

            <div className="flex justify-center items-center px-4 py-16">
                <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                    <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                        <div className="flex justify-center mb-6">
                            <button 
                                className={`font-poppins font-medium text-sm px-2 py-5 w-1/2 ${selectedRole === 'passenger' ? 'bg-white text-primary font-semibold ' : 'bg-gray-100 text-gray-600'}`}
                                onClick={() => handleRoleSelection('passenger')}
                            >
                                Register as Passenger
                            </button>
                            <button 
                                className={`font-poppins font-medium text-sm px-2 py-5 w-1/2 ${selectedRole === 'busoperator' ? 'bg-white text-primary font-semibold ' : 'bg-gray-100 text-gray-600'}`}
                                onClick={() => handleRoleSelection('busoperator')}
                            >
                                Register as Bus Operator
                            </button>
                        </div>

                        <h3 className="font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl">
                            Create An Account
                        </h3>

                        {selectedRole === 'passenger' && (
                            <>
                                <form className="mt-8">
                                    <CustomField
                                        id={'phoneNo'}
                                        name={'phoneNo'}
                                        placeholder={'Phone Number'}
                                        type={'text'}
                                        required
                                        icon={MdOutlineLocalPhone}
                                    />

                                    <div className="mt-4">
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
                            </>
                        )}
                        
                        {selectedRole === 'busoperator' && (
                            <>
                                <div className="font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto">
                                    {currentStep === 1 && "Please enter your company details"}
                                    {currentStep === 2 && "Please upload photos of the buses"}
                                    {currentStep === 3 && "Please enter your personal details"}
                                </div>

                                <form className="mt-10" onSubmit={handleSubmit}>
                                    {currentStep === 1 && (
                                        <>
                                            <CustomField
                                                id={'companyname'}
                                                name={'companyname'}
                                                placeholder={'Company Name'}
                                                type={'text'}
                                                required
                                                icon={PiWarehouseDuotone}
                                                value={formData.companyname}
                                                onChange={handleInputChange}
                                            />
                                            <div className="mt-4">
                                                <CustomField
                                                    id={'companyemail'}
                                                    name={'companyemail'}
                                                    placeholder={'Company Email'}
                                                    type={'text'}
                                                    required
                                                    icon={TfiEmail}
                                                    value={formData.companyemail}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <CustomField
                                                    id={'companycontact'}
                                                    name={'companycontact'}
                                                    placeholder={'Company Contact No'}
                                                    type={'text'}
                                                    required
                                                    icon={MdOutlineLocalPhone}
                                                    value={formData.companycontact}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <CustomField
                                                    id={'address'}
                                                    name={'address'}
                                                    placeholder={'Address'}
                                                    type={'text'}
                                                    required
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="mt-12">
                                                <CustomButton
                                                    title={'Next'}
                                                    onClick={handleNext}
                                                />
                                            </div>
                                        </>
                                    )}
                                    
                                    {currentStep === 2 && (
                                        <>
                                            <FilesUploadButton />

                                            <div className="mt-12 flex justify-between gap-x-56">
                                                <CustomButton
                                                    title={'Back'}
                                                    onClick={() => setCurrentStep(1)}
                                                />
                                                <CustomButton
                                                    title={'Next'}
                                                    onClick={handleNext}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {currentStep === 3 && (
                                        <>
                                            <CustomField
                                                id={'fullname'}
                                                name={'fullname'}
                                                placeholder={'Full Name'}
                                                type={'text'}
                                                required
                                                icon={CiUser}
                                                value={formData.fullname}
                                                onChange={handleInputChange}
                                            />
                                            <div className="mt-4">
                                                <CustomField
                                                    id={'email'}
                                                    name={'email'}
                                                    placeholder={'Email'}
                                                    type={'text'}
                                                    required
                                                    icon={TfiEmail}
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <CustomField
                                                    id={'contactno'}
                                                    name={'contactno'}
                                                    placeholder={'Contact No'}
                                                    type={'text'}
                                                    required
                                                    icon={MdOutlineLocalPhone}
                                                    value={formData.contactno}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="mt-12 flex justify-between gap-x-56">
                                                <CustomButton
                                                    title={'Back'}
                                                    onClick={() => setCurrentStep(2)}
                                                />
                                                <CustomButton
                                                    title={'Submit'}
                                                />
                                            </div>
                                        </>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
  
export default Register;