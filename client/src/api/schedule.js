import api from ".";
import { catchError } from "../utils/error";

export const getAllBusSchedulesByBusOperatorID = async (token) => {
  try {
    const { data } = await api.get(`/BusSchedule/BusOperator`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getBusSchedulesForToday = async (token) => {
  try {
    const { data } = await api.get(`/BusSchedule/BusOperator/Today`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getBusSchedule = async (busScheduleID, token) => {
  try {
    const { data } = await api.get(`/BusSchedule/${busScheduleID}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const searchSchedule = async (filters, token) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const { data } = await api.get(
      `/BusSchedule/FilterBusSchedule?${queryParams}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const searchScheduleByBusOperatorID = async (filters, token) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const { data } = await api.get(
      `/BusSchedule/BusOperator/FilterBusSchedule?${queryParams}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const searchTodaySchedule = async (filters, token) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const { data } = await api.get(
      `/BusSchedule/BusOperator/FilterBusScheduleForToday?${queryParams}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const createBusSchedule = async (scheduleDetails, token) => {
  try {
    const { data } = await api.post(`/BusSchedule`, scheduleDetails, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const updateBusSchedule = async (busScheduleID, scheduleDetails, token) => {
  try {
    const { data } = await api.put(`/BusSchedule/${busScheduleID}`, scheduleDetails, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};