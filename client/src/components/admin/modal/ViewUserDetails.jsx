import React, { useState, useEffect } from "react";
import CustomInput from "../../../components/common/CustomInput";

const ViewUserDetails = ({ operator, onClose, isDeactivated }) => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    if (operator) {
      setUserInfo({
        userName: operator.userName || "",
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

  return (
    <div className="flex flex-col space-y-4 w-[400px] mx-auto">
      <header className="font-poppins font-semibold text-lg text-primary mb-4">
        User Details
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
          value={userInfo.userName}
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
          value={userInfo.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="pointer-events-none pb-6">
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
    </div>
  );
};

export default ViewUserDetails;
