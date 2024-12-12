import api from ".";
import { catchError } from "../utils/error";

export const addRating = async (ratingDetails) => {
  try {
    const { data } = await api.post("/RatesAndReviews", ratingDetails);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getActiveRatings = async (id) => {
  try {
    const { data } = await api.get(`/RatesAndReviews/Active/${id}`);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getRatesAndReviewsByBusOperatorID = async (token) => {
  try {
    const { data } = await api.get(`/RatesAndReviews/BusOperator`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const updateReportedStatus = async (reviewID, token) => {
  try {
    const { data } = await api.put(
      `/RatesAndReviews/UpdateReportedStatus${reviewID}`,
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

export const getAllRatings = async () => {
  try {
    const { data } = await api.get(`/RatesAndReviews`);
    console.log("API reponse:", data);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const approveAndRejectReviews = async (id, status) => {
  try {
    if (!id || !status) {
      throw new Error("Both 'id' and 'status' are required.");
    }

    const { data } = await api.put(
      `/RatesAndReviews/update-rate-review-status/${id}`,
      status,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", data);
    return data;
  } catch (err) {
    console.error("Error updating review status:", err);
    return catchError(err);
  }
};
