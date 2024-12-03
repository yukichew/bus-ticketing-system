import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Stars from "../../../components/common/Stars";

const ReviewForm = ({ operator, onClose }) => {
  const [rating, setRating] = useState(0);

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
        busOperatorID: operator.busOperatorID,
        passengerID: operator.passengerID,
        comment: operator.comment,
        rates: Number(operator.numericRates) || 0,
        date: operator.originalDate,
        status: operator.originalStatus || "",
      });
      setRating(Number(operator.numericRates) || 0);
    }
  }, [operator]);

  const handleReviewChange = (e) => {
    const { id, value } = e.target;
    setReviewInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-[600px]">
      <div className="pointer-events-none">
        <label
          htmlFor="busOperatorID"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Bus Operator ID
        </label>
        <CustomInput
          placeholder="Bus Operator ID"
          id="busOperatorID"
          name="busOperatorID"
          type="text"
          value={reviewInfo.busOperatorID}
          onChange={handleReviewChange}
          required
        />
      </div>

      <div className="pointer-events-none">
        <label
          htmlFor="passengerID"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Passenger ID
        </label>
        <CustomInput
          placeholder="Passenger ID"
          id="passengerID"
          name="passengerID"
          type="text"
          value={reviewInfo.passengerID}
          onChange={handleReviewChange}
          required
        />
      </div>

      <div className="pointer-events-none">
        <label
          htmlFor="status"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Status
        </label>
        <CustomInput
          placeholder="Enter Status"
          id="status"
          name="status"
          type="text"
          value={reviewInfo.status}
          onChange={handleReviewChange}
          required
        />
      </div>

      <div className="pointer-events-none">
        <label
          htmlFor="date"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Date
        </label>
        <CustomInput
          placeholder="Enter Date"
          id="date"
          name="date"
          type="date"
          value={reviewInfo.date}
          onChange={handleReviewChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="rates"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Rates
        </label>
        <div className="flex items-center">
          <Stars rating={operator.numericRates} />
          <span className="ml-2 text-gray-600">{operator.numericRates}/5</span>
        </div>
      </div>

      <div className="pointer-events-none">
        <label
          htmlFor="comment"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Comment
        </label>
        <CustomInput
          placeholder="Enter Comment"
          id="comment"
          name="comment"
          type="text"
          value={reviewInfo.comment}
          onChange={handleReviewChange}
          multiline
          required
        />
      </div>

      <CustomButton title={"Delete"} onClick={onClose} />
    </div>
  );
};

export default ReviewForm;
