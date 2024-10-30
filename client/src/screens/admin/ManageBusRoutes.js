import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/admin/Table";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

const ManageBusRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Define columns for the bus routes table
  const columns = [
    { label: "Bus Plate", accessor: "busPlate" },
    { label: "Origin", accessor: "origin" },
    { label: "Destination", accessor: "destination" },
    { label: "ETD", accessor: "etd" },
    { label: "ETA", accessor: "eta" },
    { label: "Recurring Schedule", accessor: "recurringSchedule" },
    { label: "Date Range", accessor: "dateRange" },
    { label: "Boarding Location", accessor: "boardingLocation" },
    {
      label: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {/* Approve Button */}
          <div className="relative group">
            <button className="text-green-500 hover:text-green-600">
              <TiTick className="text-2xl" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Approve
            </span>
          </div>

          {/* Reject Button */}
          <div className="relative group">
            <button className="text-red-500 hover:text-red-600">
              <MdCancel className="text-xl" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Reject
            </span>
          </div>
        </div>
      ),
    },
  ];

  // Sample data for bus routes
  const data = [
    {
      busPlate: "ABC 1234",
      origin: "City A",
      destination: "City B",
      etd: "10:00 AM",
      eta: "12:00 PM",
      recurringSchedule: "Daily",
      dateRange: "01/11/2024 - 07/11/2024",
      boardingLocation: "Central Bus Station",
    },
    {
      busPlate: "XYZ 5678",
      origin: "City C",
      destination: "City D",
      etd: "02:00 PM",
      eta: "04:00 PM",
      recurringSchedule: "Weekly (Mon, Wed, Fri)",
      dateRange: "01/11/2024 - 31/12/2024",
      boardingLocation: "Downtown Bus Terminal",
    },
  ];

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`flex-1 p-4 transition-all duration-300 mt-24 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="container mx-auto p-6">
          <h2 className="text-lg font-poppins font-semibold mb-14">
            Manage Bus Routes
          </h2>
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
};

export default ManageBusRoutes;
