import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Tabs from "../../components/common/Tabs";
import { manageUserTabs } from "../../constants/TabItems";
import { useLocation } from "react-router-dom";

const ManageUserPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Passengers"); // Default tab
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (location.state?.section) {
      setActiveTab(location.state.section); // Update active tab based on passed sectionState
    }
  }, [location.state]);

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
          <div className="flex items-center">
            <h2 className="font-poppins font-bold text-2xl">
              Users Management
            </h2>
          </div>

          <div className="mt-2">
            <Tabs tabs={manageUserTabs} activeTabProp={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageUserPage;
