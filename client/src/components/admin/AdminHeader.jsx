import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaBusAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { WindmillContext } from "@windmill/react-ui";
import { fetchTotalBusOperators } from "../../api/busOperator";
import { getUserProfile, logout } from "../../api/auth";
import { fetchPendingReviewCount } from "../../api/rating";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/AuthContext";

const AdminHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { mode } = useContext(WindmillContext);
  const { auth, setAuth } = useAuth();
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [busOperatorApplicationCount, setbusOperatorApplicationCount] =
    useState(0);
  const [reportedReviewsCount, setReportedReviewsCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth) {
        const profile = await getUserProfile(auth.token);
        setProfile(profile);
      }
    };
    fetchProfile();
  }, [auth]);

  const handleLogout = async () => {
    const result = await logout();

    if (result?.error) {
      toast.error(result.message);
    } else {
      toast.success("You are logged out!");
      setAuth(null);
      navigate("/");
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchBusOperatorsCounts = async () => {
      try {
        const pendingCount = await fetchTotalBusOperators("Pending");
        setbusOperatorApplicationCount(pendingCount);
      } catch (err) {
        console.error("Error fetching bus operators counts:", err);
      }
    };
    
    fetchBusOperatorsCounts();
  }, []);

  useEffect(() => {
    const fetchReportedReviewCount = async () => {
      try {
        const pendingReviewCount = await fetchPendingReviewCount();
        setReportedReviewsCount(pendingReviewCount);
      } catch (error) {
        console.error("Error fetching pending review count:", error);
      }
    };

    fetchReportedReviewCount();
  }, []);

  const totalNotifications = busOperatorApplicationCount + reportedReviewsCount;

  const handleNotificationsClick = () => {
    setIsNotificationsMenuOpen((prev) => !prev);
    setDropdownVisible(false);
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
        setDropdownVisible(false);
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

          <ul className="flex items-center space-x-6">
            {/* Notification Dropdown */}
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

                    <DropdownItem
                      onClick={() => navigate("/manage-applications")}
                      className="justify-between"
                    >
                      <span>Bus Operator Applications</span>
                      <span className="ml-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        {busOperatorApplicationCount}{" "}
                      </span>
                    </DropdownItem>

                    <DropdownItem
                      onClick={() => navigate("/manage-reviews")}
                      className="justify-between"
                    >
                      <span>Reported Reviews</span>
                      <span className="ml-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        {reportedReviewsCount}{" "}
                      </span>
                    </DropdownItem>
                  </div>
                </div>
              )}
            </li>

            {/* Profile Dropdown */}
            <li className="relative" ref={profileRef}>
              <div className="hidden lg:flex">
                {auth ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                      className="text-slate-600 hover:text-primary transition duration-200 font-medium"
                    >
                      {profile?.userName}
                    </button>

                    {dropdownVisible && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                        <Link
                          to="/admin-profile"
                          className="block px-4 py-2 text-slate-600 hover:text-primary"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-slate-600 hover:text-primary"
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={navigateToLogin}
                    className="text-secondary font-semibold hover:text-primary transition duration-200 underline-offset-2"
                  >
                    Login
                  </button>
                )}
              </div>
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
