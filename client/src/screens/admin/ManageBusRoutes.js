import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { MdCancel } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Modal from "../../components/common/Modal";
import ViewBusRoutes from "../../components/admin/modal/ViewBusRoutes";

const ManageBusRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [data, setData] = useState([
    {
      id: "1",
      busPlate: "ABC 1234",
      origin: "Kuala Lumpur",
      destination: "Penang",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "2",
      busPlate: "DEF 5678",
      origin: "Johor Bahru",
      destination: "Kuala Lumpur",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "3",
      busPlate: "GHI 9101",
      origin: "Malacca City",
      destination: "Kota Kinabalu",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "4",
      busPlate: "JKL 2345",
      origin: "George Town",
      destination: "Kuala Lumpur",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "5",
      busPlate: "MNO 6789",
      origin: "Kota Kinabalu",
      destination: "Sandakan",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "6",
      busPlate: "PQR 3456",
      origin: "Ipoh",
      destination: "Kuala Lumpur",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "7",
      busPlate: "STU 7890",
      origin: "Kuching",
      destination: "Sibu",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "8",
      busPlate: "VWX 1230",
      origin: "Kuala Terengganu",
      destination: "Kota Bharu",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "9",
      busPlate: "YZA 5678",
      origin: "Shah Alam",
      destination: "Malacca City",
      etd: "09:00",
      eta: "11:00",
    },
    {
      id: "10",
      busPlate: "BCD 9012",
      origin: "Seremban",
      destination: "Kuala Lumpur",
      etd: "09:00",
      eta: "11:00",
    },
  ]);

  const columns = ["Bus Plate", "Origin", "Destination", "ETD", "ETA"];
  const columnKeys = ["busPlate", "origin", "destination", "etd", "eta"];

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* View Button */}
      <div className="relative group">
        <button
          onClick={() => {
            setShowModal(true);
            setSelectedOperator(row);
          }}
          className="text-grey-500 hover:text-grey-600"
        >
          <IoEye className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </span>
      </div>

      {/* reject button */}
      <div className="relative group">
        <button className="text-red-500 hover:text-red-600">
          <MdCancel className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Reject
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
        className={`flex-1 p-4 transition-all duration-300 mt-20 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="w-4/5 mt-8 mx-auto">
          <div className="flex items-center">
            <h2 className="font-poppins font-bold text-2xl pb-10">
              Bus Routes Management
            </h2>
          </div>
          <div className="mt-3 mx-auto">
            <Table
              data={data}
              columns={columns}
              columnKeys={columnKeys}
              showActionColumn={true}
              actions={actionIcons}
            />
          </div>

          {/* modal for view details */}
          <Modal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            className="w-2/4"
          >
            <ViewBusRoutes
              operator={selectedOperator}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageBusRoutes;
