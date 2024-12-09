import React, { useState, useEffect } from "react";
import CustomInput from "../../common/CustomInput";

const ViewBoDetails = ({ operator }) => {
  const [BoDetails, setBoDetails] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (operator) {
      setBoDetails({
        userName: operator.userName,
        email: operator.email,
        phoneNumber: operator.phoneNumber,
      });
    }
  }, [operator]);

  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    setBoDetails((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-[600px]">
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
          value={BoDetails.userName}
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
          value={BoDetails.email}
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
          value={BoDetails.phoneNumber}
          onChange={handleCompanyChange}
          required
        />
      </div>
      <div className="pointer-events-none">
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
          value={BoDetails.address}
          onChange={handleCompanyChange}
          multiline
        />
      </div>
    </div>
  );
};

export default ViewBoDetails;
