import api from ".";
import { catchError } from "../utils/error";

export const login = async (email, password) => {
  try {
    const { data } = await api.post("/Auth/login", { email, password });
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role", data.role);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const register = async (registerDetails) => {
  try {
    const { data } = await api.post('/Auth/register', registerDetails);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.get('/Auth/profile');
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const refreshTokenApi = async (refreshToken) => {
  try {
    const { data } = await api.post('/Auth/refresh-token', { refreshToken });
    sessionStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post('/Auth/logout');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const verifyEmail = async (email) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await api.post("/Auth/verify-email", { email });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await api.post("/Auth/forgot-password", { email });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const validateOTP = async (email, OTP) => {
  try {
    const { data } = await api.post("/Auth/validate-otp", { email, OTP });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const validateOTPForResetPassword = async (email, OTP) => {
  try {
    const { data } = await api.post("/Auth/validate-otp-reset-password", {
      email,
      OTP,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const { data } = await api.post("/Auth/reset-password", {
      email,
      newPassword,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const { data } = await api.post('/Auth/change-password', {
      oldPassword,
      newPassword,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const editProfile = async (fullname, phoneNumber) => {
  try {
    const { data } = await api.put('/Auth/edit-profile', {
      fullname,
      phoneNumber,
    });
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getAllBo = async () => {
  try {
    const { data } = await api.get("/Auth/get-busoperators");
    console.log("Fetching data", data);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getAllBoDetails = async () => {
  try {
    const { data } = await api.get("/Auth/get-busoperators-details");
    console.log("Fetching data", data);
    return data;
  } catch (err) {
    return catchError(err);
  }
};

export const getAllMembers = async () => {
  try {
    const { data } = await api.get("/Auth/get-members");
    console.log("Fetching data", data);
    return data;
  } catch (err) {
    return catchError(err);
  }
};
