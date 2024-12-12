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
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const editBOProfile = async (id, busOperatorDetails) => {
  try {
    const { data } = await api.put(`/BusOperator/update-bus-operator/${id}`, busOperatorDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const deactivateBo = async (id) => {
  try {
    const status = "Inactive";
    const { data } = await api.put(`/BusOperator/update-status/${id}`, status, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export const fetchTotalBusOperators = async (status) => {
  try {
    const { data } = await api.get(`/BusOperator/count?status=${status}`);
    return data;
  } catch (err) {
    console.error(`Error fetching ${status} bus operators count:`, err);
  }
};
