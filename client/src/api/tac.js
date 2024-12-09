import api from ".";
import { catchError } from "../utils/error";
import axios from "axios";

// Fetch all terms and conditions
export const getAllTerms = async () => {
  try {
    const { data } = await api.get("/TermsAndConditions/all");
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getActiveTerms = async () => {
  try {
    const { data } = await api.get("/TermsAndConditions/active");
    return data;
  } catch (err) {
    return catchError(err);
  }
};

// Create a new term
export const createTerm = async (term) => {
  try {
    const { data } = await api.post("/TermsAndConditions", term);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

// Update a term by ID
export const updateTerm = async (tacId, updatedPolicy) => {
  try {
    console.log("Sending to server:", {
      tacId,
      policyTitle: updatedPolicy.policyTitle,
      terms: updatedPolicy.terms,
      status: updatedPolicy.status,
    });

    const response = await axios.put(
      `https://localhost:7137/api/TermsAndConditions/${tacId}`,
      {
        tacId,
        policyTitle: updatedPolicy.policyTitle,
        terms: updatedPolicy.terms,
        status: updatedPolicy.status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from server:", response.data);
    return response.data;
  } catch (err) {
    console.error("Full server error response:", err);
  }
};

// Delete a term by ID
export const deleteTerm = async (id) => {
  try {
    const { data } = await api.delete(`/TermsAndConditions/${id}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};
