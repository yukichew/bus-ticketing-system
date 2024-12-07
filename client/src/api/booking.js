import api from ".";
import { catchError } from "../utils/error";

export const buyTicket = async (bookingDetails) => {
  try {
    const { data } = await api.post("/Bookings", bookingDetails);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

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

export const getBookings = async (email) => {
  try {
    const { data } = await api.get("/Bookings/History?email=" + email);
    return data;
  } catch (err) {
    return catchError(err);
  }
};
