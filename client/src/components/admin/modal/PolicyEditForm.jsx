import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import { updateTerm } from "../../../api/tac";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const status = ["Active", "Inactive"];

const PolicyEditForm = ({ operator, onClose }) => {
  const [policyInfo, setPolicyInfo] = useState({
    policyTitle: "",
    terms: "",
    status: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (operator) {
      console.log("Operator object:", operator);
      setPolicyInfo({
        policyTitle: operator.policyTitle || "",
        terms: operator.terms || "",
        status: operator.originalStatus || "",
      });
    }
  }, [operator]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPolicyInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleNavigation = (tabName) => {
    navigate(`/manage-contents?tab=${encodeURIComponent(tabName)}`);
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedPolicy = {
        policyTitle: policyInfo.policyTitle,
        terms: policyInfo.terms,
        status: policyInfo.status,
      };

      const response = await updateTerm(operator.tacId, updatedPolicy);

      if (response?.error) {
        toast.error(response.message || "An error occurred while updating.");
      } else {
        toast.success("Terms and Conditions updated!");
        handleNavigation("Terms and Conditions");
      }
    } catch (error) {
      console.error("Error updating policy:", error);
      toast.error("Failed to update the policy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-[600px]"
      >
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
        <CustomButton title={loading ? "Saving..." : "Save Changes"} />
      </form>
    </>
  );
};

export default PolicyEditForm;
