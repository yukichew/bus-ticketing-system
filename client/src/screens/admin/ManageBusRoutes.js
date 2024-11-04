import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { MdCancel } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";
import { busRoutes } from "../../components/constants/Dummy";
import Modal from "../../components/common/Modal";
import ViewBusRoutes from "../../components/admin/modal/ViewBusRoutes";
import Status from "../../components/admin/Status";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";

const ManageBusRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // state for approve modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // separate state for details modal
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    busPlate: "",
    origin: "",
    destination: "",
    etd: "",
    eta: "",
    status: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const columns = [
    "Bus Plate",
    "Origin",
    "Destination",
    "ETD",
    "ETA",
    "Status",
  ];
  const columnKeys = [
    "busPlate",
    "origin",
    "destination",
    "etd",
    "eta",
    "status",
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = busRoutes.filter((operator) =>
    Object.keys(filters).every((key) =>
      operator[key].toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  const enhancedData = filteredData.map((item) => ({
    ...item,
    status: (
      <div className="flex justify-center">
        <Status status={item.status} />
      </div>
    ),
    originalStatus: item.status,
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* View Button */}
      {row.originalStatus !== "Approved" && (
        <div className="relative group">
          <button
            onClick={() => {
              setShowModal(true);
              setSelectedOperator(row);
            }}
            className="text-green-500 hover:text-green-600"
          >
            <TiTick className="text-2xl" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Approve
          </span>
        </div>
      )}

      {/* Reject Button */}
      {row.originalStatus !== "Approved" && (
        <div className="relative group">
          <button className="text-red-500 hover:text-red-600">
            <MdCancel className="text-xl" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Reject
          </span>
        </div>
      )}

      {/* View Details Button */}
      {row.originalStatus !== "Pending" && (
        <div className="relative group">
          <button
            onClick={() => {
              setShowDetailsModal(true); // Set the details modal to show
              setSelectedOperator(row);
            }}
            className="text-grey-500 hover:text-grey-600"
          >
            <IoEye className="text-xl" />
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
            <h2 className="font-poppins font-bold text-2xl pb-10">
              Bus Routes Management
            </h2>
          </div>

          {/* filter button */}
          <button
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
            onClick={() => setShowFilters((prev) => !prev)} // Toggle filter visibility
          >
            <IoFilter size={16} />
            <p className="mx-1">Filters</p>
          </button>

          {/* filter input */}
          {showFilters && (
            <Card>
              <div className="flex justify-between gap-4">
                <CustomInput
                  placeholder="Filter by Bus Plate"
                  id="busPlate"
                  name="busPlate"
                  type="text"
                  value={filters.busPlate}
                  onChange={handleFilterChange}
                />
                <CustomInput
                  placeholder="Filter by Origin"
                  id="origin"
                  name="origin"
                  type="text"
                  value={filters.origin}
                  onChange={handleFilterChange}
                />
                <CustomInput
                  placeholder="Filter by Destination"
                  id="destination"
                  name="destination"
                  type="text"
                  value={filters.destination}
                  onChange={handleFilterChange}
                />
                <CustomInput
                  placeholder="Filter by ETD"
                  id="etd"
                  name="etd"
                  type="text"
                  value={filters.etd}
                  onChange={handleFilterChange}
                />
                <CustomInput
                  placeholder="Filter by ETA"
                  id="eta"
                  name="eta"
                  type="text"
                  value={filters.eta}
                  onChange={handleFilterChange}
                />
                {/* Dropdown for Status */}
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full h-12 px-4 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm"
                >
                  <option value="">All Status</option>{" "}
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </Card>
          )}

          <div className="flex justify-between items-center mt-8">
            <p className="text-gray-500">
              <span className="font-semibold text-secondary">
                {filteredData.length} bus route applications
              </span>{" "}
              found
            </p>
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

          {/* modal for approve */}
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <ViewBusRoutes
              operator={selectedOperator}
              onClose={() => setShowModal(false)}
            />
          </Modal>

          {/* Modal for View Details */}
          <Modal
            isVisible={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
          >
            <ViewBusRoutes
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

export default ManageBusRoutes;
