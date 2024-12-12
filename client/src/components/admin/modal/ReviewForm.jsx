import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import { approveAndRejectReviews } from "../../../api/rating";
import { toast } from "react-toastify";

const ReviewForm = ({ operator, onClose }) => {
  const [reviewInfo, setReviewInfo] = useState({
    busOperatorID: "",
    passengerID: "",
    comment: "",
    rates: 0,
    date: "",
    status: "",
  });

  useEffect(() => {
    if (operator) {
      setReviewInfo({
        reviewID: operator.reviewID,
        busType: operator.busType,
        busPlate: operator.busPlate,
        busOperator: operator.busOperator,
        comment: operator.comment,
        status: operator.originalStatus,
      });
    }
  }, [operator]);

  const handleReviewChange = (e) => {
    const { id, value } = e.target;
    setReviewInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleApproveAndReject = async (status) => {
    if (!operator || !operator.reviewID) {
      console.log(operator.reviewID);
      console.error("No operator selected or missing ID.");
      return;
    }

    if (!status) {
      console.error("Status is required.");
      return;
    }

    try {
      const response = await approveAndRejectReviews(operator.reviewID, status);

      if (response?.error) {
        toast.error("API error: ", response.message);
      } else {
        toast.success("Ratings have been reviewed.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Unexpected error occurred: ", error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-[400px]">
      <div className="pointer-events-none">
        <label
          htmlFor="busOperator"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Bus Operator
        </label>
        <CustomInput
          placeholder="Enter Bus Operator"
          id="busOperator"
          name="busOperator"
          type="text"
          value={reviewInfo.busOperator}
          onChange={handleReviewChange}
          required
        />
      </div>
      <div className="pointer-events-none">
        <label
          htmlFor="busType"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Bus Type
        </label>
        <CustomInput
          placeholder="Bus Operator ID"
          id="busType"
          name="busType"
          type="text"
          value={reviewInfo.busType}
          onChange={handleReviewChange}
          required
        />
      </div>

      <div className="pointer-events-none">
        <label
          htmlFor="busPlate"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Bus Plate
        </label>
        <CustomInput
          placeholder="Bus Plate"
          id="busPlate"
          name="busPlate"
          type="text"
          value={reviewInfo.busPlate}
          onChange={handleReviewChange}
          required
        />
      </div>

      {operator?.originalStatus === "Pending for Review" && (
        <div className="flex justify-between">
          <CustomButton
            title={"Approve"}
            onClick={() => handleApproveAndReject("Inactive")}
            className="pr-6"
          />
          <CustomButton
            title={"Reject"}
            onClick={() => handleApproveAndReject("Active")}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
