import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";

const ManageBusOperators = () => {
  const [data, setData] = useState([
    {
      id: "1",
      companyName: "Trans Malaysia Express",
      companyEmail: "info@transmalaysia.com",
      contactNumber: "+60387654321",
      address: "No. 25, Jalan Ampang, Kuala Lumpur, 50450",
      status: "Active",
    },
    {
      id: "2",
      companyName: "Golden Coach Travels",
      companyEmail: "support@goldencoach.com",
      contactNumber: "+60754321098",
      address: "45, Jalan Tebrau, Johor Bahru, 80000",
      status: "Active",
    },
    {
      id: "3",
      companyName: "Rapid Penang Express",
      companyEmail: "contact@rapidpenang.com",
      contactNumber: "+6045671234",
      address: "88, Lebuh Chulia, George Town, Penang, 10200",
      status: "Active",
    },
    {
      id: "4",
      companyName: "Borneo Star Line",
      companyEmail: "inquiries@borneostarline.com",
      contactNumber: "+6082234567",
      address: "Lot 10, Jalan Tunku Abdul Rahman, Kota Kinabalu, 88000",
      status: "Active",
    },
    {
      id: "5",
      companyName: "East Coast Travel",
      companyEmail: "contact@eastcoasttravel.com",
      contactNumber: "+6092345678",
      address: "25, Jalan Sultan Ismail, Kuala Terengganu, 20100",
      status: "Active",
    },
    {
      id: "6",
      companyName: "Southern Cross Coaches",
      companyEmail: "hello@southerncross.com",
      contactNumber: "+60125678910",
      address: "18, Jalan Tun Razak, Malacca City, 75200",
      status: "Active",
    },
    {
      id: "7",
      companyName: "Skyline Express",
      companyEmail: "services@skylineexpress.com",
      contactNumber: "+60378901234",
      address: "12A, Persiaran KLCC, Kuala Lumpur, 50088",
      status: "Active",
    },
    {
      id: "8",
      companyName: "Green Line Travels",
      companyEmail: "support@greenlinetravels.com",
      contactNumber: "+6058765432",
      address: "19, Jalan Sultan Azlan Shah, Ipoh, Perak, 31400",
      status: "Active",
    },
    {
      id: "9",
      companyName: "Central Highland Coaches",
      companyEmail: "info@centralhighland.com",
      contactNumber: "+6052348765",
      address: "21, Cameron Valley, Tanah Rata, Pahang, 39000",
      status: "Active",
    },
    {
      id: "10",
      companyName: "Sabah Adventures Travel",
      companyEmail: "info@sabahadventures.com",
      contactNumber: "+6088223456",
      address: "Lot 30, Jalan Kepayan, Kota Kinabalu, Sabah, 88200",
      status: "Active",
    },
  ]);

  const columns = [
    "Company Name",
    "Company Email",
    "Contact Number",
    "Address",
    "Status",
  ];

  const columnKeys = [
    "companyName",
    "companyEmail",
    "contactNumber",
    "address",
    "status",
  ];

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* Update Button */}
      <div className="relative group">
        <button className="text-green-500 hover:text-green-600">
          <FaRegEdit className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Update
        </span>
      </div>

      {/* Deactivate Button */}
      <div className="relative group">
        <button className="text-red-500 hover:text-red-600">
          <TiUserDeleteOutline className="text-xl" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Deactivate
        </span>
      </div>
    </div>
  );

  const enhancedData = data.map((item) => ({
    ...item,
    status: <Status status={item.status} />,
  }));

  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {data.length} bus operators{" "}
          </span>
          created
        </p>

        <div className="flex justify-end">
          <button className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary">
            <IoMdAdd className="mr-2 text-white text-base" />
            New Bus Operators
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
    </>
  );
};

export default ManageBusOperators;
