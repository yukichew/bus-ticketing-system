import api from ".";
import { catchError } from "../utils/error";

export const approveBo = async (id) => {
  try {
    const status = "Active";
    const { data } = await api.put(`/BusOperator/update-status/${id}`, status, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Fetched data:", data);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const SendRejectApplicationEmail = async (id) => {
  try {
    const { data } = await api.put(`/BusOperator/reject-application/${id}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};
