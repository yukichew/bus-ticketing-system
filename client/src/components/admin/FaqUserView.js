import React, { useState } from "react";
import { faqData } from "../../constants/Dummy";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Card from "../../components/common/Card";
import { FaRegQuestionCircle } from "react-icons/fa";
import {
  RiQuestionAnswerLine,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FaqUserView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleQuestionClick = (question) => {
    setExpandedQuestion((prev) => (prev === question ? null : question));
  };

  // Group FAQs by category
  const categorizedFaqs = faqData.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`flex-1 p-4 transition-all duration-300 mt-20 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="w-4/5 mt-8 mx-auto">
          <h2 className="font-poppins font-bold text-2xl mb-4">
            Frequently Asked Questions
          </h2>
          <button
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
            onClick={() => navigate("/manage-contents")}
          >
            <IoIosArrowRoundBack size={16} />
            <p className="mx-1">Return to Admin View</p>
          </button>
          <Card>
            {Object.keys(categorizedFaqs).map((category, index) => (
              <div key={category} className="mb-6">
                <h3
                  className="text-xl font-bold mb-10 cursor-pointer font-poppins hover:text-primary"
                  onClick={() => handleCategoryClick(category)}
                >
                  {index + 1}. {category}
                </h3>
                {expandedCategory === category && (
                  <ul className="list-none pl-0">
                    {categorizedFaqs[category].map((faq) => (
                      <li
                        key={faq.question}
                        className="flex flex-col mb-6 cursor-pointer"
                      >
                        <div
                          className="flex items-center mb-1 font-poppins hover:text-primary"
                          onClick={() => handleQuestionClick(faq.question)}
                        >
                          <FaRegQuestionCircle className="mr-2 text-gray-500" />
                          <h4 className="font-semibold flex-grow">
                            {faq.question}
                          </h4>
                          {expandedQuestion === faq.question ? (
                            <RiArrowDropUpLine
                              size={24}
                              className="text-gray-500"
                            />
                          ) : (
                            <RiArrowDropDownLine
                              size={24}
                              className="text-gray-500"
                            />
                          )}
                        </div>
                        {expandedQuestion === faq.question && (
                          <div className="flex items-start mt-1 border-t pt-2">
                            <div className="flex items-center justify-center w-8 h-8 mr-2 text-gray-500">
                              <RiQuestionAnswerLine className="w-4 h-4" />
                            </div>
                            <p className="max-w-full overflow-hidden text-ellipsis whitespace-normal text-justify">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Card>
          <p className="ml-auto flex items-center font-medium text-gray-500 pt-4">
            Note: The info above are subjected to changes from time to time.
          </p>
        </div>
      </main>
    </div>
  );
};

export default FaqUserView;
