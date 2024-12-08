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

export const getBookings = async (email) => {
  try {
    const { data } = await api.get('/Bookings/History?email=' + email);
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
