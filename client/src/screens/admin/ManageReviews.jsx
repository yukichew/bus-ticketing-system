import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";
import { ratesAndReviews } from "../../constants/Dummy";
import Status from "../../components/admin/Status";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import Stars from "../../components/common/Stars";
import Modal from "../../components/common/Modal";
import ReviewForm from "../../components/admin/modal/ReviewForm";

const ManageReviews = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    busOperatorID: "",
    passengerID: "",
    comment: "",
    rates: "",
    date: "",
  });

  const initialFilters = {
    busOperatorID: "",
    passengerID: "",
    comment: "",
    rates: "",
    date: "",
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const columns = ["BO ID", "Passenger ID", "Comment", "Rates", "Date"];

  const columnKeys = [
    "busOperatorID",
    "passengerID",
    "comment",
    "rates",
    "date",
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const filteredData = ratesAndReviews
    .filter((review) =>
      Object.keys(filters).every((key) =>
        filters[key]
          ? String(review[key] || "")
              .toLowerCase()
              .includes(filters[key].toLowerCase())
          : true
      )
    )
    .filter((review) => review.status === "Pending for Review")
    .filter((review) => {
      if (filters.rates) {
        return String(review.rates) === filters.rates;
      }
      return true;
    });

  const enhancedData = filteredData.map((item) => ({
    ...item,
    rates: (
      <div className="flex justify-center items-center">
        <span className="text-gray-600 mr-3">{item.rates}</span>{" "}
        <Stars rating={item.rates} />
      </div>
    ),
    numericRates: item.rates,
    status: (
      <div className="flex justify-center">
        <Status status={item.status} />
      </div>
    ),
    originalStatus: item.status,
    date: (
      <div className="min-w-[90px] text-sm text-gray-700 truncate">
        {item.date}
      </div>
    ),
    originalDate: item.date,
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      <div className="relative group">
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedOperator({
              ...row,
              originalStatus: row.originalStatus,
              rates: row.numericRates,
              date: row.originalDate,
            });
          }}
          className="text-green-500 hover:text-green-600"
        >
          <MdOutlineRateReview className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Review
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
            <h2 className="font-poppins font-bold text-2xl pb-2">
              Reported Reviews
            </h2>
          </div>

          {/* filter input */}
          {showFilters && (
            <Card>
              {/* First Row */}
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/3">
                  <label
                    htmlFor="busOperatorID"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Bus Operator ID
                  </label>
                  <CustomInput
                    placeholder="Bus Operator ID"
                    id="busOperatorID"
                    name="busOperatorID"
                    type="text"
                    value={filters.busOperatorID}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="passengerID"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Passenger ID
                  </label>
                  <CustomInput
                    placeholder="Passenger ID"
                    id="passengerID"
                    name="passengerID"
                    type="text"
                    value={filters.passengerID}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="date"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Date
                  </label>
                  <CustomInput
                    placeholder="Date"
                    id="date"
                    name="date"
                    type="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/2">
                  <label
                    htmlFor="rates"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Rates
                  </label>
                  <select
                    id="rates"
                    name="rates"
                    value={filters.rates}
                    onChange={handleFilterChange}
                    className="w-full h-12 px-4 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm"
                  >
                    <option value="">All Ratings</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="comment"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Comment
                  </label>
                  <CustomInput
                    placeholder="Comment"
                    id="comment"
                    name="comment"
                    type="text"
                    value={filters.comment}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="mt-4">
                <CustomButton
                  title="Clear Filters"
                  onClick={clearFilters}
                  className="w-full h-12 text-white bg-primary rounded-md hover:bg-primary-dark"
                />
              </div>
            </Card>
          )}

          <div className="flex justify-between items-center mt-12 mb-4">
            <p className="text-gray-500">
              <span className="font-semibold text-secondary">
                {filteredData.length} reported reviews
              </span>{" "}
              found
            </p>
            <div className="flex justify-end items-center">
              <button
                onClick={() =>
                  navigate("/bo/rates-and-reviews", {
                    state: { fromAdmin: true },
                  })
                }
                className="ml-auto flex items-center font-medium hover:text-primary pr-1"
              >
                <FaExchangeAlt size={16} />
                <p className="mx-1"> View All Rates and Reviews</p>
              </button>

              <span className="text-gray-400 mx-2">|</span>

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
          </div>

          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <ReviewForm
              operator={selectedOperator}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageReviews;
