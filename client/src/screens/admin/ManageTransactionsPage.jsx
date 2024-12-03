import React, { useState, useEffect, useMemo } from "react";
import { transactions } from "../../constants/Dummy";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { manageTransactionsTabs as initialTabs } from "../../constants/TabItems";
import Tabs from "../../components/common/Tabs";

const ManageTransactionsPage = () => {
  const [activeTab, setActiveTab] = useState("Transactions"); // Default tab
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refundRequestCount, setRefundRequestCount] = useState(0);

  useEffect(() => {
    // Calculate total refund requests (both "Request for Refund" and "Processing Refund")
    const totalRefundRequests = transactions.filter(
      (transaction) =>
        transaction.status === "Request for Refund" ||
        transaction.status === "Processing Refund"
    ).length;
    setRefundRequestCount(totalRefundRequests);
  }, []);

  // Update tab labels dynamically
  const manageTransactionsTabs = useMemo(() => {
    return initialTabs.map((tab) => {
      if (tab.label === "Refunds Request") {
        return {
          ...tab,
          label: (
            <span className="flex items-center">
              Refunds Request
              {refundRequestCount > 0 && (
                <span className="ml-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                  {refundRequestCount}
                </span>
              )}
            </span>
          ),
        };
      }
      return tab;
    });
  }, [refundRequestCount]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`flex-1 p-4 transition-all duration-300 mt-16 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="w-4/5 mt-8 mx-auto">
          <div className="flex items-center">
            <h2 className="font-poppins font-bold text-2xl">
              Transactions Management
            </h2>
          </div>
          <div className="mt-2">
            <Tabs tabs={manageTransactionsTabs} activeTabProp={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageTransactionsPage;
