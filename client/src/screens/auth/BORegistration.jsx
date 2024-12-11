import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { IoEye, IoEyeOff, IoKeyOutline } from 'react-icons/io5';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { PiWarehouseDuotone } from 'react-icons/pi';
import { TfiEmail } from 'react-icons/tfi';
import LoginHero from '../../components/LoginHero';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import FilesUploadButton from '../../components/common/FilesUploadButton';
import * as yup from "yup";
import { validateField } from "../../utils/validate";
import { toast } from 'react-toastify';
import { registerAsBusOperator } from '../../api/auth';
import { uploadToS3, deleteImageFromS3 } from '../../utils/s3Context';

const BORegistration = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busImages, setBusImages] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    isRefundable: true,
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };
  
  const passwordValidation = yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character (e.g., !, @, #)'
    )
    .required('Password is required');

  const registerSchema = yup.object().shape({
    fullname: yup
      .string()
      .required("Company Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Company Email is required"),
    phoneNumber: yup
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
    password: passwordValidation,
    confirmPassword: passwordValidation,
    busImages: yup
      .array()
      .min(1, "Bus Images are required")
      .of(yup.mixed().required("Image file is required"))
      .required("Bus Images are required")
  });

  const handleChange = (field, value) => {
    if (field === "fullname") setFullname(value);
    if (field === "email") setEmail(value);
    if (field === "phoneNumber") setPhoneNumber(value);
    if (field === "address") setAddress(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
    if (field === "busImages") setBusImages(value);
    validateField(field, value, setErrors, registerSchema);

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = [];

    try {
        for (const image of busImages) {
            if (image instanceof File) {
                const uploadResult = await uploadToS3(image);

                if (uploadResult) {
                    uploadedImages.push(uploadResult);
                } else {
                    throw new Error(`Failed to upload image: ${image.name}`);
                }
            }
        }

        if (uploadedImages.length === 0) {
            throw new Error("No images uploaded.");
        }

        const finalFormData = {
            ...formData,
            busImages: uploadedImages.map((img) => img.url),
        };

        const response = await registerAsBusOperator(finalFormData);

        if (response?.error) {
          throw new Error(response.message);
        }

        toast.success('Registration form submitted successfully. Please wait for approval.');
        navigate("/login");
    } catch (error) {
        for (const img of uploadedImages) {
            const isDeleted = await deleteImageFromS3(img.key);
            if (!isDeleted) {
                console.error(`Failed to delete image with key: ${img.key}`);
            }
        }

        toast.error(error.message);
    }
  };

  return (
    <>
        <div className='flex h-screen'>
            {/* Left Side */}
            <div className="flex-1 bg-slate-50 flex items-center justify-center relative">
              <LoginHero />
            </div>

            {/* Right Side */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xl p-8">
              <h3 className="font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl">
                Create An Account
              </h3>
              <div className="font-poppins text-center text-sm text-gray-500 w-4/5 mx-auto">
                Please enter your company details
              </div>

              <form className="mt-6" onSubmit={handleSubmit}>
                <CustomInput
                  id={"fullname"}
                  name={"fullname"}
                  placeholder={"Company Name"}
                  type={"text"}
                  required
                  icon={PiWarehouseDuotone}
                  value={formData.fullname}
                  onChange={(e) => handleChange("fullname", e.target.value)}
                  error={errors.fullname}
                />

                <div className="mt-3 flex gap-4">
                  <div className="flex-1">
                    <CustomInput
                      id={"email"}
                      name={"email"}
                      placeholder={"Company Email"}
                      type={"text"}
                      required
                      icon={TfiEmail}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={errors.email}
                    />
                  </div>
                  <div className="flex-1">
                    <CustomInput
                      id={"phoneNumber"}
                      name={"phoneNumber"}
                      placeholder={"Company Contact No"}
                      type={"text"}
                      required
                      icon={MdOutlineLocalPhone}
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      error={errors.phoneNumber}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <CustomInput
                    id={"address"}
                    name={"address"}
                    placeholder={"Address"}
                    type={"text"}
                    required
                    icon={CiLocationOn}
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    error={errors.address}
                  />
                </div>

                <div className="mt-3 flex gap-4">
                  <div className="relative flex-1">
                    <CustomInput
                      id={"password"}
                      name={"password"}
                      placeholder={"Password"}
                      type={isPasswordVisible ? 'text' : 'password'}
                      required
                      icon={IoKeyOutline}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
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
                  <div className="relative flex-1">
                    <CustomInput
                      id={"confirmPassword"}
                      name={"confirmPassword"}
                      placeholder={"Confirm Password"}
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      required
                      icon={IoKeyOutline}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      error={errors.confirmPassword}
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
                </div>

                <div className="mt-3">
                  <FilesUploadButton
                    setImages={setBusImages}
                    initialFiles={busImages}
                  />
                </div>

                <div className="mt-3">
                  <CustomButton title={"Submit"} onClick={handleSubmit} />
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default BORegistration;