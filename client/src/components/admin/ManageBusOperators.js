import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";
import { busOperators } from "../../components/constants/Dummy";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import BoUpdateForm from "./modal/BOUpdateForm";
import BoCreateForm from "./modal/BOCreateForm";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";

const ManageBusOperators = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setCreateModal] = useState(false);
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
    "Status",
  ];

  const columnKeys = [
    "companyName",
    "companyEmail",
    "contactNumber",
    "address",
    "status",
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
              placeholder="Filter by Company Name"
              id="companyName"
              name="companyName"
              type="text"
              value={filters.companyName}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Filter by Company Email"
              id="companyEmail"
              name="companyEmail"
              type="text"
              value={filters.companyEmail}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Filter by Contact Number"
              id="contactNumber"
              name="contactNumber"
              type="text"
              value={filters.contactNumber}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Filter by Address"
              id="address"
              name="address"
              type="text"
              value={filters.address}
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
            {filteredData.length} bus operators
          </span>{" "}
          found
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => setCreateModal(true)}
            className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
          >
            <IoMdAdd className="mr-2 text-white text-base" />
            New Bus Operators
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

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <BoUpdateForm
          operator={selectedOperator}
          onClose={() => setShowModal(false)}
        />
      </Modal>

      <Modal isVisible={showCreateModal} onClose={() => setCreateModal(false)}>
        <BoCreateForm onClose={() => setCreateModal(false)} />
      </Modal>
    </>
  );
};

export default ManageBusOperators;
