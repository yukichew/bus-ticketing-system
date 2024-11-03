import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Card from "../../../components/common/Card";

const BoCreateForm = () => {
  return (
    <div className="flex flex-col space-y-4 w-100">
      <div className="flex justify-between items-start"></div>
      <div className="font-poppins font-semibold text-lg text-primary mb-4">
        <header className="mb-2">Add New Bus Operator</header>
      </div>
      <CustomInput
        placeholder="Enter company name"
        id="companyname"
        name="companyname"
        type="text"
        required
      />
      <CustomInput
        placeholder="Enter company email"
        id="companyemail"
        name="companyemail"
        type="email"
        required
      />
      <CustomInput
        placeholder="Enter company contact number"
        id="companycontact"
        name="companycontact"
        type="text"
        required
      />
      <CustomInput
        placeholder="Enter address"
        id="address"
        name="address"
        type="text"
        multiline
      />
      <CustomButton title={"Create"} />
    </div>
  );
};

export default BoCreateForm;
