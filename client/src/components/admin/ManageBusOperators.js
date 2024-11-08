import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { busOperators } from "../../constants/Dummy";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import BoUpdateForm from "./modal/BOUpdateForm";
import BoCreateForm from "./modal/BOCreateForm";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";

const ManageBusOperators = () => {
  const [showModal, setShowModal] = useState(false); // state for update modal
  const [showCreateModal, setCreateModal] = useState(false); // state for create modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // state for details modal
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [filters, setFilters] = useState({
    companyName: "",
    companyEmail: "",
    contactNumber: "",
    address: "",
    status: "",
  });

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

  const filteredData = busOperators.filter((operator) =>
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
            {filteredData.length} bus operators
          </span>{" "}
          found
        </p>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setCreateModal(true)}
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
          >
            <IoIosAddCircleOutline size={16} />
            <p className="mx-1"> New Bus Operator</p>
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
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <BoUpdateForm
          operator={selectedOperator}
          onClose={() => setShowModal(false)}
        />
      </Modal>

      {/* modal for create  */}
      <Modal isVisible={showCreateModal} onClose={() => setCreateModal(false)}>
        <BoCreateForm onClose={() => setCreateModal(false)} />
      </Modal>

      {/* modal for view details */}
      <Modal
        isVisible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      >
        <BoUpdateForm
          operator={selectedOperator}
          onClose={() => setShowDetailsModal(false)}
          isDeactivated={selectedOperator?.originalStatus === "Deactivated"}
        />
      </Modal>
    </>
  );
};

export default ManageBusOperators;