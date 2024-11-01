import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Card from "../../../components/common/Card";

const BoUpdateForm = ({ operator, onClose }) => {
  const [companyInfo, setCompanyInfo] = useState({
    companyname: "",
    companyemail: "",
    companycontact: "",
    address: "",
  });

  useEffect(() => {
    if (operator) {
      setCompanyInfo({
        companyname: operator.companyName,
        companyemail: operator.companyEmail,
        companycontact: operator.contactNumber,
        address: operator.address,
      });
    }
  }, [operator]);

  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-100">
      <Card header="Edit Bus Operator">
        <div>
          <label
            htmlFor="companyname"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Company Name
          </label>
          <CustomInput
            placeholder="Enter company name"
            id="companyname"
            name="companyname"
            type="text"
            value={companyInfo.companyname}
            onChange={handleCompanyChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="companyemail"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Company Email
          </label>
          <CustomInput
            placeholder="Enter company email"
            id="companyemail"
            name="companyemail"
            type="email"
            value={companyInfo.companyemail}
            onChange={handleCompanyChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="companycontact"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Company Contact
          </label>
          <CustomInput
            placeholder="Enter company contact number"
            id="companycontact"
            name="companycontact"
            type="text"
            value={companyInfo.companycontact}
            onChange={handleCompanyChange}
            required
          />
        </div>
        <div>
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
            value={companyInfo.address}
            onChange={handleCompanyChange}
            multiline
          />
        </div>
        <CustomButton title={"Save Changes"} />
      </Card>
    </div>
  );
};

export default BoUpdateForm;
