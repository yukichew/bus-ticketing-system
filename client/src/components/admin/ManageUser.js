import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
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
      {/* Show View Details if status is "Deactivated" */}
      {row.originalStatus === "Deactivated" && (
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

      {/* Show Update and Deactivate if status is NOT "Deactivated" */}
      {row.originalStatus !== "Deactivated" && (
        <>
          <div className="relative group">
            <button
              onClick={() => {
                setSelectedOperator(row);
                setShowModal(true);
              }}
              className="text-green-500 hover:text-green-600"
            >
              <FaRegEdit className="text-lg text-gray-500 cursor-pointer" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Update
            </span>
          </div>

          <div className="h-4 w-px bg-gray-400"></div>

          <div className="relative group">
            <button className="text-red-500 hover:text-red-600">
              <TiUserDeleteOutline className="text-lg text-gray-500 cursor-pointer" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Deactivate
            </span>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {showFilters && (
        <Card>
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="fullName"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <CustomInput
                placeholder="Filter by Full Name"
                id="fullName"
                name="fullName"
                type="text"
                value={filters.fullName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <CustomInput
                placeholder="Filter by Email"
                id="email"
                name="email"
                type="text"
                value={filters.email}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div className="w-1/3">
              <label
                htmlFor="dob"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Date of Birth
              </label>
              <CustomInput
                placeholder="Filter by Date of Birth"
                id="dob"
                name="dob"
                type="date"
                value={filters.dob}
                onChange={handleFilterChange}
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="phoneNumber"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <CustomInput
                placeholder="Filter by Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={filters.phoneNumber}
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
                <option value="active">Active</option>
                <option value="deactivated">Deactivated</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between items-center mt-12 mb-4">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {filteredData.length} users
          </span>{" "}
          found
        </p>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setCreateModal(true)}
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
          >
            <IoIosAddCircleOutline size={16} />
            <p className="mx-1"> New Passenger</p>
          </button>

          <span className="text-gray-400 mx-2">|</span>

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
