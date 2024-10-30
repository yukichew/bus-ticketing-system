import React from "react";

const Status = ({ status }) => {
  const statusStyles = {
    Active: "text-green-700 bg-green-100",
    Deactivated: "text-red-600 bg-red-100",
  };

  const appliedStyles = statusStyles[status] || statusStyles["Active"];

  return (
    <div
      className={`relative inline-block w-32 ${appliedStyles} rounded-lg border-1 border-gray-50 shadow-md`}
    >
      <span className="font-poppins font-medium text-sm px-2">{status}</span>
    </div>
  );
};

export default Status;
