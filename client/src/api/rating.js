import api from '.';
import { catchError } from '../utils/error';

export const addRating = async (ratingDetails, token) => {
  try {
    const { data } = await api.post('/RatesAndReviews', ratingDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};
