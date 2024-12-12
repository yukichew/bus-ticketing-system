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

export default api;
