import api from ".";
import { catchError } from "../utils/error";

export const getAllBusTypesByBusOperatorID = async (token) => {
  try {
    const { data } = await api.get(`/BusType/BusOperator`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getBusType = async (busTypeID) => {
  try {
    const { data } = await api.get(`/BusType/${busTypeID}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const searchBusType = async (filters, token) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const { data } = await api.get(
      `/BusType/BusOperator/FilterBusType?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const createBusType = async (busTypeDetails, token) => {
  try {
    const { data } = await api.post(`/BusType`, busTypeDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const updateBusType = async (busTypeID, busTypeDetails, token) => {
  try {
    const { data } = await api.put(`/BusType/${busTypeID}`, busTypeDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const deleteBusType = async (busTypeID, token) => {
  try {
    const { data } = await api.delete(`/BusType/${busTypeID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getAllBusTypes = async () => {
  try {
    const { data } = await api.get("/BusType");

    const uniqueTypes = [...new Set(data.map((bus) => bus.types))];

    return uniqueTypes;
  } catch (err) {
    return catchError(err);
  }
};
