import api from ".";
import { catchError } from "../utils/error";

export const login = async (email, password) => {
  try {
    const { data } = await api.post("/Auth/login", { email, password });
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
      role,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};
