import React, { useState, useEffect } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import PromptConfirmation from "./modal/PromptConfirmation";
import { getAllMembers } from "../../api/auth";

const ManageUser = () => {
  const [showDeactivate, setShowDeactivateModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    email: "",
    phoneNumber: "",
    status: "",
  });

  const initialFilters = {
    email: "",
    phoneNumber: "",
    status: "",
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getAllMembers();
        setMembers(response || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMembers();
  }, []);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const columns = ["Email", "Phone Number"];
  const columnKeys = ["email", "phoneNumber"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    return members.filter((item) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "status") {
          return item.status?.toLowerCase() === filters[key]?.toLowerCase();
        }
        return item[key]?.toLowerCase().includes(filters[key].toLowerCase());
      })
    );
  };

  const filteredMembersData = applyFilters();

  const enhancedData = filteredMembersData.map((item) => ({
    ...item,
    status: <Status status={item.status} />,
    originalStatus: item.status,
  }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {row.originalStatus !== "Deactivated" && (
        <>
          <div className="relative group">
            <button
              onClick={() => {
                setShowDeactivateModal(true);
              }}
              className="text-red-500 hover:text-red-600"
            >
              <TiUserDeleteOutline className="text-lg text-gray-500 cursor-pointer" />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Deactivate
            </span>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {showFilters && (
        <Card>
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/3">
              <label
                htmlFor="email"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <CustomInput
                placeholder="Filter by Email"
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
            <div className="w-1/3">
              <label
                htmlFor="status"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full h-12 px-4 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
            {filteredMembersData.length} users
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

      {showDeactivate && (
        <Modal
          isVisible={showDeactivate}
          onClose={() => setShowDeactivateModal(false)}
        >
          <PromptConfirmation
            header="Are you sure you want to deactivate this user?"
            confirmTitle="Deactivate"
            onClose={() => setShowDeactivateModal(false)}
            onConfirm={() => setShowDeactivateModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageUser;
