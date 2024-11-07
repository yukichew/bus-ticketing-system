import React, { useState } from "react";
import { policyData } from "../../constants/Dummy";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Card from "../../components/common/Card";
import { FaRegQuestionCircle, FaRegHandPointRight } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PolicyUserView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedPolicy, setExpandedPolicy] = useState(null); // Tracks which policy is expanded
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handlePolicyClick = (policyTitle) => {
    setExpandedPolicy((prev) => (prev === policyTitle ? null : policyTitle));
  };

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
            Terms and Conditions
          </h2>
          <button
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
            onClick={() => navigate("/manage-contents")}
          >
            <IoIosArrowRoundBack size={16} />
            <p className="mx-1">Return to Admin View</p>
          </button>
          <Card>
            {policyData.map((policy, index) => (
              <div key={policy.id} className="mb-6">
                <div className="flex justify-between">
                  <h3
                    className="text-xl font-bold mb-10 cursor-pointer font-poppins hover:text-primary"
                    onClick={() => handlePolicyClick(policy.policy_title)}
                  >
                    {index + 1}. {policy.policy_title}
                  </h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => handlePolicyClick(policy.policy_title)}
                  >
                    {expandedPolicy === policy.policy_title ? (
                      <RiArrowDropUpLine size={24} className="text-gray-500" />
                    ) : (
                      <RiArrowDropDownLine
                        size={24}
                        className="text-gray-500"
                      />
                    )}
                  </div>
                </div>

                {expandedPolicy === policy.policy_title && (
                  <ul className="list-none pl-0">
                    {policy.terms.map((term, index) => (
                      <li key={index} className="flex flex-col mb-4">
                        <div className="flex items-center mb-1 font-poppins text-gray-500">
                          <FaRegHandPointRight className="mr-2" />
                          <p className="font-medium">{term}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Card>
          <p className="ml-auto flex items-center font-medium text-gray-500 pt-4">
            Note: The information above is subject to changes from time to time.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PolicyUserView;
