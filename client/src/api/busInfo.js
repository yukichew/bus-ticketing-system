import api from ".";
import { catchError } from "../utils/error";

export const getAllBusByBusOperatorID = async (token) => {
    try {
      const { data } = await api.get(`/BusInfo/BusOperator`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const getBus = async (busID, token) => {
    try {
      const { data } = await api.get(`/BusInfo/${busID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const searchBus = async (filters, token) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const { data } = await api.get(
          `/BusInfo/BusOperator/FilterBusInfo?${queryParams}`, {
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

export const createBus = async (busDetails, token) => {
    try {
      const { data } = await api.post(`/BusInfo`, busDetails, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const updateBus = async (busID, busDetails, token) => {
    try {
      const { data } = await api.put(`/BusInfo/${busID}`, busDetails, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const deleteBus = async (busID, token) => {
    try {
      const { data } = await api.delete(`/BusInfo/${busID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (err) {
      return catchError(err);
    }
};