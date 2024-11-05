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

const status = ["Active", "Inactive"];

const FaqEditForm = ({ operator, onClose }) => {
  const [faqInfo, setFaqInfo] = useState({
    question: "",
    answer: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    if (operator) {
      setFaqInfo({
        question: operator.question,
        answer: operator.answer,
        category: operator.category,
        status: operator.originalStatus || "",
      });
    }
  }, [operator]);

  const handleFaqChange = (e) => {
    const { id, value } = e.target;
    setFaqInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-[400px]">
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
          value={faqInfo.status}
          onChange={handleFaqChange}
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
          htmlFor="category"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={faqInfo.category}
          onChange={handleFaqChange}
          className="rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm w-full h-12 px-4"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="question"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Question
        </label>
        <CustomInput
          placeholder="Enter Question"
          id="question"
          name="question"
          type="text"
          value={faqInfo.question}
          onChange={handleFaqChange}
          multiline
          required
        />
      </div>
      <div>
        <label
          htmlFor="answer"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Answer
        </label>
        <CustomInput
          placeholder="Enter answer"
          id="answer"
          name="answer"
          type="text"
          value={faqInfo.answer}
          onChange={handleFaqChange}
          multiline
        />
      </div>

      <CustomButton title={"Save Changes"} />
    </div>
  );
};

export default FaqEditForm;
