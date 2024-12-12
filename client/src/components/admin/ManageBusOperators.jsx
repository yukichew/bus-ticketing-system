import React, { useState, useEffect } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import Table from "../../components/common/Table";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import ViewBoDetails from "./modal/ViewBODetails";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import PromptConfirmation from "./modal/PromptConfirmation";
import { getAllBoDetails } from "../../api/auth";
import { deactivateBo } from "../../api/busOperator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapBusOperatorsData = (response) => {
  return response.map((item) => ({
    id: item.id,
    email: item.email,
    userName: item.userName,
    phoneNumber: item.phoneNumber,
    address: item.address,
    busImage: item.busImages[0],
    status: item.status,
  }));
};

const ManageBusOperators = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeactivate, setShowDeactivateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [busOperators, setBusOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [filters, setFilters] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    status: "",
  });

  const initialFilters = {
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    status: "",
  };

  useEffect(() => {
    const fetchBusOperators = async () => {
      try {
        const response = await getAllBoDetails();
        console.log(response);
        if (response?.error) {
          console.error("API error: ", response.message);
        } else {
          const mappedData = mapBusOperatorsData(response);
          setBusOperators(mappedData);
        }
      } catch (error) {
        console.error("Unexpected error occurred: ", error);
      }
    };

    fetchBusOperators();
  }, []);

  const handleDeactivate = async () => {
    if (!selectedOperator) {
      toast.error("No operator selected.");
      return;
    }
    try {
      const response = await deactivateBo(selectedOperator.id);

      if (response?.error) {
        console.error("API error: ", response.message);
      } else {
        toast.success("Bus operator has been deactivated");
        setShowDeactivateModal(false);

        setBusOperators((prev) =>
          prev.filter((operator) => operator.id !== selectedOperator.id)
        );
      }
    } catch (error) {
      console.error("Unexpected error occurred: ", error);
    }
  };

  const applyFilters = () => {
    return busOperators
      .filter((item) =>
        Object.keys(filters).every((key) => {
          if (!filters[key]) return true;
          if (key === "status") {
            return item.status?.toLowerCase() === filters[key]?.toLowerCase();
          }
          return item[key]?.toLowerCase().includes(filters[key].toLowerCase());
        })
      )
      .filter((item) => item.status?.toLowerCase() != "pending");
  };

  const filteredBoData = applyFilters();

  const enhancedData = filteredBoData.map((item) => ({
    ...item,
    status: <Status status={item.status} />,
    originalStatus: item.status,
  }));

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const columns = ["User Name", "Email", "Phone Number", "Address"];
  const columnKeys = ["userName", "email", "phoneNumber", "address"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      <div className="relative group">
        <button
          onClick={() => {
            setShowDetailsModal(true);
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

      {row.originalStatus !== "Inactive" && (
        <>
          <div className="h-4 w-px bg-gray-400"></div>

          <div className="relative group">
            <button
              onClick={() => {
                setShowDeactivateModal(true);
                setSelectedOperator(row);
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
      <ToastContainer />
      {showFilters && (
        <Card>
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/2">
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
            <div className="w-1/2">
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
          </div>

          <div className="flex justify-between gap-4 mb-4">
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
                htmlFor="address"
                className="block text-md font-poppins font-medium text-gray-700 mb-2"
              >
                Address
              </label>
              <CustomInput
                placeholder="Filter by Address"
                id="address"
                name="address"
                type="text"
                value={filters.address}
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
            {filteredBoData.length} bus operators
          </span>{" "}
          found
        </p>
        <div className="flex justify-end items-center">
          <span className="text-gray-400 mx-2">|</span>

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
      >
        <ViewBoDetails
          operator={selectedOperator}
          onClose={() => setShowDetailsModal(false)}
        />
      </Modal>

      {showDeactivate && (
        <Modal
          isVisible={showDeactivate}
          onClose={() => setShowDeactivateModal(false)}
        >
          <PromptConfirmation
            header="Are you sure you want to deactivate this user?"
            confirmTitle="Deactivate"
            onClose={() => setShowDeactivateModal(false)}
            onConfirm={handleDeactivate}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageBusOperators;
