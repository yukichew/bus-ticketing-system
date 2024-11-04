import { transactions } from "../../components/constants/Dummy";
import Status from "../../components/admin/Status";
import ViewTransaction from "../../components/admin/modal/ViewTransactions";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";

const ManageRefunds = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    transactionNo: "",
    purchaseAt: "",
    purchaseBy: "",
    paymentType: "",
    amountPaid: "",
    status: "",
  });

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = transactions
    .filter((operator) =>
      // Only apply filters with non-empty values
      Object.keys(filters).every((key) =>
        filters[key]
          ? String(operator[key] || "")
              .toLowerCase()
              .includes(filters[key].toLowerCase())
          : true
      )
    )
    .filter(
      (transaction) =>
        transaction.status === "Request for Refund" ||
        transaction.status === "Processing Refund"
    );

  const enhancedData = filteredData.map((transaction) => ({
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
              placeholder="Transaction No"
              id="transactionNo"
              name="transactionNo"
              type="text"
              value={filters.transactionNo}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Filter by Purchase at"
              id="purchaseAt"
              name="purchaseAt"
              type="date"
              value={filters.purchaseAt}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Purchase By"
              id="purchaseBy"
              name="purchaseBy"
              type="text"
              value={filters.purchaseBy}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Payment Type"
              id="paymentType"
              name="paymentType"
              type="text"
              value={filters.paymentType}
              onChange={handleFilterChange}
            />
            <CustomInput
              placeholder="Amount Paid"
              id="amountPaid"
              name="amountPaid"
              type="text"
              value={filters.amountPaid}
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
              <option value="Request for Refund">Request for Refund</option>
              <option value="Processing Refund">Processing Refund</option>
            </select>
          </div>
        </Card>
      )}

      <div className="flex justify-between items-center mt-5">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {filteredData.length} refund requests
          </span>{" "}
          found
        </p>
      </div>

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
    </>
  );
};

export default ManageRefunds;
