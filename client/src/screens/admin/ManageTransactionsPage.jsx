import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Status from "../../components/admin/Status";
import ViewTransaction from "../../components/admin/modal/ViewTransactions";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { getTransactionsDetails } from "../../api/transaction";

const ManageTransactionsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    transactionID: "",
    amount: "",
    createdAt: "",
    status: "",
  });

  const initialFilters = {
    transactionID: "",
    amount: "",
    createdAt: "",
    status: "",
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { transactions } = await getTransactionsDetails();
        console.log(transactions);
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const shortenTransactionID = (id) => {
    if (!id) return "";
    return `${id.slice(0, 8)}`;
  };

  const applyFilters = () => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return [];
    }

    return transactions.filter((item) =>
      Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        if (!filterValue) return true;

        const itemValue = item[key];
        if (key === "status") {
          return itemValue?.toLowerCase() === filterValue?.toLowerCase();
        }

        return itemValue
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    );
  };

  const filteredTransactions = applyFilters();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const enhancedData = filteredTransactions.map((transaction) => ({
    ...transaction,
    originalStatus: transaction.status,
    transactionID: shortenTransactionID(transaction.transactionID),
    status: <Status status={transaction.status} />,
  }));

  const columns = ["Transaction ID", "Amount Paid (RM)", "Created At"];
  const columnKeys = ["transactionID", "amount", "createdAt"];

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      <div className="relative group">
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedOperator({
              ...row,
              originalStatus: row.originalStatus,
            });
          }}
          className="text-grey-200 hover:text-grey-600"
        >
          <FaRegEye className="text-lg text-gray-500 cursor-pointer" />
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
        className={`flex-1 p-4 transition-all duration-300 mt-16 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="w-4/5 mt-8 mx-auto">
          <div className="flex items-center">
            <h2 className="font-poppins font-bold text-2xl">
              Transactions Management
            </h2>
          </div>

          {showFilters && (
            <Card>
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="transactionID"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Transaction ID
                  </label>
                  <CustomInput
                    placeholder="Filter by Transaction ID"
                    id="transactionID"
                    name="transactionID"
                    type="text"
                    value={filters.transactionID}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="amount"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Amount (RM)
                  </label>
                  <CustomInput
                    placeholder="Amount (RM)"
                    id="amount"
                    name="amount"
                    type="text"
                    value={filters.amount}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="createdAt"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Created At
                  </label>
                  <CustomInput
                    placeholder="Filter by Created At"
                    id="createdAt"
                    name="createdAt"
                    type="datetime-local"
                    value={filters.createdAt}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/2 pr-2">
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
                    <option value="succeeded">Succeeded</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <CustomButton title="Clear Filters" onClick={clearFilters} />
              </div>
            </Card>
          )}

          <div className="flex justify-between items-center mt-12 mb-4">
            <p className="text-gray-500">
              <span className="font-semibold text-secondary">
                {filteredTransactions.length} transactions
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

            <Modal
              isVisible={showModal}
              onClose={() => {
                setShowModal(false);
                setSelectedOperator(null);
              }}
            >
              {selectedOperator && (
                <ViewTransaction
                  operator={selectedOperator}
                  onClose={() => setShowModal(false)}
                />
              )}
            </Modal>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageTransactionsPage;
