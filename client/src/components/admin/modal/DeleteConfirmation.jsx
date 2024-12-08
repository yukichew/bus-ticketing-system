import React, { useState } from "react";
import CustomButton from "../../../components/common/CustomButton";

const DeleteConfirmation = ({ operator, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onConfirm();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <header className="font-poppins font-semibold text-lg text-primary mb-4">
        Are you sure you want to delete this data?
      </header>
      <div className="flex space-x-4 justify-between">
        <CustomButton
          title={loading ? "Deleting..." : "Delete"}
          onClick={handleDelete}
          className="w-1/2 text-white"
        />
        <CustomButton
          title="Cancel"
          onClick={onClose}
          className="w-1/2 text-white"
        />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
