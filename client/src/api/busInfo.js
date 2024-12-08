import api from ".";
import { catchError } from "../utils/error";

export const getAllBus = async () => {
    try {
      const { data } = await api.get(`/BusInfo`);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const getBus = async (busID) => {
    try {
      const { data } = await api.get(`/BusInfo/${busID}`);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const searchBus = async (filters) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const { data } = await api.get(
          `/BusInfo/FilterBusInfo?${queryParams}`
        );
        return data;
      } catch (err) {
        return catchError(err);
      }
};

export const createBus = async (busDetails) => {
    try {
      const { data } = await api.post(`/BusInfo`, busDetails);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const updateBus = async (busID, busDetails) => {
    try {
      const { data } = await api.put(`/BusInfo/${busID}`, busDetails);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const deleteBus = async (busID) => {
    try {
      const { data } = await api.delete(`/BusInfo/${busID}`);
      return data;
    } catch (err) {
      return catchError(err);
    }
};