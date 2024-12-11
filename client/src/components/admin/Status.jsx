import React from "react";

const Status = ({ status }) => {
  const statusStyles = {
    Active: "text-green-700 bg-green-100",
    Inactive: "text-red-600 bg-red-100",
    Deactivated: "text-red-600 bg-red-100",
    Completed: "text-green-700 bg-green-100",
    Approved: "text-green-700 bg-green-100",
    Pending: "text-yellow-700 bg-yellow-100",
    "Pending for Review": "text-yellow-700 bg-yellow-100",
    Succeeded: "text-green-700 bg-green-100",
  };

  const appliedStyles = statusStyles[status] || "text-gray-700 bg-gray-100";

  return (
    <div
      className={`relative inline-block w-40 ${appliedStyles} rounded-lg border border-gray-200 shadow-md px-2 p-1`}
    >
      <span className="font-poppins font-medium text-sm text-center block">
        {status}
      </span>
    </div>
  );
};

export default Status;
