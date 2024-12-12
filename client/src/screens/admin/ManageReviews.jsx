import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import Status from "../../components/admin/Status";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import Stars from "../../components/common/Stars";
import Modal from "../../components/common/Modal";
import RatingSummary from "../../components/user/RatingSummary";
import Review from "../../components/user/Review";
import ReviewForm from "../../components/admin/modal/ReviewForm";
import { getAllRatings } from "../../api/rating";
import Tabs from "../../components/common/Tabs";

const mapRatesAndReviewsData = (ratesAndReviews) => {
  return ratesAndReviews.map((item) => ({
    reviewID: item.id,
    comment: item.comment,
    rate: item.rate,
    postedAt: new Date(item.postedAt).toLocaleString("en-GB"),
    postedBy: item.postedById,
    status: item.status,
    busPlate: item.booking.busSchedule.busInfo.busPlate,
    busType: item.booking.busSchedule.busInfo.busType.types,
    busOperator: item.booking.busSchedule.postedBy.userName,
    busOperatorId: item.booking.busSchedule.postedBy.id,
    boardingLocation: item.booking.busSchedule.routes.boardingLocation.name,
    arrivalLocation: item.booking.busSchedule.routes.arrivalLocation.name,
    busImages: item.booking.busSchedule.busInfo.busImages,
  }));
};

const ManageReviews = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [ratesAndReviews, setRatesAndReviews] = useState([]);
  const [filters, setFilters] = useState({
    busOperatorID: "",
    passengerID: "",
    comment: "",
    rate: "",
    postedAt: "",
  });

  const initialFilters = {
    busOperatorID: "",
    passengerID: "",
    comment: "",
    rate: "",
    postedAt: "",
  };

  const mappedReviews = ratesAndReviews.map((review) => {
    return {
      ...review,
      postedById: review.postedBy,
      rateStars: <Stars rating={review.rate} />,
      formattedDate: new Date(review.postedAt).toLocaleDateString(),
    };
  });

  useEffect(() => {
    const fetchRatesAndReviews = async () => {
      try {
        const { ratesAndReviews } = await getAllRatings();
        const mappedData = mapRatesAndReviewsData(ratesAndReviews);
        setRatesAndReviews(mappedData);
      } catch (error) {
        console.error("Error fetching rates and reviews:", error);
      }
    };

    fetchRatesAndReviews();
  }, []);

  useEffect(() => {
    const fetchSpecificDetails = async () => {
      try {
        const response = await getSpecificRatingDetails();
        if (response?.error) {
          console.error("API error: ", response.message);
        } else {
          setReviews(response);
        }
      } catch (error) {
        console.error("Unexpected error occurred: ", error);
      }
    };

    fetchSpecificDetails();
  }, []);

  const applyFilters = () => {
    return ratesAndReviews.filter((item) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "status") {
          return item.status?.toLowerCase() === filters[key]?.toLowerCase();
        }
        if (key === "postedAt") {
          const filterDate = new Date(filters[key]);
          const itemDate = new Date(
            item.postedAt.split(",")[0].split("/").reverse().join("-") +
              "T" +
              item.postedAt.split(",")[1].trim()
          );

          return (
            itemDate.toLocaleDateString() === filterDate.toLocaleDateString()
          );
        }

        if (key === "rate") {
          const filterRate = Number(filters.rate);
          return item.rate === filterRate;
        }
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      })
    );
  };

  const filteredRatesAndReviews = applyFilters();

  const enhancedData = filteredRatesAndReviews.map((item) => ({
    ...item,
    rates: (
      <div className="flex justify-center items-center">
        <span className="text-gray-600 mr-3">{item.rate}</span>{" "}
        <Stars rating={item.rate} />
      </div>
    ),
    numericRates: item.rate,
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

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const columns = ["Review ID", "Comment", "Rate", "Posted At", "Posted By"];

  const columnKeys = ["reviewID", "comment", "rate", "postedAt", "postedBy"];

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

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {(row.originalStatus === "Active" ||
        row.originalStatus === "Inactive") && (
        <div className="relative group">
          <button
            onClick={() => {
              setShowModal(true);
              setSelectedOperator({
                ...row,
                originalStatus: row.originalStatus,
                rates: row.numericRates,
                date: row.originalDate,
                postedBy: row.postedById,
              });
            }}
            className="text-green-500 hover:text-green-600"
          >
            <FaRegEye className="text-xl text-gray-500 cursor-pointer" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </span>
        </div>
      )}

      {row.originalStatus === "Pending for Review" && (
        <div className="relative group">
          <button
            onClick={() => {
              setShowModal(true);
              setSelectedOperator({
                ...row,
                originalStatus: row.originalStatus,
                rates: row.numericRates,
                date: row.originalDate,
                postedBy: row.postedById,
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
      )}
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
              Rates and Reviews Management
            </h2>
          </div>

          {showFilters && (
            <Card>
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/3">
                  <label
                    htmlFor="reviewID"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Review ID
                  </label>
                  <CustomInput
                    placeholder="Filter by Review ID"
                    id="reviewID"
                    name="reviewID"
                    type="text"
                    value={filters.reviewID}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="comment"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Comment
                  </label>
                  <CustomInput
                    placeholder="Filter by Comment"
                    id="comment"
                    name="comment"
                    type="text"
                    value={filters.comment}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="postedAt"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Posted At
                  </label>
                  <CustomInput
                    placeholder="Posted At"
                    id="postedAt"
                    name="postedAt"
                    type="datetime-local"
                    value={filters.postedAt}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/2">
                  <label
                    htmlFor="rate"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Rate
                  </label>
                  <select
                    id="rate"
                    name="rate"
                    value={filters.rate}
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
                    <option value="inactive">Inactive</option>
                    <option value="pending for review">
                      Pending for Review
                    </option>
                  </select>
                </div>
              </div>

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
                {filteredRatesAndReviews.length} rates & reviews
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
          </div>

          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <Tabs
              tabs={[
                {
                  label: "Ratings & Reviews",
                  content: (
                    <div className="w-[400px]">
                      <RatingSummary reviews={mappedReviews} />
                      {mappedReviews.length > 0 &&
                        mappedReviews.map((review) => (
                          <div>
                            <h2 className="text-lg font-semibold mt-5">
                              Reviews
                            </h2>
                            <Review key={review.id} review={review} />
                          </div>
                        ))}
                    </div>
                  ),
                },
                {
                  label: "Reviewed To",
                  content: (
                    <ReviewForm
                      operator={selectedOperator}
                      onClose={() => setShowModal(false)}
                    />
                  ),
                },
              ]}
              orientation="vertical"
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageReviews;
