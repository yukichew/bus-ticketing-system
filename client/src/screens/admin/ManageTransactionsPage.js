import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import ManageUser from "../../components/admin/ManageUser";
import ManageTransactions from "../../components/admin/ManageTransactions";
import ManageRefunds from "../../components/admin/ManageRefunds";

const ManageTransactionsPage = () => {
  const [activeSection, setActiveSection] = useState("Main");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Transactions":
        return <ManageTransactions />;
      case "Refunds":
        return <ManageRefunds />;
      default:
        return <ManageTransactions />;
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
              Transactions Management
            </h2>
          </div>

          <div className="flex items-center space-x-8 mt-5 border-b">
            <div
              onClick={() => setActiveSection("Transactions")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeSection === "Transactions"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-400 hover:text-primary"
              } transition duration-300 flex items-center`}
            >
              <span>All Transactions</span>
            </div>

            <div
              onClick={() => setActiveSection("Refunds")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeSection === "Refunds"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-400 hover:text-primary"
              } transition duration-300 flex items-center`}
            >
              <span>Refunds Request</span>
            </div>
          </div>

          <div className="mt-6 mb-6">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default ManageTransactionsPage;
