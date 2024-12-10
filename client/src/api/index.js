import axios from 'axios';
import { refreshTokenApi } from './auth';

const api = axios.create({
  baseURL: 'https://localhost:7137/api',
});

api.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const { accessToken, refreshToken: newRefreshToken } =
          await refreshTokenApi(refreshToken);
        sessionStorage.setItem('token', accessToken);
        sessionStorage.setItem('refreshToken', newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        sessionStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
