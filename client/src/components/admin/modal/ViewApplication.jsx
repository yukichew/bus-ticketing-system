import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/common/CustomInput";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { approveBo } from "../../../api/busOperator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicationForm = ({ operator, onClose }) => {
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
      console.log("bus", operator.busImage);
    }
  }, [operator]);

  const handleNextClick = () => {
    setShowBusImages(true);
  };

  const handlePreviousClick = () => {
    setShowBusImages(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBoDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleApproveClick = async () => {
    if (operator && operator.id) {
      try {
        console.log("Approving operator with ID:", operator.id);
        const response = await approveBo(operator.id);
        if (response && response.message) {
          toast.success("Application has been approved!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (err) {
        toast.error("Approval failed. Please try again.");
        console.error("Approval failed:", err);
      }
    } else {
      toast.error("Operator ID is missing. Cannot approve.");
      console.error("Operator ID is missing");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col space-y-4 w-[600px]">
        {!showBusImages ? (
          <>
            <header className="font-poppins font-semibold text-lg text-primary mb-4">
              Application Details
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
            <div className="flex flex-wrap gap-4">
              {Array.isArray(boDetails.busImage) &&
              boDetails.busImage.length > 0 ? (
                boDetails.busImage.map((image, index) => (
                  <div
                    key={index}
                    className="w-[360px] h-[280px] bg-cover bg-center border rounded-lg"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  ></div>
                ))
              ) : (
                <p className="text-gray-600">No bus images available</p>
              )}
            </div>

            <div className="relative mt-6">
              <button
                onClick={handleApproveClick}
                className="absolute bottom-[-10px] right-0 bg-primary text-white px-3 py-2 rounded hover:bg-secondary transition"
              >
                <TiTick />
              </button>
              <button
                onClick={handlePreviousClick}
                className="absolute bottom-[-10px] right-[50px] bg-primary text-white px-3 py-2 rounded hover:bg-secondary transition"
              >
                <FaArrowLeft />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ApplicationForm;
