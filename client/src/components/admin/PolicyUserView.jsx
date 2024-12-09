import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Card from "../../components/common/Card";
import Container from "../../components/Container";
import { FaRegHandPointRight } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { getActiveTerms } from "../../api/tac";

const PolicyUserView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedPolicy, setExpandedPolicy] = useState(null); // Tracks which policy is expanded
  const [policyData, setPolicyData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handlePolicyClick = (policyTitle) => {
    setExpandedPolicy((prev) => (prev === policyTitle ? null : policyTitle));
  };

  // Only fetch Terms and Conditions where status = "Active"
  useEffect(() => {
    const getTAC = async () => {
      try {
        const data = await getActiveTerms();
        const tacWithIds = data.map((tac, index) => ({
          ...tac,
          tacId: index.toString(),
          terms: tac.terms
            ? tac.terms.split(";").map((term) => term.trim())
            : [], // Handle undefined terms
        }));
        setPolicyData(tacWithIds);
      } catch (error) {
        console.error("Failed to fetch Terms and Conditions:", error);
      }
    };

    getTAC();
  }, []);

  return (
    <Container>
      <div className="relative flex min-h-screen overflow-hidden">
        <div className="w-4/5 mt-8 mx-auto">
          <h2 className="font-poppins font-bold text-2xl mb-6">
            Terms and Conditions
          </h2>
          {location.state?.fromAdmin && (
            <button
              className="ml-auto flex items-center font-medium hover:text-primary pr-1"
              onClick={() =>
                navigate("/manage-contents?tab=Terms%20and%20Conditions")
              }
            >
              <IoIosArrowRoundBack size={16} />
              <p className="mx-1">Return to Admin View</p>
            </button>
          )}
          <Card>
            {policyData.map((policy, index) => (
              <div key={policy.id} className="mb-6">
                <div className="flex justify-between">
                  <h3
                    className="text-xl font-bold mb-10 cursor-pointer font-poppins hover:text-primary"
                    onClick={() => handlePolicyClick(policy.policyTitle)}
                  >
                    {index + 1}. {policy.policyTitle}
                  </h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => handlePolicyClick(policy.policyTitle)}
                  >
                    {expandedPolicy === policy.policyTitle ? (
                      <RiArrowDropUpLine size={24} className="text-gray-500" />
                    ) : (
                      <RiArrowDropDownLine
                        size={24}
                        className="text-gray-500"
                      />
                    )}
                  </div>
                </div>

                {expandedPolicy === policy.policyTitle && (
                  <ul className="list-none pl-0">
                    {policy.terms.map((term, index) => (
                      <li key={index} className="flex flex-col mb-6">
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
          <p className="ml-auto flex items-center font-medium text-gray-500 pt-6 pb-8">
            Note: The information above is subject to changes from time to time.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PolicyUserView;
