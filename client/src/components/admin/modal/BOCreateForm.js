import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Card from "../../../components/common/Card";

const BoCreateForm = () => {
  return (
    <div className="flex flex-col space-y-4 w-100">
      <Card header="Create New Bus Operator">
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
      </Card>
    </div>
  );
};

export default BoCreateForm;
