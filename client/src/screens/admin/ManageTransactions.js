import { transactions } from "../../components/constants/Dummy";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import RefundForm from "../../components/admin/modal/RefundForm";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import React, { useState } from "react";
import { RiRefund2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { IoEye } from "react-icons/io5";

const ManageTransactions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const columns = [
    "Transaction No",
    "Purchase At",
    "Purchase By",
    "Payment Type",
    "Amount Paid",
  ];
  const columnKeys = [
    "transactionNo",
    "purchaseAt",
    "purchaseBy",
    "paymentType",
    "amountPaid",
  ];

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* refund Button */}
      <div className="relative group">
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedOperator(row);
          }}
          className="text-lime-500 hover:text-lime-700"
        >
          <RiRefund2Line className="text-2xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Refund
        </span>
      </div>

      {/* cancellation button */}
      <div className="relative group">
        <button className="text-red-500 hover:text-red-700">
          <MdCancel className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Cancel
        </span>
      </div>

      {/* View Button */}
      <div className="relative group">
        <button className="text-grey-200 hover:text-grey-600">
          <IoEye className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </span>
      </div>
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
              Transactions Management
            </h2>
          </div>
          <div className="mt-3 mx-auto">
            <Table
              data={transactions}
              columns={columns}
              columnKeys={columnKeys}
              showActionColumn={true}
              actions={actionIcons}
            />
          </div>

          {/* modal for refund form */}
          <Modal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            className="w-2/4"
          >
            <RefundForm
              operator={selectedOperator}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageTransactions;
