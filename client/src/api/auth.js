import api from ".";
import { catchError } from "../utils/error";

export const login = async (email, password) => {
  try {
    const { data } = await api.post("/Auth/login", { email, password });
    sessionStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const register = async (email, password, confirmPassword, role) => {
  try {
    const { data } = await api.post("/Auth/register", {
      email,
      password,
      confirmPassword,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getUserProfile = async (token) => {
  try {
    const { data } = await api.get("/Auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};
