import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import Modal from "../../components/common/Modal";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { getAllBusSchedules } from "../../api/schedule";
import Tabs from "../../components/common/Tabs";
import { busScheduleInfoTabs } from "../../constants/TabItems";

const mapBusScheduleData = (response) => {
  return response.map((item) => ({
    busScheduleID: item.busScheduleID,
    travelDate: new Date(item.travelDate).toLocaleDateString("en-GB"),
    etd: item.etd,
    eta: item.eta,
    isRecurring: item.isRecurring ? "Yes" : "No",
    status: item.scheduleStatus,
    busPlate: item.busInfo.busPlate,
    busType: item.busInfo.busType.types,
    busNoOfSeats: item.busInfo.busType.noOfSeats,
    boardingLocation: item.routes.boardingLocation.name,
    origin: item.routes.boardingLocation.state,
    boardingAddress: item.routes.boardingLocation.address,
    arrivalLocation: item.routes.arrivalLocation.name,
    destination: item.routes.arrivalLocation.state,
    arrivalAddress: item.routes.arrivalLocation.address,
    departureTime: item.routes.departureTime,
    arrivalTime: item.routes.arrivalTime,
    price: item.routes.price,
    postedByUser: item.postedBy.userName,
    busImages: item.postedBy.busImages,
  }));
};

const ManageBusRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [busSchedules, setBusSchedules] = useState([]);
  const [filters, setFilters] = useState({
    travelDate: "",
    etd: "",
    eta: "",
    isRecurring: "",
    status: "",
  });

  const initialFilters = {
    travelDate: "",
    etd: "",
    eta: "",
    isRecurring: "",
    status: "",
  };

  useEffect(() => {
    const fetchBusSchedules = async () => {
      try {
        const { busSchedules } = await getAllBusSchedules();
        const mappedData = mapBusScheduleData(busSchedules);
        setBusSchedules(mappedData);
      } catch (error) {
        console.error("Error fetching bus schedules:", error);
      }
    };
    fetchBusSchedules();
  }, []);

  const applyFilters = () => {
    return busSchedules.filter((item) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "status") {
          return item.status?.toLowerCase() === filters[key]?.toLowerCase();
        }
        if (key === "travelDate") {
          const filterDate = new Date(filters[key]).toLocaleDateString("en-GB");
          return item.travelDate === filterDate;
        }
        return item[key]?.toLowerCase().includes(filters[key].toLowerCase());
      })
    );
  };

  const filteredBusSchedule = applyFilters();

  const shortenBusScheduleID = (id) => {
    if (!id) return "";
    return `${id.slice(0, 8)}`;
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const columns = ["Origin", "Destination", "Travel Date", "ETD", "ETA", "Price", "Recurring Option"];

  const columnKeys = [
    "origin",
    "destination",
    "travelDate",
    "etd",
    "eta",
    "price",
    "isRecurring",
  ];

  const statusStyles = {
      'Scheduled': 'text-blue-600 bg-blue-100',
      'On Time': 'text-orange-600 bg-orange-100',
      'En Route': 'text-yellow-600 bg-yellow-100',
      'Delayed': 'text-red-600 bg-red-100',
      'Completed': 'text-lime-700 bg-lime-100',
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const enhancedData = filteredBusSchedule.map((item) => ({
    ...item,
    busScheduleID: shortenBusScheduleID(item.busScheduleID),
    status: (
      <div className={`flex items-center justify-center relative w-40 h-8 ${statusStyles[item.status] || 'text-gray-600 bg-gray-100'} rounded-lg border-1 border-gray-50 shadow-md p-1 font-poppins font-medium text-sm`}>
          {item.status}
      </div>
    ),
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      <div className="relative group">
        <button
          onClick={() => {
            setShowDetailsModal(true);
            setSelectedOperator(row);
          }}
          className="text-gray-500 hover:text-gray-600"
        >
          <FaRegEye className="text-lg text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute w-24 left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded px-1 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            <h2 className="font-poppins font-bold text-2xl pb-2">
              Bus Schedule Management
            </h2>
          </div>

          {showFilters && (
            <Card>
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/2">
                  <label
                    htmlFor="travelDate"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Travel Date
                  </label>
                  <CustomInput
                    placeholder="Filter by Travel Date"
                    id="travelDate"
                    name="travelDate"
                    type="date"
                    value={filters.travelDate}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="isRecurring"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Recurring
                  </label>
                  <select
                    id="isRecurring"
                    name="isRecurring"
                    value={filters.isRecurring}
                    onChange={handleFilterChange}
                    className="w-full h-12 px-4 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm"
                  >
                    <option value="">Select Recurring Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between gap-4 mb-4">
                <div className="w-1/3">
                  <label
                    htmlFor="etd"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    ETD
                  </label>
                  <CustomInput
                    placeholder="Filter by ETD"
                    id="etd"
                    name="etd"
                    type="time"
                    value={filters.etd}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="eta"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    ETA
                  </label>
                  <CustomInput
                    placeholder="Filter by ETA"
                    id="eta"
                    name="eta"
                    type="time"
                    value={filters.eta}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="status"
                    className="block text-md font-poppins font-medium text-gray-700 mb-2"
                  >
                    Schedule Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full h-12 px-4 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="ontime">On Time</option>
                    <option value="enroute">En Route</option>
                    <option value="delayed">Delayed</option>
                    <option value="completed">Completed</option>
                  </select>
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
                {filteredBusSchedule.length} bus schedules
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

          <Modal
            isVisible={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            className="w-11/12 md:w-3/4 lg:w-1/2"
          >
            <Tabs
              tabs={busScheduleInfoTabs.map((tab) => ({
                ...tab,
                content: React.cloneElement(tab.content, {
                  schedule: selectedOperator,
                }),
              }))}
              orientation="vertical"
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageBusRoutes;
