import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table";
import { useNavigate } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt, FaExchangeAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { getAllTerms, deleteTerm } from "../../api/tac";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import PolicyCreateForm from "../../components/admin/modal/PolicyCreateForm";
import PolicyEditForm from "../../components/admin/modal/PolicyEditForm";
import PromptConfirmation from "./modal/PromptConfirmation";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePolicy = () => {
  const navigate = useNavigate();
  const columns = ["Policy Title", "Terms & Conditions"];
  const columnKeys = ["policyTitle", "terms"];
  const [policies, setPolicies] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); // state for edit modal
  const [showCreateModal, setShowCreateModal] = useState(false); // state for create modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isFilterShow, setIsFilterShow] = useState(true);
  const [filters, setFilters] = useState({
    policyTitle: "",
    terms: "",
    status: "",
  });

  const initialFilters = {
    policyTitle: "",
    terms: "",
    status: "",
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await getAllTerms();
        setPolicies(data);
      } catch (error) {
        console.error("Failed to fetch terms and conditions:", error);
      }
    };

    fetchPolicies();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      console.log("Deleting TAC ID:", selectedPolicy?.tacId);
      await deleteTerm(selectedPolicy?.tacId);

      const remainingData = policies.filter(
        (tac) => tac.tacId !== selectedPolicy?.tacId
      );
      setPolicies(remainingData);
      setShowDeleteModal(false);
      toast.success("Terms & Conditions deleted successfully.");
    } catch (error) {
      console.error("Error during delete", error);
      toast.error("An error occurred while deleting the FAQ.");
    }
  };

  const filteredData = policies
    .filter((item) => {
      const matchesPolicyTitle = filters.policyTitle
        ? item.policyTitle
            .toLowerCase()
            .includes(filters.policyTitle.toLowerCase())
        : true;
      const matchesTerms = filters.terms
        ? item.terms.toLowerCase().includes(filters.terms.toLowerCase())
        : true;
      const matchesStatus = filters.status
        ? item.status.toLowerCase() === filters.status.toLowerCase()
        : true;

      return matchesPolicyTitle && matchesTerms && matchesStatus;
    })
    .map((item) => ({
      ...item,
      status: <Status status={item.status} />,
      originalStatus: item.status,
    }));

  const actionIcons = (row) => (
    <div className="flex justify-center space-x-2">
      {/* Edit button */}
      <div className="relative group">
        <button
          onClick={() => {
            setSelectedPolicy({
              ...row,
              originalStatus: row.originalStatus, // pass the original status from the row
            });
            setShowEditModal(true);
          }}
          className="text-green-500 hover:text-green-600"
        >
          <FaRegEdit className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Edit Policy
        </span>
      </div>
      <div className="h-4 w-px bg-gray-400"></div>

      {/* Delete Button */}
      <div className="relative group">
        <button
          onClick={() => {
            console.log("TAC ID:", row.tacId);
            setSelectedPolicy({
              ...row,
              tacId: row.tacId,
            });
            setShowDeleteModal(true);
          }}
          className="text-grey-500 hover:text-grey-600"
        >
          <FaRegTrashAlt className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Delete Policy
        </span>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      {isFilterShow && (
        <div className="mb-8 mt-5">
          <Card>
            {/* First Row: Filters */}
            <div className="grid grid-cols-3 gap-4">
              {/* Filter by Policy Title */}
              <div>
                <label
                  htmlFor="policyTitle"
                  className="block text-md font-poppins font-medium text-gray-700 mb-2"
                >
                  Policy Title
                </label>
                <CustomInput
                  placeholder="Filter by Policy Title"
                  id="policyTitle"
                  name="policyTitle"
                  type="text"
                  value={filters.policyTitle}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Filter by Terms */}
              <div>
                <label
                  htmlFor="terms"
                  className="block text-md font-poppins font-medium text-gray-700 mb-2"
                >
                  Terms
                </label>
                <CustomInput
                  placeholder="Filter by Terms"
                  id="terms"
                  name="terms"
                  type="text"
                  value={filters.terms}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Dropdown for Status */}
              <div>
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
                  <option value="deactivated">Deactivated</option>
                </select>
              </div>
            </div>

            {/* Second Row: Clear Filters Button */}
            <div className="mt-4">
              <CustomButton
                title="Clear Filters"
                onClick={clearFilters}
                className="w-full h-12 text-white bg-primary rounded-md hover:bg-primary-dark"
              />
            </div>
          </Card>
        </div>
      )}

      <div className="flex justify-between items-center mt-12 mb-4">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {filteredData.length} Policies
          </span>{" "}
          found
        </p>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowCreateModal(true)}
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
          >
            <IoIosAddCircleOutline size={16} />
            <p className="mx-1"> Add Policy</p>
          </button>

          <span className="text-gray-400 mx-2">|</span>

          <button
            onClick={() =>
              navigate("/policies", { state: { fromAdmin: true } })
            }
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
          >
            <FaExchangeAlt size={16} />
            <p className="mx-1"> Change to User View</p>
          </button>

          <span className="text-gray-400 mx-2">|</span>

          <button
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
            onClick={() => setIsFilterShow((prev) => !prev)}
          >
            <IoFilter size={16} />
            <p className="mx-1">Filters</p>
          </button>
        </div>
      </div>

      <div className="mt-3 mx-auto">
        <Table
          data={filteredData}
          columns={columns}
          columnKeys={columnKeys}
          showActionColumn={true}
          actions={actionIcons}
        />
      </div>

      {/* modal for edit */}
      <Modal isVisible={showEditModal} onClose={() => setShowEditModal(false)}>
        <PolicyEditForm
          operator={selectedPolicy}
          onClose={() => setShowEditModal(false)}
        />
      </Modal>

      {/* modal for add policy */}
      <Modal
        isVisible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <PolicyCreateForm onClose={() => setShowCreateModal(false)} />
      </Modal>

      {/* Modal for delete confirmation */}
      {showDeleteModal && (
        <Modal
          isVisible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <PromptConfirmation
            header="Are you sure you want to delete this FAQ?"
            confirmTitle="Delete"
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
          />
        </Modal>
      )}
    </>
  );
};

export default ManagePolicy;
