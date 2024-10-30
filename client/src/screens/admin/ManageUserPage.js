import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/admin/Table";
import CustomButton from "../../components/common/CustomButton";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";

const ManageUserPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
    { label: "Status", accessor: "status" },
    {
      label: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {/* Update Button with Tooltip */}
          <div className="relative group">
            <button className="text-blue-500 hover:text-blue-600">
              <FaRegEdit className="text-xl" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Update
            </span>
          </div>

          {/* Deactivate Button with Tooltip */}
          <div className="relative group">
            <button className="text-red-500 hover:text-red-600">
              <TiUserDeleteOutline className="text-xl" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Deactivate
            </span>
          </div>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Bus Operator",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      role: "Bus Operator",
      status: "Inactive",
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
            User Management
          </h2>
          <div className="mt-8 pb-5">
            <div className="w-40">
              <CustomButton title={"Create User"} />
            </div>
          </div>
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
};

export default ManageUserPage;
