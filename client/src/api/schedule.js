import { catchError } from "../utils/error";
import api from "./api";

export const searchSchedule = async (filters) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const { data } = await api.get(`/BusSchedule/FilterBusSchedule?${queryParams}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};