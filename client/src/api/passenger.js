import api from '.';
import { catchError } from '../utils/error';

export const getPassenger = async (id) => {
  try {
    const { data } = await api.get(`/Passengers/${id}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};
