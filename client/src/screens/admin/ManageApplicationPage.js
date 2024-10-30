import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/admin/Table";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

const ManageApplicationPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Define columns for the applications table
  const columns = [
    {
      label: "Application ID",
      accessor: "id",
      Cell: ({ row }) => (
        <Link
          to={`/applications/${row.id}`}
          className="text-blue-500 hover:underline"
        >
          {row.id}
        </Link>
      ),
    },
    { label: "Company Name", accessor: "companyName" },
    { label: "Email", accessor: "email" },
    { label: "Contact No", accessor: "contactNo" },
    { label: "Status", accessor: "status" },
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

  // Sample data for applications
  const data = [
    {
      id: 1,
      companyName: "KKKL Express",
      email: "kkkl@example.com",
      contactNo: "012-3456789",
      status: "Pending",
    },
    {
      id: 2,
      companyName: "Transnasional",
      email: "transnasional@example.com",
      contactNo: "012-9876543",
      status: "Pending",
    },
    {
      id: 3,
      companyName: "Aeroline",
      email: "aeroline@example.com",
      contactNo: "012-5555555",
      status: "Pending",
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
          <h2 className="text-lg font-poppins font-semibold mb-4">
            Applications Management
          </h2>
          <div className="mt-8 pb-5"></div>
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
};

export default ManageApplicationPage;
