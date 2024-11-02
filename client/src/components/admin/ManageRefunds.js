import { transactions } from "../../components/constants/Dummy";
import Status from "../../components/admin/Status";
import ViewTransaction from "../../components/admin/modal/ViewTransactions";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const ManageRefunds = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  // Filter for only refund-related transactions
  const refundTransactions = transactions.filter(
    (transaction) =>
      transaction.status === "Request for Refund" ||
      transaction.status === "Processing Refund"
  );

  const columns = [
    "Transaction No",
    "Purchase At",
    "Purchase By",
    "Payment Type",
    "Amount Paid",
    "Status",
  ];
  const columnKeys = [
    "transactionNo",
    "purchaseAt",
    "purchaseBy",
    "paymentType",
    "amountPaid",
    "status",
  ];

  const enhancedData = refundTransactions.map((transaction) => ({
    ...transaction,
    originalStatus: transaction.status,
    status: <Status status={transaction.status} />,
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* view details button */}
      <div className="relative group">
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedOperator({
              ...row,
              originalStatus: row.originalStatus, // pass the original status from the row
            });
          }}
          className="text-grey-600 hover:text-grey-700"
        >
          <IoEye className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </span>
      </div>

      {/* cancel button */}
      <div className="relative group">
        <button className="text-red-600 hover:text-red-700">
          <MdCancel className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Cancel
        </span>
      </div>
    </div>
  );

  return (
    <div className="mt-3 mx-auto">
      <Table
        data={enhancedData}
        columns={columns}
        columnKeys={columnKeys}
        showActionColumn={true}
        actions={actionIcons}
      />

      {/* Modal for view details */}
      <Modal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedOperator(null);
        }}
        className="w-2/5"
      >
        {selectedOperator && (
          <ViewTransaction
            operator={selectedOperator}
            onClose={() => setShowModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageRefunds;
