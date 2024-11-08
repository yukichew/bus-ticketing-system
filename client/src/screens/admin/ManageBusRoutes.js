import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { busRoutes } from "../../constants/Dummy";
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

  const columns = ["Bus Plate", "Origin", "Destination", "ETD", "ETA"];
  const columnKeys = ["busPlate", "origin", "destination", "etd", "eta"];

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
      {/* Conditional Buttons Based on Status */}
      {row.originalStatus === "Approved" ? (
        // View Details Button (Only for Approved status)
        <div className="relative group">
          <button
            onClick={() => {
              setShowDetailsModal(true); // Set the details modal to show
              setSelectedOperator(row);
            }}
            className="text-gray-500 hover:text-gray-600"
          >
            <FaRegEye className="text-lg text-gray-500 cursor-pointer" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </span>
        </div>
      ) : (
        <>
          {/* Approve Button (Only if not Approved) */}
          <div className="relative group">
            <button
              onClick={() => {
                setShowModal(true);
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

          {/* Reject Button (Only if not Approved) */}
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

          {/* filter input */}
          {showFilters && (
            <Card>
              {/* First Row */}
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/3">
                  <label
                    htmlFor="busPlate"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Bus Plate
                  </label>
                  <CustomInput
                    placeholder="Filter by Bus Plate"
                    id="busPlate"
                    name="busPlate"
                    type="text"
                    value={filters.busPlate}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="origin"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Origin
                  </label>
                  <CustomInput
                    placeholder="Filter by Origin"
                    id="origin"
                    name="origin"
                    type="text"
                    value={filters.origin}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="destination"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Destination
                  </label>
                  <CustomInput
                    placeholder="Filter by Destination"
                    id="destination"
                    name="destination"
                    type="text"
                    value={filters.destination}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="flex justify-between gap-4">
                <div className="w-1/3">
                  <label
                    htmlFor="etd"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    ETD
                  </label>
                  <CustomInput
                    placeholder="Filter by ETD"
                    id="etd"
                    name="etd"
                    type="time"
                    value={filters.etd}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="eta"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    ETA
                  </label>
                  <CustomInput
                    placeholder="Filter by ETA"
                    id="eta"
                    name="eta"
                    type="time"
                    value={filters.eta}
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
                {filteredData.length} bus routes
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
