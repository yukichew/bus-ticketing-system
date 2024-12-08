import api from ".";
import { catchError } from "../utils/error";

export const getAllBusType = async () => {
    try {
      const { data } = await api.get(`/BusType`);
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

export const searchBusType = async (filters) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const { data } = await api.get(
          `/BusType/FilterBusType?${queryParams}`
        );
        return data;
      } catch (err) {
        return catchError(err);
      }
};

export const createBusType = async (busTypeDetails) => {
    try {
      const { data } = await api.post(`/BusType`, busTypeDetails);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const updateBusType = async (busTypeID, busTypeDetails) => {
    try {
      const { data } = await api.put(`/BusType/${busTypeID}`, busTypeDetails);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const deleteBusType = async (busTypeID) => {
    try {
      const { data } = await api.delete(`/BusType/${busTypeID}`);
      return data;
    } catch (err) {
      return catchError(err);
    }
};