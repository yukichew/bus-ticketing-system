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
