import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DashboardCard from "../../components/admin/DashboardCard";
import LineChart from "../../components/admin/LineChart";
import PieChart from "../../components/admin/PieChart";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    console.log("Sidebar Open:", !isSidebarOpen);
  };

  useEffect(() => {
    console.log("Sidebar state changed:", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Sidebar rendering */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`flex-1 p-4 transition-all duration-300 mt-24 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Passengers"
            value="277"
            gradientColors={["#0A21C0", "#B3B4BD"]}
            iconType="up"
          />
          <DashboardCard
            title="Total Ticket Sales"
            value="1200"
            gradientColors={["#141619", "#2c2E3A"]}
            iconType="down"
          />
          <DashboardCard
            title="Total Bus Operators"
            value="50"
            gradientColors={["#050A44", "#0A21C0"]}
            iconType="down"
          />
          <DashboardCard
            title="Total Applications"
            value="45"
            gradientColors={["#141619", "#B3B4BD"]}
            iconType="up"
          />
        </div>

        <div className="mt-8 flex space-x-4">
          <div className="flex-1 p-4 bg-white rounded-lg shadow-lg drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            <div className="font-poppins">Analytics Report</div>
            <LineChart />
          </div>

          <div className="flex-[0.5] p-4 bg-white rounded-lg shadow-lg drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            {" "}
            <div className="font-poppins">Ticket Sales by Bus Type</div>
            <PieChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
