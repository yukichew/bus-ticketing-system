import React, { useState, useEffect } from "react";
import CustomInput from "../../common/CustomInput";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Carousel from "../../common/Carousel";

const ViewBoDetails = ({ operator }) => {
  const [showBusImages, setShowBusImages] = useState(false);
  const [boDetails, setBoDetails] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    busImage: [],
  });

  useEffect(() => {
    if (operator) {
      setBoDetails({
        userName: operator.userName,
        email: operator.email,
        phoneNumber: operator.phoneNumber,
        address: operator.address,
        busImage: Array.isArray(operator.busImage)
          ? operator.busImage
          : [operator.busImage],
      });
      console.log("bus image:", operator.busImage);
    }
  }, [operator]);

  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    setBoDetails((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleNextClick = () => {
    setShowBusImages(true);
  };

  const handlePreviousClick = () => {
    setShowBusImages(false);
  };

  return (
    <div className="flex flex-col space-y-4 w-[600px]">
      {!showBusImages ? (
        <>
          <header className="font-poppins font-semibold text-lg text-primary mb-4">
            Bus Operator Details
          </header>
          <div className="pointer-events-none">
            <label
              htmlFor="userName"
              className="block text-sm font-poppins font-medium text-gray-700 pb-2"
            >
              User Name
            </label>
            <CustomInput
              placeholder="Enter User Name"
              id="userName"
              name="userName"
              type="text"
              value={boDetails.userName}
              onChange={handleCompanyChange}
              required
            />
          </div>
          <div className="pointer-events-none">
            <label
              htmlFor="email"
              className="block text-sm font-poppins font-medium text-gray-700 pb-2"
            >
              Email
            </label>
            <CustomInput
              placeholder="Enter email"
              id="email"
              name="email"
              type="email"
              value={boDetails.email}
              onChange={handleCompanyChange}
              required
            />
          </div>
          <div className="pointer-events-none">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-poppins font-medium text-gray-700 pb-2"
            >
              Phone Contact
            </label>
            <CustomInput
              placeholder="Enter Phone Contact"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={boDetails.phoneNumber}
              onChange={handleCompanyChange}
              required
            />
          </div>
          <div className="pointer-events-none pb-4">
            <label
              htmlFor="address"
              className="block text-sm font-poppins font-medium text-gray-700 pb-2"
            >
              Address
            </label>
            <CustomInput
              placeholder="Enter address"
              id="address"
              name="address"
              type="text"
              value={boDetails.address}
              onChange={handleCompanyChange}
              multiline
            />
          </div>
          <div className="relative mt-6">
            <button
              onClick={handleNextClick}
              className="absolute bottom-[-10px] right-0 bg-primary text-white px-3 py-2 rounded hover:bg-secondary transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </>
      ) : (
        // Bus Images View
        <>
          <header className="font-poppins font-semibold text-lg text-primary mb-4">
            Bus Images
          </header>
          <div className="relative mt-6">
            {Array.isArray(boDetails.busImage) &&
            boDetails.busImage.length > 0 ? (
              <Carousel images={boDetails.busImage} />
            ) : (
              <p className="text-gray-600">No bus images available</p>
            )}
          </div>

          <div className="relative mt-6">
            <button
              onClick={handlePreviousClick}
              className="absolute bottom-[-10px] right-0 bg-primary text-white px-3 py-2 rounded hover:bg-secondary transition"
            >
              <FaArrowLeft />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBoDetails;
