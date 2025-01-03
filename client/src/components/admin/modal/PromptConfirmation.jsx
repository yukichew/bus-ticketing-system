import React, { useState } from "react";
import CustomButton from "../../../components/common/CustomButton";

const PromptConfirmation = ({ header, confirmTitle, onConfirm, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onConfirm();
    } catch (error) {
      console.error("Error during confirmation action:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <header className="font-poppins font-semibold text-lg text-primary mb-4">
        {header}
      </header>

      <div className="flex space-x-4 justify-between">
        <CustomButton
          title={loading ? "Processing..." : confirmTitle}
          onClick={handleConfirm}
          className="w-1/2 text-white"
        />
        <CustomButton
          title={"Cancel"}
          onClick={onClose}
          className="w-1/2 text-white"
        />
      </div>
    </div>
  );
};

export default PromptConfirmation;
