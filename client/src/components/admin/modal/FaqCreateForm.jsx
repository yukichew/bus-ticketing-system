import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";

const categories = [
  "General",
  "Manage Booking",
  "Payment & Refund",
  "Technical",
  "Journey & Visa",
];

const FaqCreateForm = ({}) => {
  return (
    <div className="flex flex-col space-y-4 w-[600px]">
      <div className="flex justify-between items-start"></div>
      <div className="font-poppins font-semibold text-lg text-primary mb-4">
        <header className="mb-2">Add New Questions</header>
      </div>
      <div>
        <select
          id="category"
          name="category"
          className="rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm w-full h-12 px-4"
          required
        >
          <option value="">Select Question Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <CustomInput
        placeholder="Question"
        id="question"
        name="question"
        type="text"
        required
        multiline
      />
      <CustomInput
        placeholder="Answer"
        id="answer"
        name="answer"
        type="text"
        required
        multiline
      />

      <CustomButton title={"Add"} />
    </div>
  );
};

export default FaqCreateForm;
