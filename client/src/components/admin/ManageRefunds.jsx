import { transactions } from "../../constants/Dummy";
import Status from "../../components/admin/Status";
import ViewTransaction from "../../components/admin/modal/ViewTransactions";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
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
    refundReason: "",
    status: "",
  });

  const columns = [
    "Transaction No",
    "Purchase At",
    "Purchase By",
    "Payment Type",
    "Amount Paid",
    "Refund Reason",
  ];
  const columnKeys = [
    "transactionNo",
    "purchaseAt",
    "purchaseBy",
    "paymentType",
    "amountPaid",
    "refundReason",
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
          <FaRegEye className="text-lg text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </span>
      </div>

      <div className="h-4 w-px bg-gray-400"></div>

      {/* cancel button */}
      <div className="relative group">
        <button className="text-grey-500 hover:text-grey-600">
          <FaRegTrashAlt className="text-lg text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Cancel
        </span>
      </div>
    </div>
  );

  return (
    <>
      {showFilters && (
        <Card>
          {/* First Row */}
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/3 pr-2">
              <label
                htmlFor="Transaction No"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Transaction No
              </label>
              <CustomInput
                placeholder="Transaction No"
                id="transactionNo"
                name="transactionNo"
                type="text"
                value={filters.transactionNo}
                onChange={handleFilterChange}
              />
            </div>
            <div className="w-1/3 pr-2">
              <label
                htmlFor="Purchase At"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Purchase At
              </label>
              <CustomInput
                placeholder="Purchase At"
                id="purchaseAt"
                name="purchaseAt"
                type="date"
                value={filters.purchaseAt}
                onChange={handleFilterChange}
              />
            </div>
            <div className="w-1/3 pr-2">
              <label
                htmlFor="Purchase By"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Purchase By
              </label>
              <CustomInput
                placeholder="Purchase By"
                id="purchaseBy"
                name="purchaseBy"
                type="text"
                value={filters.purchaseBy}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex justify-between gap-4">
            <div className="w-1/3 pr-2">
              <label
                htmlFor="Payment Type"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Payment Type
              </label>
              <CustomInput
                placeholder="Payment Type"
                id="paymentType"
                name="paymentType"
                type="text"
                value={filters.paymentType}
                onChange={handleFilterChange}
              />
            </div>
            <div className="w-1/3 pr-2">
              <label
                htmlFor="Amount Paid"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Amount Paid (RM)
              </label>
              <CustomInput
                placeholder="Amount Paid"
                id="amountPaid"
                name="amountPaid"
                type="text"
                value={filters.amountPaid}
                onChange={handleFilterChange}
              />
            </div>
            <div className="w-1/3 pr-2">
              <label
                htmlFor="Refund Reason"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Refund Reason
              </label>
              <CustomInput
                placeholder="Refund Reason"
                id="refundReason"
                name="refundReason"
                type="text"
                value={filters.refundReason}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Status Dropdown (placed below for improved layout) */}
          <div className="w-full mt-4">
            <label
              htmlFor="Status"
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
              <option value="Request for Refund">Request for Refund</option>
              <option value="Processing Refund">Processing Refund</option>
            </select>
          </div>
        </Card>
      )}

      <div className="flex justify-between items-center mt-12 mb-4">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {filteredData.length} refund requests
          </span>{" "}
          found
        </p>
        <div className="flex justify-end items-center">
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
