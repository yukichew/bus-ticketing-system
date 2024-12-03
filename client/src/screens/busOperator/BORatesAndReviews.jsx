import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";
import Table from "../../components/common/Table";
import Card from "../../components/common/Card";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import { FaStar, FaLongArrowAltRight, FaExchangeAlt } from "react-icons/fa";
import Stars from "../../components/common/Stars";
import Review from "../../components/user/Review";
import {
  OneStarReviews,
  TwoStarsReviews,
  ThreeStarsReviews,
  FourStarsReviews,
  FiveStarsReviews,
} from "../../constants/Dummy";

const RatingBar = ({ rating, percentage }) => {
  return (
    <div className="flex items-center">
      <p className="text-sm text-gray-600 font-semibold w-8">{rating}</p>
      <FaStar size={18} className="fill-gray-600" />
      <div className="bg-gray-300 rounded w-full h-3 ml-3">
        <div
          className="h-full rounded bg-yellow-400"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 font-semibold ml-3 w-10">
        {percentage}%
      </p>
    </div>
  );
};

const BORatesAndReviews = () => {
  const [dateRange, setDateRange] = useState("January 2024 - Now");
  const [selectedReview, setSelectedReview] = useState("overview");
  const [isStartMonthOpen, setIsStartMonthOpen] = useState(false);
  const [selectedStartMonth, setSelectedStartMonth] =
    useState("Select Start Month");
  const [isEndMonthOpen, setIsEndMonthOpen] = useState(false);
  const [selectedEndMonth, setSelectedEndMonth] = useState("Select End Month");
  const [selectedStartYear, setSelectedStartYear] =
    useState("Select Start Year");
  const [isStartYearOpen, setIsStartYearOpen] = useState(false);
  const [selectedEndYear, setSelectedEndYear] = useState("Select End Year");
  const [isEndYearOpen, setIsEndYearOpen] = useState(false);
  const [isFilterShow, setIsFilterShow] = useState(false);

  // To detect admin state
  const location = useLocation();
  const navigate = useNavigate();
  const fromAdmin = location.state?.fromAdmin;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [2024, 2023, 2022, 2021, 2020];

  const handleReviewClick = (reviewType) => {
    setSelectedReview(reviewType);
  };

  const handleSelectStartMonth = (option) => {
    setSelectedStartMonth(option);
    setIsStartMonthOpen(false);
  };

  const handleSelectEndMonth = (option) => {
    setSelectedEndMonth(option);
    setIsEndMonthOpen(false);
  };

  const handleSelectStartYear = (year) => {
    setSelectedStartYear(year);
    setIsStartYearOpen(false);
  };

  const handleSelectEndYear = (year) => {
    setSelectedEndYear(year);
    setIsEndYearOpen(false);
  };

  const reviewTypes = [
    {
      type: "overview",
      label: "Overview",
      count:
        OneStarReviews.length +
        TwoStarsReviews.length +
        ThreeStarsReviews.length +
        FourStarsReviews.length +
        FiveStarsReviews.length,
    },
    { type: "five", label: "5 Stars", count: FiveStarsReviews.length },
    { type: "four", label: "4 Stars", count: FourStarsReviews.length },
    { type: "three", label: "3 Stars", count: ThreeStarsReviews.length },
    { type: "two", label: "2 Stars", count: TwoStarsReviews.length },
    { type: "one", label: "1 Star", count: OneStarReviews.length },
  ];

  return (
    <>
      <Navbar />

      <div className="w-4/5 mt-8 mb-8 mx-auto">
        <div className="mb-6">
          {/* Render "Return to Admin View" Button when path is "fromAdmin" */}
          {fromAdmin && (
            <button
              onClick={() => navigate("/manage-reviews")}
              className="ml-auto flex items-center font-medium hover:text-primary pr-1"
            >
              <FaExchangeAlt size={16} />
              <p className="mx-1"> Return to Admin View</p>
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-poppins font-bold text-2xl">Rates & Reviews</h2>
          <button
            className="flex items-center border-2 border-gray-100 text-black text-sm font-poppins font-medium rounded-lg px-4 py-2"
            onClick={() => setIsFilterShow((prev) => !prev)}
          >
            <IoFilter size={16} className="mr-2" />
            {dateRange}
          </button>
        </div>

        {isFilterShow && (
          <div className="mt-5 mb-7">
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div className="relative inline-block text-left w-1/2">
                  <label
                    htmlFor="startMonth"
                    className="block text-md font-poppins font-medium text-gray-700"
                  >
                    Start Month
                  </label>
                  <button
                    onClick={() => setIsStartMonthOpen(!isStartMonthOpen)}
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  >
                    {selectedStartMonth}
                    <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                  </button>

                  {isStartMonthOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                      <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {months.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectStartMonth(option)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="relative inline-block text-left w-1/4">
                  <label
                    htmlFor="startYear"
                    className="block text-md font-poppins font-medium text-gray-700"
                  >
                    Start Year
                  </label>
                  <button
                    onClick={() => setIsStartYearOpen(!isStartYearOpen)}
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  >
                    {selectedStartYear}
                    <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                  </button>

                  {isStartYearOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                      <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {years.map((year, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectStartYear(year)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          >
                            {year}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center w-auto mt-8">
                  <FaLongArrowAltRight className="text-xl text-gray-500" />
                </div>

                <div className="relative inline-block text-left w-1/2">
                  <label
                    htmlFor="endMonth"
                    className="block text-md font-poppins font-medium text-gray-700"
                  >
                    End Month
                  </label>
                  <button
                    onClick={() => setIsEndMonthOpen(!isEndMonthOpen)}
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  >
                    {selectedEndMonth}
                    <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                  </button>

                  {isEndMonthOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                      <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {months.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectEndMonth(option)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="relative inline-block text-left w-1/4">
                  <label
                    htmlFor="endYear"
                    className="block text-md font-poppins font-medium text-gray-700"
                  >
                    End Year
                  </label>
                  <button
                    onClick={() => setIsEndYearOpen(!isEndYearOpen)}
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  >
                    {selectedEndYear}
                    <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                  </button>

                  {isEndYearOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                      <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {years.map((year, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectEndYear(year)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          >
                            {year}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="mt-5 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/3 flex flex-col">
            <div className="w-full text-center md:text-left px-4 py-2">
              <p className="font-poppins font-medium text-lg text-gray-500 mb-1">
                Total Reviews
              </p>
              <div className="flex items-center justify-center md:justify-start">
                <p className="font-poppins font-semibold text-4xl text-primary">
                  3,856
                </p>
                <p className="font-poppins font-semibold text-sm text-primary mt-3 ml-1">
                  comments
                </p>
              </div>
            </div>

            <div className="w-full text-center md:text-left px-4 py-2">
              <p className="font-poppins font-medium text-lg text-gray-500 mb-1">
                Average Rating
              </p>
              <div className="flex items-center justify-center md:justify-start">
                <p className="font-poppins font-semibold text-4xl text-primary mr-3">
                  4.0
                </p>
                <Stars rating={4} />
              </div>
              <p className="font-poppins text-sm text-gray-400">
                Average rating on this year
              </p>
            </div>
          </div>

          <div className="hidden md:block border-l-4 border-gray-100 h-auto mx-4"></div>

          <div className="w-full md:w-2/3 h-auto px-4 py-2">
            <div>
              <p className="font-poppins font-medium text-lg text-gray-500 mb-4">
                Rating Summary
              </p>
              <div className="space-y-2">
                <RatingBar rating="5.0" percentage={66} />
                <RatingBar rating="4.0" percentage={33} />
                <RatingBar rating="3.0" percentage={16} />
                <RatingBar rating="2.0" percentage={8} />
                <RatingBar rating="1.0" percentage={0} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-6">Reviews</h2>

          <div className="mt-3 mb-4 flex space-x-3">
            {reviewTypes.map(({ type, label, count }) => (
              <button
                key={type}
                className={`relative px-5 py-2 font-poppins rounded-lg border ${
                  selectedReview === type
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 text-gray-400"
                } ${
                  selectedReview === type
                    ? ""
                    : "hover:border-2 hover:border-primary hover:text-primary hover:font-medium"
                }`}
                onClick={() => handleReviewClick(type)}
              >
                {label}
                {count > 0 && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div>
            {selectedReview === "five" &&
              FiveStarsReviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            {selectedReview === "four" &&
              FourStarsReviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            {selectedReview === "three" &&
              ThreeStarsReviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            {selectedReview === "two" &&
              TwoStarsReviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            {selectedReview === "one" &&
              OneStarReviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            {selectedReview === "overview" &&
              [
                ...OneStarReviews,
                ...TwoStarsReviews,
                ...ThreeStarsReviews,
                ...FourStarsReviews,
                ...FiveStarsReviews,
              ].map((review) => <Review key={review.id} review={review} />)}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BORatesAndReviews;
