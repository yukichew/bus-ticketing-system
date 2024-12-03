import api from ".";
import { catchError } from "../utils/error";

export const buyTicket = async () => {
  try {
    const { data } = await api.post("/Bookings", {
      email,
      password,
      confirmPassword,
      role,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};
