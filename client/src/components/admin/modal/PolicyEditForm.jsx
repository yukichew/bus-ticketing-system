import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";

const status = ["Active", "Inactive"];

const PolicyEditForm = ({ policy, onClose }) => {
  const [policyInfo, setPolicyInfo] = useState({
    policyTitle: "",
    terms: "",
    status: "",
  });

  useEffect(() => {
    if (policy) {
      setPolicyInfo({
        policyTitle: policy.policy_title || "",
        terms: policy.terms || "",
        status: policy.originalStatus || "",
      });
    }
  }, [policy]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPolicyInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-[400px]">
      <header className="font-poppins font-semibold text-lg text-primary mb-4">
        Edit Policy
      </header>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={policyInfo.status}
          onChange={handleInputChange}
          className="rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm w-full h-12 px-4"
          required
        >
          <option value="">Select Status</option>
          {status.map((stat, index) => (
            <option key={index} value={stat}>
              {stat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="policyTitle"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Policy Title
        </label>
        <CustomInput
          placeholder="Policy Title"
          id="policyTitle"
          name="policyTitle"
          type="text"
          value={policyInfo.policyTitle}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="terms"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Terms & Conditions
        </label>
        <CustomInput
          placeholder="Add Terms & Conditions"
          id="terms"
          name="terms"
          type="text"
          value={policyInfo.terms}
          onChange={handleInputChange}
          multiline
          required
        />
      </div>
      <CustomButton title="Save Changes" />
    </div>
  );
};

export default PolicyEditForm;
