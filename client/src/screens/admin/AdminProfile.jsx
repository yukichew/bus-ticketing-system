import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Card from "../../components/common/Card";
import { getUserProfile } from "../../api/auth";

const AdminProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    userName: "",
    email: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setProfileInfo({
        userName: profile.userName,
        email: profile.email,
      });
    };
    fetchProfile();
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`flex-1 p-4 transition-all duration-300 mt-20 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="w-4/5 mt-2 mx-auto">
          <div className="flex items-center">
            <h2 className="font-poppins font-bold text-2xl">Admin Profile</h2>
          </div>
          <Card header="Personal Information" tooltip="Edit">
            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-poppins font-medium text-gray-700 pb-2"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1"
                  placeholder="Enter User Name"
                  value={profileInfo.userName}
                  disabled={!isEditingProfile}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-poppins font-medium text-gray-700 pb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1"
                  placeholder="Enter Email"
                  value={profileInfo.email}
                  disabled={!isEditingProfile}
                />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
