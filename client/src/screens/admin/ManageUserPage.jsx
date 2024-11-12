import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import ManageUser from "../../components/admin/ManageUser";
import ManageBusOperators from "../../components/admin/ManageBusOperators";
import { useLocation } from "react-router-dom";

const ManageUserPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Main");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section); // Set the section based on location state if it exists
    }
  }, [location.state]);

  const renderContent = () => {
    switch (activeSection) {
      case "Passengers":
        return <ManageUser />;
      case "Bus Operators":
        return <ManageBusOperators />;
      default:
        return <ManageUser />;
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
              Users Management
            </h2>
          </div>

          <div className="flex items-center space-x-8 mt-5 border-b">
            <div
              onClick={() => setActiveSection("Passengers")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeSection === "Passengers"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-400 hover:text-primary"
              } transition duration-300 flex items-center`}
            >
              <span>Passengers</span>
            </div>

            <div
              onClick={() => setActiveSection("Bus Operators")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeSection === "Bus Operators"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-400 hover:text-primary"
              } transition duration-300 flex items-center`}
            >
              <span>Bus Operators</span>
            </div>
          </div>

          <div className="mt-6 mb-6">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default ManageUserPage;
