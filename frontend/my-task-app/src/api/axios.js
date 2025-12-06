import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8081/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 20000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default api;
