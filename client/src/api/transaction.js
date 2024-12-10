import api from ".";
import { catchError } from "../utils/error";

export const initiatePayment = async (paymentDetails) => {
  try {
    const { data } = await api.post("/Transactions", paymentDetails);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const confirmTransaction = async (transactionID, status) => {
  try {
    const { data } = await api.post("/Transactions/ConfirmTransaction", {
      transactionID,
      status,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getTotalSalesRevenue = async (token) => {
  try {
    const { data } = await api.get(`/Transactions/BusOperator`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getTransactionsDetails = async () => {
  try {
    const { data } = await api.get("/Transactions/get-transaction-details");
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
