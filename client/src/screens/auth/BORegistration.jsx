import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser, CiLocationOn } from 'react-icons/ci';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { PiWarehouseDuotone } from 'react-icons/pi';
import { TfiEmail } from 'react-icons/tfi';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import FilesUploadButton from '../../components/common/FilesUploadButton';
import * as yup from "yup";
import { validateField } from "../../utils/validate";

const BORegistration = () => {
  const navigate = useNavigate();
  const [companyname, setCompanyName] = useState("");
  const [companyemail, setCompanyEmail] = useState("");
  const [companycontact, setCompanyContact] = useState("");
  const [address, setAddress] = useState("");
  const [busImages, setBusImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    companyname: '',
    companyemail: '',
    companycontact: '',
    busImages: [],
    address: '',
  });

  const registerSchema = yup.object().shape({
    companyname: yup
      .string()
      .required("Company Name is required"),
    companyemail: yup
      .string()
      .email("Invalid email address")
      .required("Company Email is required"),
    companycontact: yup
      .string()
      .matches(
        /^(\+?\d{1,4}[-\s]?)?(\(?\d{1,3}\)?[-\s]?)?(\d{1,4}[-\s]?)?\d{1,4}[-\s]?\d{1,4}$/,
        "Invalid contact number"
      )
      .required("Company Contact is required"),
    address: yup
      .string()
      .required("Company Address is required")
      .min(10, "Address must be at least 10 characters long")
      .max(255, "Address cannot exceed 255 characters"),
    busImages: yup
      .array()
      .min(1, "Bus Images are required")
      .of(yup.mixed().required("Image file is required"))
      .required("Bus Images are required")
  });

  const handleChange = (field, value) => {
    if (field === "companyname") setCompanyName(value);
    if (field === "companyemail") setCompanyEmail(value);
    if (field === "companycontact") setCompanyContact(value);
    if (field === "address") setAddress(value);
    if (field === "busImages") setBusImages(value);
    validateField(field, value, setErrors, registerSchema);

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted form data:', formData);
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
                    Please enter your company details
                    </div>

                    <form className='mt-6' onSubmit={handleSubmit}>
                      <CustomInput
                          id={'companyname'}
                          name={'companyname'}
                          placeholder={'Company Name'}
                          type={'text'}
                          required
                          icon={PiWarehouseDuotone}
                          value={formData.companyname}
                          onChange={(e) => handleChange("companyname", e.target.value)}
                          error={errors.companyname}
                      />
                      <div className='mt-3'>
                          <CustomInput
                              id={'companyemail'}
                              name={'companyemail'}
                              placeholder={'Company Email'}
                              type={'text'}
                              required
                              icon={TfiEmail}
                              value={formData.companyemail}
                              onChange={(e) => handleChange("companyemail", e.target.value)}
                              error={errors.companyemail}
                              
                          />
                      </div>
                      <div className='mt-3'>
                          <CustomInput
                              id={'companycontact'}
                              name={'companycontact'}
                              placeholder={'Company Contact No'}
                              type={'text'}
                              required
                              icon={MdOutlineLocalPhone}
                              value={formData.companycontact}
                              onChange={(e) => handleChange("companycontact", e.target.value)}
                              error={errors.companycontact}
                          />
                      </div>
                      <div className='mt-3'>
                          <CustomInput
                              id={'address'}
                              name={'address'}
                              placeholder={'Address'}
                              type={'text'}
                              required
                              icon={CiLocationOn}
                              value={formData.address}
                              onChange={(e) => handleChange("address", e.target.value)}
                              error={errors.address}
                          />
                      </div>

                      <div className='mt-3'>
                          <FilesUploadButton
                              setImages={setBusImages}
                              initialFiles={busImages.map((name) => new File([], name))}
                          />
                      </div>

                      <div className='mt-10'>
                          <CustomButton title={'Submit'} onClick={handleSubmit} />
                      </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default BORegistration;