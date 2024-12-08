import React, { useState } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import { createTerm } from "../../../api/tac";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PolicyCreateForm = ({}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    policyTitle: "",
    terms: "",
  });
  const [loading, setLoading] = useState(false);

  const handleNavigation = (tabName) => {
    navigate(`/manage-contents?tab=${encodeURIComponent(tabName)}`);
    setTimeout(() => window.location.reload(), 1000);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formState.policyTitle || !formState.terms) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formState,
        status: "Active",
      };

      const response = await createTerm(dataToSend);

      if (response?.error) {
        toast.error(response.message);
      } else {
        toast.success("Terms and Conditions created!");
        handleNavigation("Terms and Conditions");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("An error occurred while creating the TAC.");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col space-y-4 w-[600px]">
        <header className="font-poppins font-semibold text-lg text-primary mb-4">
          Add New Policy
        </header>
        <div>
          <CustomInput
            placeholder="Policy Title"
            id="policyTitle"
            name="policyTitle"
            type="text"
            value={formState.policyTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <CustomInput
            placeholder="Add Terms & Conditions (e.g. Each terms & conditions are separated with ' ; ')"
            id="terms"
            name="terms"
            type="text"
            value={formState.terms}
            onChange={handleChange}
            multiline
            required
          />
        </div>
        <CustomButton
          title={loading ? "Creating..." : "Add Policy"}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default PolicyCreateForm;
