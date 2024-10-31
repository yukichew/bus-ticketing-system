import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Card from "../../../components/common/Card";

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
    <div className="flex flex-col space-y-4 w-full mx-auto">
      <Card header="Edit Passenger">
        <CustomInput
          placeholder="Enter full name"
          id="fullName"
          name="fullName"
          type="text"
          value={userInfo.fullName}
          onChange={handleChange}
          required
        />
        <CustomInput
          placeholder="Enter email"
          id="email"
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />
        <CustomInput
          placeholder="Enter date of birth"
          id="dob"
          name="dob"
          type="date"
          value={userInfo.dob}
          onChange={handleChange}
          required
        />
        <CustomInput
          placeholder="Enter phone number"
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={userInfo.phoneNumber}
          onChange={handleChange}
          required
        />
        <CustomButton title="Save Changes" onClick={handleSubmit} />
      </Card>
    </div>
  );
};

export default PassengerUpdateForm;
