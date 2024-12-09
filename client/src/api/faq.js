import api from ".";
import { catchError } from "../utils/error";
import axios from "axios";

// Fetch all FAQs
export const fetchFaqs = async () => {
  try {
    const { data } = await api.get("/Faq/all");
    return data;
  } catch (err) {
    return catchError(err);
  }
};

// Fetch all FAQs
export const fetchActiveFaqs = async () => {
  try {
    const { data } = await api.get("/Faq/active");
    return data;
  } catch (err) {
    return catchError(err);
  }
};

// Create a new FAQ
export const createFaq = async (faq) => {
  try {
    const response = await api.post("/Faq", faq);
    return response.data;
  } catch (err) {
    return catchError(err);
  }
};

// Update an FAQ
export const updateFaq = async (id, faqInfo) => {
  try {
    const response = await api.put(`/Faq/${id}`, faqInfo);
    return response.data;
  } catch (err) {
    return catchError(err);
  }
};

// Delete an FAQ
export const deleteFaq = async (id) => {
  try {
    const { data } = await api.delete(`/Faq/${id}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};
