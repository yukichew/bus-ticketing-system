import React, { useState, useContext, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaBusAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineCog } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Avatar, Badge, WindmillContext } from "@windmill/react-ui";

const AdminHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const { mode } = useContext(WindmillContext);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

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
              {isNotificationsMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="p-2 text-gray-700">
                    <h5 className="font-bold">Notifications</h5>
                    <DropdownItem className="justify-between">
                      <span>Messages</span>
                      <Badge type="danger">13</Badge>
                    </DropdownItem>
                    <DropdownItem className="justify-between">
                      <span>Sales</span>
                      <Badge type="danger">2</Badge>
                    </DropdownItem>
                    <DropdownItem onClick={() => alert("Alerts!")}>
                      <span>Alerts</span>
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
                    <DropdownItem tag="a" href="#">
                      <CgProfile className="w-4 h-4 mr-3" aria-hidden="true" />
                      <span>Profile</span>
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                      <HiOutlineCog
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                      />
                      <span>Settings</span>
                    </DropdownItem>
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
