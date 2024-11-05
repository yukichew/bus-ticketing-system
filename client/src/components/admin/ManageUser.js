import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { passengers } from "../../constants/Dummy";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";
import PassengerUpdateForm from "./modal/PassengerUpdateForm";
import PassengerCreateForm from "./modal/PassengerCreateForm";
import Modal from "../common/Modal";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";

const ManageUser = () => {
  const [showModal, setShowModal] = useState(false); // state for update modal
  const [showCreateModal, setCreateModal] = useState(false); // state for create modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // state for details modal
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    fullName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    status: "",
  });

  const columns = ["Full Name", "Email", "DoB", "Phone Number"];
  const columnKeys = ["fullName", "email", "dob", "phoneNumber"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = passengers.filter((operator) =>
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
      {row.originalStatus !== "Deactivated" && (
        <div className="relative group">
          <button
            onClick={() => {
              setSelectedOperator(row);
              setShowModal(true);
            }}
            className="text-green-500 hover:text-green-600"
          >
            <FaRegEdit className="text-xl text-gray-500 cursor-pointer" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Update
          </span>
        </div>
      )}

      {row.originalStatus !== "Deactivated" && (
        <div className="relative group">
          <button className="text-red-500 hover:text-red-600">
            <TiUserDeleteOutline className="text-xl" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Deactivate
          </span>
        </div>
      )}

      {/* View Details Button */}
      {row.originalStatus !== "Active" && (
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
    <>
      <button
        className="ml-auto flex items-center font-medium hover:text-primary pr-1"
        onClick={() => setShowFilters((prev) => !prev)} // Toggle filter visibility
      >
        <IoFilter size={16} />
        <p className="mx-1">Filters</p>
      </button>

      {showFilters && (
        <Card>
          <div className="flex justify-between gap-4">
            <CustomInput
              placeholder="Filter by Full Name"
              id="fullName"
              name="fullName"
              type="text"
              value={filters.fullName}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Filter by Email"
              id="email"
              name="email"
              type="text"
              value={filters.email}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Filter by Date of Birth"
              id="dob"
              name="dob"
              type="date"
              value={filters.dob}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Filter by Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={filters.phoneNumber}
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
              <option value="active">Active</option>
              <option value="deactivated">Deactivated</option>
            </select>
          </div>
        </Card>
      )}

      <div className="flex justify-between items-center mt-5">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {filteredData.length} passengers
          </span>{" "}
          found
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setCreateModal(true);
            }}
            className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
          >
            <IoMdAdd className="mr-2 text-white text-base" />
            New Passengers
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

      {/* modal for update */}
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        className="w-[400px]"
      >
        <PassengerUpdateForm
          operator={selectedOperator}
          onClose={() => setShowModal(false)}
        />
      </Modal>

      {/* modal for create */}
      <Modal
        isVisible={showCreateModal}
        onClose={() => setCreateModal(false)}
        className="w-[400px]"
      >
        <PassengerCreateForm onClose={() => setCreateModal(false)} />
      </Modal>

      {/* modal for view details */}
      <Modal
        isVisible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      >
        <PassengerUpdateForm
          operator={selectedOperator}
          onClose={() => setShowDetailsModal(false)}
          isDeactivated={selectedOperator?.originalStatus === "Deactivated"}
        />
      </Modal>
    </>
  );
};

export default ManageUser;
