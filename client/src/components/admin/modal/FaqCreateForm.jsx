import React, { useState } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import { createFaq } from "../../../api/faq";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  "General",
  "Manage Booking",
  "Payment & Refund",
  "Technical",
  "Journey & Visa",
];

const FaqCreateForm = ({}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    category: "",
    question: "",
    answer: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNavigation = (tabName) => {
    navigate(`/manage-contents?tab=${encodeURIComponent(tabName)}`);
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (!formState.category || !formState.question || !formState.answer) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    const response = await createFaq({ ...formState, status: "Active" });

    console.log("Response from server:", response);

    if (response?.faqId) {
      toast.success("FAQ created successfully!");
      handleNavigation("FAQs");
    } else {
      toast.error(response?.message || "Failed to create the FAQ.");
    }

    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col space-y-4 w-[600px]">
        <div className="font-poppins font-semibold text-lg text-primary mb-4">
          <header className="mb-2">Add New Questions</header>
        </div>

        {/* Category Selector */}
        <div>
          <select
            id="category"
            name="category"
            value={formState.category}
            onChange={handleChange}
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

        {/* Question Input */}
        <CustomInput
          placeholder="Question"
          id="question"
          name="question"
          value={formState.question}
          onChange={handleChange}
          type="text"
          required
          multiline
        />

        {/* Answer Input */}
        <CustomInput
          placeholder="Answer"
          id="answer"
          name="answer"
          value={formState.answer}
          onChange={handleChange}
          type="text"
          required
          multiline
        />

        {/* Submit Button */}
        <CustomButton
          title={loading ? "Adding..." : "Add"}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default FaqCreateForm;
