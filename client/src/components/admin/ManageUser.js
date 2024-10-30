import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";

const ManageUser = () => {
  const [data, setData] = useState([
    {
      id: "1",
      fullName: "Aminah Abdul Rahim",
      email: "aminah.rahim@example.com",
      dob: "1987-04-12",
      phoneNumber: "+60123456789",
      status: "Active",
    },
    {
      id: "2",
      fullName: "Hafiz Mohamed Yusof",
      email: "hafiz.yusof@example.com",
      dob: "1992-11-21",
      phoneNumber: "+60129876543",
      status: "Active",
    },
    {
      id: "3",
      fullName: "Nurul Iman Binti Ismail",
      email: "nurul.iman@example.com",
      dob: "1995-08-30",
      phoneNumber: "+60172345678",
      status: "Active",
    },
    {
      id: "4",
      fullName: "Kavitha Krishnan",
      email: "kavitha.krishnan@example.com",
      dob: "1989-03-15",
      phoneNumber: "+60125678901",
      status: "Active",
    },
    {
      id: "5",
      fullName: "Lee Chong Wei",
      email: "lee.chongwei@example.com",
      dob: "1984-10-21",
      phoneNumber: "+60167854321",
      status: "Active",
    },
    {
      id: "6",
      fullName: "Jessica Tan",
      email: "jessica.tan@example.com",
      dob: "1990-12-05",
      phoneNumber: "+60123467890",
      status: "Active",
    },
    {
      id: "7",
      fullName: "Ahmad Bin Zulkifli",
      email: "ahmad.zulkifli@example.com",
      dob: "1994-02-18",
      phoneNumber: "+60123458976",
      status: "Active",
    },
    {
      id: "8",
      fullName: "Sara Mohd Amir",
      email: "sara.amir@example.com",
      dob: "1993-07-27",
      phoneNumber: "+60183456789",
      status: "Active",
    },
    {
      id: "9",
      fullName: "Farhan Abdullah",
      email: "farhan.abdullah@example.com",
      dob: "1985-05-30",
      phoneNumber: "+60197812345",
      status: "Active",
    },
    {
      id: "10",
      fullName: "Liyana Hashim",
      email: "liyana.hashim@example.com",
      dob: "1996-09-13",
      phoneNumber: "+60165432789",
      status: "Active",
    },
  ]);

  const columns = ["Full Name", "Email", "DoB", "Phone Number", "Status"];
  const columnKeys = ["fullName", "email", "dob", "phoneNumber", "status"];

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
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
          <span className="font-semibold text-secondary">10 users </span>
          created
        </p>

        <div className="flex justify-end">
          <button className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary">
            <IoMdAdd className="mr-2 text-white text-base" />
            New Passengers
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

export default ManageUser;
