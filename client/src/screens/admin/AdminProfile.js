import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Card from "../../components/common/Card";
import CustomButton from "../../components/common/CustomButton";
import { CiEdit } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";

const AdminProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [profileImage, setProfileImage] = useState(
    "https://www.nookit.in/cdn/shop/products/POA4-325.webp?v=1704085792&width=1946" // Default profile image
  );

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditingProfile(true);
  };

  const handleSave = () => {
    setIsEditingProfile(false);
  };

  const [profileInfo, setProfileInfo] = useState({
    fullname: "Jezlyn",
    email: "admin@ridengo.com",
    contactno: "012-345-6789",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Update the profile image with the uploaded file
      };
      reader.readAsDataURL(file);
    }
    setIsModalOpen(false); // Close the modal after uploading the image
  };

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
        <div className="w-4/5 mt-8 mx-auto">
          <div className="flex items-center">
            <h2 className="font-poppins font-bold text-2xl">Profile</h2>
          </div>
          <Card
            header="Personal Information"
            Icon={CiEdit}
            tooltip="Edit"
            onClick={handleEdit}
          >
            <div className="flex flex-col space-y-4">
              {/* Profile photo upload */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-32 h-32 mb-4 group">
                  {" "}
                  {/* Add the `group` class here */}
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full group-hover:bg-gray-500 group-hover:opacity-70 transition duration-300" // This will now apply on hover
                  />
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full z-20 transform translate-x-[-1] translate-y-1"
                  >
                    <FaCamera className="text-xl" />
                  </button>
                </div>
              </div>
              {/* Modal for uploading profile image */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg w-96">
                    <h3 className="text-lg font-semibold mb-4 font-poppins text-primary">
                      Upload New Profile Picture
                    </h3>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mb-4 w-full border p-2 rounded font-poppins"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsModalOpen(false)} // Close modal without changes
                        className="bg-primary hover:bg-secondary w-full h-12 transition duration-200 rounded-lg shadow-md font-medium font-poppins text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-poppins font-medium text-gray-700 pb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1"
                  placeholder="Enter Full Name"
                  value={profileInfo.fullname}
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
              <div>
                <label
                  htmlFor="contactno"
                  className="block text-sm font-poppins font-medium text-gray-700 pb-2"
                >
                  Contact No.
                </label>
                <input
                  type="text"
                  id="contactno"
                  className="w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1"
                  placeholder="Enter Contact Number"
                  value={profileInfo.contactno}
                  disabled={!isEditingProfile}
                />
              </div>
              {isEditingProfile && (
                <div className="flex justify-between">
                  <CustomButton
                    title={"Save"}
                    className={"w-40 mt-5"}
                    onClick={() => handleSave()}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
