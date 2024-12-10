import api from ".";
import { catchError } from "../utils/error";

export const GetAllLocations = async () => {
    try {
      const { data } = await api.get(`/Location`);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const getLocation = async (locationID) => {
    try {
      const { data } = await api.get(`/Location/${locationID}`);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const updateLocation = async (locationID, locationDetails) => {
    try {
      const { data } = await api.put(`/Location/${locationID}`, locationDetails);
      return data;
    } catch (err) {
      return catchError(err);
    }
};

export const deleteLocation = async (locationID) => {
    try {
      const { data } = await api.delete(`/Location/${locationID}`);
      return data;
    } catch (err) {
      return catchError(err);
    }
};