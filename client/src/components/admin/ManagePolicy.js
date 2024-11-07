import React, { useState } from "react";
import Table from "../../components/common/Table";
import { useNavigate } from "react-router-dom";
import { policyData } from "../../constants/Dummy";
import { FaRegEdit, FaRegTrashAlt, FaExchangeAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import PolicyCreateForm from "../../components/admin/modal/PolicyCreateForm";
import PolicyEditForm from "../../components/admin/modal/PolicyEditForm";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";

const ManagePolicy = () => {
  const navigate = useNavigate();
  const columns = ["Policy Title", "Terms"];
  const columnKeys = ["policy_title", "terms"];
  const [showEditModal, setShowEditModal] = useState(false); // state for edit modal
  const [showCreateModal, setShowCreateModal] = useState(false); // state for create modal
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [filters, setFilters] = useState({
    policyTitle: "",
    terms: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = policyData
    .filter((item) => {
      const matchesPolicyTitle = filters.policyTitle
        ? item.policy_title
            .toLowerCase()
            .includes(filters.policyTitle.toLowerCase())
        : true;
      const matchesTerms = filters.terms
        ? item.terms.some((term) =>
            term.toLowerCase().includes(filters.terms.toLowerCase())
          )
        : true;
      const matchesStatus = filters.status
        ? item.status.toLowerCase() === filters.status.toLowerCase()
        : true;

      return matchesPolicyTitle && matchesTerms && matchesStatus;
    })
    .map((item) => ({
      ...item,
      terms: item.terms.join(", "),
      status: <Status status={item.status} />,
      originalStatus: item.status,
    }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* Edit button */}
      <div className="relative group">
        <button
          onClick={() => {
            setSelectedPolicy({
              ...row,
              originalStatus: row.originalStatus, // pass the original status from the row
            });
            setShowEditModal(true);
          }}
          className="text-green-500 hover:text-green-600"
        >
          <FaRegEdit className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Edit Policy
        </span>
      </div>
      <div className="h-4 w-px bg-gray-400"></div>

      {/* Delete Button */}
      <div className="relative group">
        <button className="text-grey-500 hover:text-grey-600">
          <FaRegTrashAlt className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Delete Policy
        </span>
      </div>
    </div>
  );

  return (
    <>
      {isFilterShow && (
        <div className="mb-8 mt-5">
          <Card>
            <div className="flex justify-between gap-4">
              {/* Filter by Policy Title */}
              <div className="w-1/3 pr-2">
                <label
                  htmlFor="policyTitle"
                  className="block text-md font-poppins font-medium text-gray-700 mb-2"
                >
                  Policy Title
                </label>
                <CustomInput
                  placeholder="Filter by Policy Title"
                  id="policyTitle"
                  name="policyTitle"
                  type="text"
                  value={filters.policyTitle}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Filter by Terms */}
              <div className="w-1/3 pr-2">
                <label
                  htmlFor="terms"
                  className="block text-md font-poppins font-medium text-gray-700 mb-2"
                >
                  Terms
                </label>
                <CustomInput
                  placeholder="Filter by Terms"
                  id="terms"
                  name="terms"
                  type="text"
                  value={filters.terms}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Dropdown for Status */}
              <div className="w-1/3 pr-2">
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
        </div>
      )}

      <div className="flex justify-between items-center mt-12 mb-4">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {filteredData.length} Policies
          </span>{" "}
          found
        </p>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowCreateModal(true)}
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
          >
            <IoIosAddCircleOutline size={16} />
            <p className="mx-1"> Add Policy</p>
          </button>

          <span className="text-gray-400 mx-2">|</span>

          <button
            onClick={() => navigate("/policies")}
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
          >
            <FaExchangeAlt size={16} />
            <p className="mx-1"> Change to User View</p>
          </button>

          <span className="text-gray-400 mx-2">|</span>

          <button
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
            onClick={() => setIsFilterShow((prev) => !prev)}
          >
            <IoFilter size={16} />
            <p className="mx-1">Filters</p>
          </button>
        </div>
      </div>

      <div className="mt-3 mx-auto">
        <Table
          data={filteredData}
          columns={columns}
          columnKeys={columnKeys}
          showActionColumn={true}
          actions={actionIcons}
        />
      </div>

      {/* modal for edit */}
      <Modal isVisible={showEditModal} onClose={() => setShowEditModal(false)}>
        <PolicyEditForm
          policy={selectedPolicy}
          onClose={() => setShowEditModal(false)}
        />
      </Modal>

      {/* modal for add policy */}
      <Modal
        isVisible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <PolicyCreateForm onClose={() => setShowCreateModal(false)} />
      </Modal>
    </>
  );
};

export default ManagePolicy;
