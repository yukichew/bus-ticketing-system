import api from '.';
import { catchError } from '../utils/error';

export const buyTicket = async (bookingDetails) => {
  try {
    const { data } = await api.post('/Bookings', bookingDetails);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const filterBookings = async (filters, page = 1, limit = 5) => {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([_, value]) => value)
    );
    queryParams.append('page', page);
    queryParams.append('limit', limit);

    const { data } = await api.get(
      `/Bookings/History/FilterBookings?${queryParams.toString()}`
    );
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getOccupiedSeats = async (busScheduleId) => {
  try {
    const { data } = await api.get(`/Seat?busScheduleId=${busScheduleId}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};
