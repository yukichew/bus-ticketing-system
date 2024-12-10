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

export const fetchTransactions = async () => {
  try {
    const { data } = await axios.get("/api/Transactions");
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
