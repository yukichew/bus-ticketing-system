import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/common/CustomInput";
import CustomButton from "../../../components/common/CustomButton";

const ApplicationForm = ({ operator, onClose }) => {
  const [companyInfo, setCompanyInfo] = useState({
    userName: "",
    email: "",
    phoneContact: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    if (operator) {
      setCompanyInfo({
        userName: operator.userName || "",
        email: operator.email || "",
        phoneContact: operator.phoneNumber || "",
        address: operator.address || "",
      });
    }
  }, [operator]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCompanyInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-[600px]">
      <div className="pointer-events-none">
        <label
          htmlFor="userName"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          User Name
        </label>
        <CustomInput
          placeholder="User Name"
          id="userName"
          value={companyInfo.userName}
          onChange={handleChange}
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
          placeholder="Email"
          id="email"
          value={companyInfo.email}
          onChange={handleChange}
        />
      </div>
      <div className="pointer-events-none">
        <label
          htmlFor="phoneContact"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Contact
        </label>
        <CustomInput
          placeholder="Phone Contact"
          id="phoneContact"
          value={companyInfo.phoneContact}
          onChange={handleChange}
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
          placeholder="Address"
          id="address"
          value={companyInfo.address}
          onChange={handleChange}
        />
      </div>

      <CustomButton title="Approve Application" onClick={onClose} />
    </div>
  );
};

export default ApplicationForm;
