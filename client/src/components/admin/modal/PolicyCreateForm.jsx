import React, { useState } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";

const PolicyCreateForm = ({ onSubmit }) => {
  const [policyTitle, setPolicyTitle] = useState("");
  const [terms, setTerms] = useState("");

  return (
    <div className="flex flex-col space-y-4 w-[400px]">
      <header className="font-poppins font-semibold text-lg text-primary mb-4">
        Add New Policy
      </header>
      <div>
        <CustomInput
          placeholder="Policy Title"
          id="policyTitle"
          name="policyTitle"
          type="text"
          value={policyTitle}
          onChange={(e) => setPolicyTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <CustomInput
          placeholder="Add Terms & Conditions"
          id="terms"
          name="terms"
          type="text"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          multiline
          required
        />
      </div>
      <CustomButton title="Add Policy" />
    </div>
  );
};

export default PolicyCreateForm;
