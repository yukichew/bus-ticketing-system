import React, { useState } from "react";
import Table from "../../components/common/Table";
import { Link } from "react-router-dom";
import { faqData } from "../../constants/Dummy";
import { IoMdAdd } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import FaqEditForm from "./modal/FaqEditForm";
import FaqCreateForm from "./modal/FaqCreateForm";

const ManageFaq = () => {
  const columns = ["Question", "Answer", "Category"];
  const columnKeys = ["question", "answer", "category"];
  const [showEditModal, setShowEditModal] = useState(false); // state for edit modal
  const [showCreateModal, setShowCreateModal] = useState(false); // state for create modal
  const [selectedOperator, setSelectedOperator] = useState(null);

  const enhancedData = faqData.map((item) => ({
    ...item,
    status: <Status status={item.status} />,
    originalStatus: item.status,
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* Edit button */}
      <div className="relative group">
        <button
          onClick={() => {
            setSelectedOperator({
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
          Edit Question
        </span>
      </div>
      <div className="h-4 w-px bg-gray-400"></div>

      {/* Delete Button */}
      <div className="relative group">
        <button className="text-grey-500 hover:text-grey-600">
          <FaRegTrashAlt className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Delete Question
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex justify-end">
        {/* Add Questions button to open create modal */}
        <button
          onClick={() => setShowCreateModal(true)} // Update to open the create modal
          className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
        >
          <IoMdAdd className="mr-2 text-white text-base" />
          Add Questions
        </button>
        <div className="pl-2">
          <Link
            to="/faq" // Navigate to FAQ User View
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
        <FaqEditForm
          operator={selectedOperator}
          onClose={() => setShowEditModal(false)}
        />
      </Modal>

      {/* modal for add question */}
      <Modal
        isVisible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <FaqCreateForm onClose={() => setShowCreateModal(false)} />
      </Modal>
    </>
  );
};

export default ManageFaq;
