// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8081/api/v1",
// });

// // Attach token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Auto logout on token expiry
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;
// api/api.js
import axios from "axios";

const api = axios.create({
  // CHANGE THIS LINE:
  // FROM: "http://localhost:8081/api/v1"
  // TO:   "http://192.168.29.112:8081/api/v1" 
  baseURL: "http://192.168.29.112:8081/api/v1",
});

// -----------------------------------------------------
//  🔐 REQUEST INTERCEPTOR → Attach JWT Token Automatically
// -----------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------------------------------
//  🚨 RESPONSE INTERCEPTOR → Auto Logout on 401 Unauthorized
// -----------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or invalid → logout user
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
