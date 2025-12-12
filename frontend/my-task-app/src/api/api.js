import axios from "axios";

// 1. Capture values from .env
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8081/api/v1";
export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE || "http://localhost:8081";
export const SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE || "http://localhost:8081";

// 2. Create Axios Instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
});

// 3. Request Interceptor (Your code was good here)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !config.url.includes("/login") && !config.url.includes("/register")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 4. Response Interceptor (Your code was good here)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // Optional: Redirect to login logic here if needed
    }
    return Promise.reject(error);
  }
);

export default api;