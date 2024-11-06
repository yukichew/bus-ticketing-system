import React, { useState } from "react";
import Table from "../../components/common/Table";
import { Link } from "react-router-dom";
import { policyData } from "../../constants/Dummy";
import { IoMdAdd } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import PolicyCreateForm from "../../components/admin/modal/PolicyCreateForm";
import PolicyEditForm from "../../components/admin/modal/PolicyEditForm";

const ManagePolicy = () => {
  const columns = ["Policy Title", "Terms"];
  const columnKeys = ["policy_title", "terms"];
  const [showEditModal, setShowEditModal] = useState(false); // state for edit modal
  const [showCreateModal, setShowCreateModal] = useState(false); // state for create modal
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const enhancedData = policyData.map((item) => ({
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
      <div className="flex justify-end">
        {/* Add Policy button to open create modal */}
        <button
          onClick={() => setShowCreateModal(true)} // Update to open the create modal
          className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
        >
          <IoMdAdd className="mr-2 text-white text-base" />
          Add Policy
        </button>
        <div className="pl-2">
          <Link
            to="/policies" // Navigate to Policies User View
            className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
          >
            <FaExchangeAlt className="mr-2 text-white text-base" />
            Change to User View
          </Link>
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
