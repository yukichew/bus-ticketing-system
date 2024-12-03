import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  transactions,
  busRoutes,
  applications,
  ratesAndReviews,
} from "../../constants/Dummy";
import { IoMenu } from "react-icons/io5";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaBusAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Avatar, Badge, WindmillContext } from "@windmill/react-ui";

const AdminHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const { mode } = useContext(WindmillContext);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [refundRequestCount, setRefundRequestCount] = useState(0);
  const [busOperatorApplicationCount, setbusOperatorApplicationCount] =
    useState(0);
  const [busRoutesApplicationCount, setbusRoutesApplicationCount] = useState(0);
  const [reportedReviewsCount, setReportedReviewsCount] = useState(0);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate total refund requests (both "Request for Refund" and "Processing Refund")
    const totalRefundRequests = transactions.filter(
      (transaction) =>
        transaction.status === "Request for Refund" ||
        transaction.status === "Processing Refund"
    ).length;
    setRefundRequestCount(totalRefundRequests);
  }, []);

  useEffect(() => {
    const totalBusOperatorApplication = applications.filter(
      (applications) => applications.status === "Pending"
    ).length;
    setbusOperatorApplicationCount(totalBusOperatorApplication);
  }, []);

  useEffect(() => {
    const totalBusRoutesApplicationCount = busRoutes.filter(
      (busRoutes) => busRoutes.status === "Pending"
    ).length;
    setbusRoutesApplicationCount(totalBusRoutesApplicationCount);
  }, []);

  useEffect(() => {
    const totalReportedReviewsCount = ratesAndReviews.filter(
      (ratesAndReviews) => ratesAndReviews.status === "Pending for Review"
    ).length;
    setReportedReviewsCount(totalReportedReviewsCount);
  }, []);

  // Calculate total notifications
  const totalNotifications =
    refundRequestCount +
    busOperatorApplicationCount +
    busRoutesApplicationCount +
    reportedReviewsCount;

  const handleNotificationsClick = () => {
    setIsNotificationsMenuOpen((prev) => !prev);
    setIsProfileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
    setIsNotificationsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 py-4 bg-white shadow-lg">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-full">
          <div className="flex items-center gap-6">
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-2 font-bold text-primary"
            >
              <FaBusAlt className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">RideNGo</span>
            </Link>
            <div className="px-20">
              <button
                onClick={toggleSidebar}
                aria-label="Menu"
                className="p-2 rounded-full bg-[#f0f5ff] text-gray-800 transition-colors duration-300 hover:text-primary"
              >
                {isSidebarOpen ? (
                  <RiMenuUnfoldFill size={20} />
                ) : (
                  <IoMenu size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Notifications and Profile */}
          <ul className="flex items-center space-x-6">
            <li className="relative" ref={notificationsRef}>
              <button
                className="p-2 rounded-full bg-[#f0f5ff] text-gray-800 transition-colors duration-300 hover:text-primary"
                onClick={handleNotificationsClick}
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <IoMdNotificationsOutline
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              </button>
              {totalNotifications > 0 && (
                <span className="absolute top-[-8px] right-[-8px] h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                  {totalNotifications}
                </span>
              )}
              {isNotificationsMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-auto bg-white border border-gray-300 rounded shadow-lg">
                  <div className="p-2 text-gray-700 w-max">
                    <h5 className="font-bold pl-[1rem] pb-[0.4rem]">
                      Notifications
                    </h5>

                    {/* Refunds Request */}
                    <DropdownItem className="justify-between">
                      <Link
                        to="/manage-transactions"
                        state={{ section: "Refunds Request" }}
                        className="flex justify-between w-full"
                      >
                        <span>Refunds Request</span>
                        <span className="ml-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                          {refundRequestCount}{" "}
                          {/* Display total refunds request */}
                        </span>
                      </Link>
                    </DropdownItem>

                    {/* Bus Operator Applications */}
                    <DropdownItem
                      onClick={() => navigate("/manage-applications")}
                      className="justify-between"
                    >
                      <span>Bus Operator Applications</span>
                      <span className="ml-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        {busOperatorApplicationCount}{" "}
                        {/* Display total bus operator applications */}
                      </span>
                    </DropdownItem>

                    {/* Bus Routes Applications */}
                    <DropdownItem
                      onClick={() => navigate("/manage-bus-routes")}
                      className="justify-between"
                    >
                      <span>Bus Routes Application</span>
                      <span className="ml-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        {busRoutesApplicationCount}{" "}
                        {/* Display total bus routes applications */}
                      </span>
                    </DropdownItem>

                    {/* Reported Reviews */}
                    <DropdownItem
                      onClick={() => navigate("/manage-reviews")}
                      className="justify-between"
                    >
                      <span>Reported Reviews</span>
                      <span className="ml-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        {reportedReviewsCount}{" "}
                        {/* Display total reported reviews */}
                      </span>
                    </DropdownItem>
                  </div>
                </div>
              )}
            </li>

            <li className="relative" ref={profileRef}>
              <button
                className="flex items-center rounded-lg p-2 transition-colors duration-300 hover:bg-[#f0f5ff] hover:text-primary"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
              >
                <Avatar
                  className="w-8 h-8"
                  src="https://www.nookit.in/cdn/shop/products/POA4-325.webp?v=1704085792&width=1946"
                  alt=""
                  aria-hidden="true"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="p-2 text-gray-700">
                    <Link to="/admin-profile">
                      <DropdownItem>
                        <CgProfile
                          className="w-4 h-4 mr-3"
                          aria-hidden="true"
                        />
                        <span>Profile</span>
                      </DropdownItem>
                    </Link>
                    <DropdownItem onClick={() => alert("Log out!")}>
                      <MdOutlineLogout
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                      />
                      <span>Log out</span>
                    </DropdownItem>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

const DropdownItem = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="flex items-center px-4 py-2 hover:bg-[#f0f5ff] cursor-pointer"
    >
      {children}
    </div>
  );
};

export default AdminHeader;
