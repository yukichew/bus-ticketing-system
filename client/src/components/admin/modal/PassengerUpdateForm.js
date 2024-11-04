import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";

const PassengerUpdateForm = ({ operator, onClose }) => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    if (operator) {
      setUserInfo({
        fullName: operator.fullName || "",
        email: operator.email || "",
        dob: operator.dob || "",
        phoneNumber: operator.phoneNumber || "",
        status: operator.status || "",
      });
    }
  }, [operator]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // Add logic for saving updated user info
    onClose(); // Close the modal after submission
  };

  return (
    <div className="flex flex-col space-y-4 w-[400px] mx-auto">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Full Name
        </label>
        <CustomInput
          placeholder="Enter full name"
          id="fullName"
          name="fullName"
          type="text"
          value={userInfo.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
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
          value={userInfo.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="dob"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Date of Birth
        </label>
        <CustomInput
          placeholder="Enter date of birth"
          id="dob"
          name="dob"
          type="date"
          value={userInfo.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Phone Number
        </label>
        <CustomInput
          placeholder="Enter phone number"
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={userInfo.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <CustomButton title="Save Changes" onClick={handleSubmit} />
    </div>
  );
};

export default PassengerUpdateForm;
