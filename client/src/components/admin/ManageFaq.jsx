import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table";
import { useNavigate } from "react-router-dom";
import { fetchFaqs, deleteFaq } from "../../api/faq";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Status from "../../components/admin/Status";
import Modal from "../common/Modal";
import FaqEditForm from "./modal/FaqEditForm";
import FaqCreateForm from "./modal/FaqCreateForm";
import DeleteConfirmation from "./modal/DeleteConfirmation";
import Card from "../../components/common/Card";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  "General",
  "Manage Booking",
  "Payment & Refund",
  "Technical",
  "Journey & Visa",
];

const ManageFaq = () => {
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState([]);
  const columns = ["Question", "Answer", "Category"];
  const columnKeys = ["question", "answer", "category"];
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [isFilterShow, setIsFilterShow] = useState(true);
  const [filters, setFilters] = useState({
    question: "",
    answer: "",
    category: "",
    status: "",
  });

  const initialFilters = {
    question: "",
    answer: "",
    category: "",
    status: "",
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const fetchDataFromApi = async () => {
    try {
      const faqs = await fetchFaqs();
      setFaqData(faqs);
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    return faqData.filter((item) =>
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

  const handleConfirmDelete = async () => {
    try {
      console.log("Deleting FAQ ID:", selectedOperator?.faqId);
      await deleteFaq(selectedOperator?.faqId);

      const remainingData = faqData.filter(
        (faq) => faq.faqId !== selectedOperator?.faqId
      );
      setFaqData(remainingData);
      toast.success("FAQ deleted successfully.");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error during delete", error);
      toast.error("An error occurred while deleting the FAQ.");
    }
  };

  const filteredFaqData = applyFilters();

  const enhancedData = filteredFaqData.map((item) => ({
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
            console.log("FAQ ID:", row.faqId);
            setSelectedOperator({
              ...row,
              faqId: row.faqId,
              originalStatus: row.originalStatus,
            });
            setShowEditModal(true);
          }}
          className="text-green-500 hover:text-green-600"
        >
          <FaRegEdit className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Edit Question
        </span>
      </div>
      <div className="h-4 w-px bg-gray-400"></div>

      {/* Delete Button */}
      <div className="relative group">
        <button
          onClick={() => {
            console.log("FAQ ID:", row.faqId);
            setSelectedOperator({
              ...row,
              faqId: row.faqId,
            });
            setShowDeleteModal(true);
          }}
          className="text-grey-500 hover:text-grey-600"
        >
          <FaRegTrashAlt className="text-xl text-gray-500 cursor-pointer" />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Delete Question
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
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="question"
                  className="block text-md font-poppins font-medium text-gray-700 mb-2"
                >
                  Question
                </label>
                <CustomInput
                  placeholder="Filter by Question"
                  id="question"
                  name="question"
                  type="text"
                  value={filters.question}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label
                  htmlFor="answer"
                  className="block text-md font-poppins font-medium text-gray-700 mb-2"
                >
                  Answer
                </label>
                <CustomInput
                  placeholder="Filter by Answer"
                  id="answer"
                  name="answer"
                  type="text"
                  value={filters.answer}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-md font-poppins font-medium text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={handleFilterChange}
                  className="rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm w-full h-12 px-4"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
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

            {/* Clear filter button */}
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
            {enhancedData.length} FAQs
          </span>{" "}
          found
        </p>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowCreateModal(true)}
            className="ml-auto flex items-center font-medium hover:text-primary pr-1"
          >
            <IoIosAddCircleOutline size={16} />
            <p className="mx-1"> Add Questions</p>
          </button>

          <span className="text-gray-400 mx-2">|</span>

          <button
            onClick={() => navigate("/faq", { state: { fromAdmin: true } })}
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
          data={enhancedData}
          columns={columns}
          columnKeys={columnKeys}
          showActionColumn={true}
          actions={actionIcons}
        />
      </div>

      {/* modal for edit */}
      <Modal isVisible={showEditModal} onClose={() => setShowEditModal(false)}>
        <FaqEditForm
          operator={selectedOperator}
          onClose={() => {
            setShowEditModal(false);
          }}
        />
      </Modal>

      {/* modal for add question */}
      <Modal
        isVisible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <FaqCreateForm onClose={() => setShowCreateModal(false)} />
      </Modal>

      {/* Modal for delete confirmation */}
      {showDeleteModal && (
        <Modal
          isVisible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <DeleteConfirmation
            operator={selectedOperator}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageFaq;
