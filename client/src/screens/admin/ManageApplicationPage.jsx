import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { applications } from "../../constants/Dummy";
import { IoFilter } from "react-icons/io5";
import Modal from "../../components/common/Modal";
import ApplicationForm from "../../components/admin/modal/ViewApplication";
import Status from "../../components/admin/Status";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";

const ManageApplicationPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false); // Separate state for approval modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Separate state for details modal
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    companyName: "",
    companyEmail: "",
    contactNumber: "",
    address: "",
    status: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const columns = [
    "Company Name",
    "Company Email",
    "Contact Number",
    "Address",
  ];
  const columnKeys = [
    "companyName",
    "companyEmail",
    "contactNumber",
    "address",
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = applications.filter((operator) =>
    Object.keys(filters).every((key) =>
      operator[key].toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  const enhancedData = filteredData.map((item) => ({
    ...item,
    status: <Status status={item.status} />,
    originalStatus: item.status,
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* Approve and Reject Buttons */}
      {row.originalStatus !== "Approved" && (
        <>
          {/* Approve Button */}
          <div className="relative group">
            <button
              onClick={() => {
                setShowApprovalModal(true);
                setSelectedOperator(row);
              }}
              className="text-green-500 hover:text-green-600"
            >
              <SiTicktick className="text-sm text-gray-500 cursor-pointer" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Approve
            </span>
          </div>

          <div className="h-4 w-px bg-gray-400"></div>

          {/* Reject Button */}
          <div className="relative group">
            <button className="text-red-500 hover:text-red-600">
              <MdOutlineCancel className="text-gray-500 cursor-pointer" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Reject
            </span>
          </div>
        </>
      )}

      {/* View Details Button */}
      {row.originalStatus === "Approved" && (
        <div className="relative group">
          <button
            onClick={() => {
              setShowDetailsModal(true); // Set the details modal to show
              setSelectedOperator(row);
            }}
            className="text-grey-500 hover:text-grey-600"
          >
            <FaRegEye className="text-lg text-gray-500 cursor-pointer" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </span>
        </div>
      )}
    </div>
  );

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
            <h2 className="font-poppins font-bold text-2xl pb-8">
              Applications Management
            </h2>
          </div>

          {/* filter input */}
          {showFilters && (
            <Card>
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/2">
                  <label
                    htmlFor="companyName"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Company Name
                  </label>
                  <CustomInput
                    placeholder="Filter by Company Name"
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={filters.companyName}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="companyEmail"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Company Email
                  </label>
                  <CustomInput
                    placeholder="Filter by Company Email"
                    id="companyEmail"
                    name="companyEmail"
                    type="text"
                    value={filters.companyEmail}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-1/3">
                  <label
                    htmlFor="contactNumber"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Contact Number
                  </label>
                  <CustomInput
                    placeholder="Filter by Contact Number"
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    value={filters.contactNumber}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="address"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <CustomInput
                    placeholder="Filter by Address"
                    id="address"
                    name="address"
                    type="text"
                    value={filters.address}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="status"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full h-12 px-4 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-between items-center mt-12 mb-4">
            <p className="text-gray-500">
              <span className="font-semibold text-secondary">
                {filteredData.length} applications
              </span>{" "}
              found
            </p>
            <div className="flex justify-end items-center">
              <button
                className="ml-auto flex items-center font-medium hover:text-primary pr-1"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <IoFilter size={16} />
                <p className="mx-1">Filters</p>
              </button>
            </div>
          </div>

          <div className="mt-3 mx-auto">
            <Table
              data={enhancedData}
              columns={columns}
              columnKeys={columnKeys}
              showActionColumn={true}
              actions={actionIcons}
            />
          </div>

          {/* Modal for Approve Application */}
          <Modal
            isVisible={showApprovalModal}
            onClose={() => setShowApprovalModal(false)}
          >
            <ApplicationForm
              operator={selectedOperator}
              onClose={() => setShowApprovalModal(false)}
            />
          </Modal>

          {/* Modal for View Details */}
          <Modal
            isVisible={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
          >
            <ApplicationForm
              operator={selectedOperator}
              onClose={() => setShowDetailsModal(false)}
              isApproved={selectedOperator?.originalStatus === "Approved"}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageApplicationPage;
