import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { IoFilter } from "react-icons/io5";
import Modal from "../../components/common/Modal";
import ApplicationForm from "../../components/admin/modal/ViewApplication";
import Status from "../../components/admin/Status";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { getAllPendingBo } from "../../api/auth";

const ManageApplicationPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });

  const initialFilters = {
    userName: "",
    email: "",
    phoneNumber: "",
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getAllPendingBo();
        setApplications(response || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchApplications();
  }, []);

  const applyFilters = () => {
    return applications.filter((item) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "status") {
          console.log(`Checking status: ${item.status} === ${filters[key]}`);
          return item.status?.toLowerCase() === filters[key]?.toLowerCase();
        }
        return item[key]?.toLowerCase().includes(filters[key].toLowerCase());
      })
    );
  };

  const filteredPendingBoData = applyFilters();

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const columns = ["User Name", "Email", "Phone Number"];
  const columnKeys = ["userName", "email", "phoneNumber"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const enhancedData = filteredPendingBoData.map((item) => ({
    ...item,
    status: <Status status={item.status} />,
    originalStatus: item.status,
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* Approve and Reject Buttons */}
      {row.originalStatus !== "Approved" && (
        <>
          {/* Approve Button */}
          <div className="relative group">
            <button
              onClick={() => {
                setShowApprovalModal(true);
                setSelectedOperator(row);
              }}
              className="text-green-500 hover:text-green-600"
            >
              <SiTicktick className="text-sm text-gray-500 cursor-pointer" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Approve
            </span>
          </div>

          <div className="h-4 w-px bg-gray-400"></div>

          {/* Reject Button */}
          <div className="relative group">
            <button className="text-red-500 hover:text-red-600">
              <MdOutlineCancel className="text-gray-500 cursor-pointer" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Reject
            </span>
          </div>
        </>
      )}

      {/* View Details Button */}
      {row.originalStatus === "Approved" && (
        <div className="relative group">
          <button
            onClick={() => {
              setShowDetailsModal(true); // Set the details modal to show
              setSelectedOperator(row);
            }}
            className="text-grey-500 hover:text-grey-600"
          >
            <FaRegEye className="text-lg text-gray-500 cursor-pointer" />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
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
              Applications Management
            </h2>
          </div>

          {/* filter input */}
          {showFilters && (
            <Card>
              {/* First Row: Company Name and Company Email */}
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/3">
                  <label
                    htmlFor="userName"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    User Name
                  </label>
                  <CustomInput
                    placeholder="Filter by User Name"
                    id="userName"
                    name="userName"
                    type="text"
                    value={filters.userName}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="email"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <CustomInput
                    placeholder="Filter by Company Email"
                    id="email"
                    name="email"
                    type="text"
                    value={filters.email}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="w-1/3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <CustomInput
                    placeholder="Filter by Phone Number"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={filters.phoneNumber}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="mt-4 w-full">
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
                {filteredPendingBoData.length} applications
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

          {/* Modal for Approve Application */}
          <Modal
            isVisible={showApprovalModal}
            onClose={() => setShowApprovalModal(false)}
          >
            <ApplicationForm
              operator={selectedOperator}
              onClose={() => setShowApprovalModal(false)}
            />
          </Modal>

          {/* Modal for View Details */}
          <Modal
            isVisible={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
          >
            <ApplicationForm
              operator={selectedOperator}
              onClose={() => setShowDetailsModal(false)}
              isApproved={selectedOperator?.originalStatus === "Approved"}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageApplicationPage;
