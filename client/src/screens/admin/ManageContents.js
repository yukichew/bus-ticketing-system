import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import ManageFaq from "../../components/admin/ManageFaq";

const ManageContents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Main");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "FAQs":
        return <ManageFaq />;
      case "Terms and Conditions":
        return <ManageFaq />;
      default:
        return <ManageFaq />;
    }
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
          <div className="flex items-center">
            <h2 className="font-poppins font-bold text-2xl">
              Contents Management
            </h2>
          </div>

          <div className="flex items-center space-x-8 mt-5 border-b">
            <div
              onClick={() => setActiveSection("FAQs")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeSection === "FAQs"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-400 hover:text-primary"
              } transition duration-300 flex items-center`}
            >
              <span>FAQs</span>
            </div>

            <div
              onClick={() => setActiveSection("Terms and Conditions")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeSection === "Terms and Conditions"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-400 hover:text-primary"
              } transition duration-300 flex items-center`}
            >
              <span>Terms & Conditions</span>
            </div>
          </div>

          <div className="mt-6 mb-6">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default ManageContents;
