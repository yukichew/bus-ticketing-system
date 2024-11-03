import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { busOperators } from "../../components/constants/Dummy";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import BoUpdateForm from "./modal/BOUpdateForm";
import BoCreateForm from "./modal/BOCreateForm";

const ManageBusOperators = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setCreateModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

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

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* Update Button */}
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

      {/* Deactivate Button */}
      <div className="relative group">
        <button className="text-red-500 hover:text-red-600">
          <TiUserDeleteOutline className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Deactivate
        </span>
      </div>
    </div>
  );

  const enhancedData = busOperators.map((item) => ({
    ...item,
    status: <Status status={item.status} />,
  }));

  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {busOperators.length} bus operators{" "}
          </span>
          created
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setCreateModal(true);
            }}
            className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
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

      {/* modal for update */}
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        className="w-[400px]"
      >
        <BoUpdateForm
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
        <BoCreateForm onClose={() => setCreateModal(false)} />
      </Modal>
    </>
  );
};

export default ManageBusOperators;
