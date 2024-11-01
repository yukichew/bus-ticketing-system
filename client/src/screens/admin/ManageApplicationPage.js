import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Table from "../../components/common/Table";
import { MdCancel } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Modal from "../../components/common/Modal";
import ApplicationForm from "../../components/admin/modal/ViewApplication";

const ManageApplicationPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [data, setData] = useState([
    {
      id: "1",
      companyName: "Trans Malaysia Express",
      companyEmail: "info@transmalaysia.com",
      contactNumber: "+60387654321",
      address: "No. 25, Jalan Ampang, Kuala Lumpur, 50450",
    },
    {
      id: "2",
      companyName: "Golden Coach Travels",
      companyEmail: "support@goldencoach.com",
      contactNumber: "+60754321098",
      address: "45, Jalan Tebrau, Johor Bahru, 80000",
    },
    {
      id: "3",
      companyName: "Rapid Penang Express",
      companyEmail: "contact@rapidpenang.com",
      contactNumber: "+6045671234",
      address: "88, Lebuh Chulia, George Town, Penang, 10200",
    },
    {
      id: "4",
      companyName: "Borneo Star Line",
      companyEmail: "inquiries@borneostarline.com",
      contactNumber: "+6082234567",
      address: "Lot 10, Jalan Tunku Abdul Rahman, Kota Kinabalu, 88000",
    },
    {
      id: "5",
      companyName: "East Coast Travel",
      companyEmail: "contact@eastcoasttravel.com",
      contactNumber: "+6092345678",
      address: "25, Jalan Sultan Ismail, Kuala Terengganu, 20100",
    },
    {
      id: "6",
      companyName: "Southern Cross Coaches",
      companyEmail: "hello@southerncross.com",
      contactNumber: "+60125678910",
      address: "18, Jalan Tun Razak, Malacca City, 75200",
    },
    {
      id: "7",
      companyName: "Skyline Express",
      companyEmail: "services@skylineexpress.com",
      contactNumber: "+60378901234",
      address: "12A, Persiaran KLCC, Kuala Lumpur, 50088",
    },
    {
      id: "8",
      companyName: "Green Line Travels",
      companyEmail: "support@greenlinetravels.com",
      contactNumber: "+6058765432",
      address: "19, Jalan Sultan Azlan Shah, Ipoh, Perak, 31400",
    },
    {
      id: "9",
      companyName: "Central Highland Coaches",
      companyEmail: "info@centralhighland.com",
      contactNumber: "+6052348765",
      address: "21, Cameron Valley, Tanah Rata, Pahang, 39000",
    },
    {
      id: "10",
      companyName: "Sabah Adventures Travel",
      companyEmail: "info@sabahadventures.com",
      contactNumber: "+6088223456",
      address: "Lot 30, Jalan Kepayan, Kota Kinabalu, Sabah, 88200",
    },
  ]);

  const columns = [
    "Company Name",
    "Company Email",
    "Contact Number",
    "Address",
  ];
  const columnKeys = [
    "companyName",
    "companyEmail",
    "contactNumber",
    "address",
  ];

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* view Button */}
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
            <h2 className="font-poppins font-bold text-2xl pb-8">
              Applications Management
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
            <ApplicationForm
              operator={selectedOperator}
              onClose={() => setShowModal(false)}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ManageApplicationPage;
