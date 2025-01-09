import axios from "axios";
import { refreshToken } from "./refreshToken"; // Assuming you have a function to refresh tokens

const axiosInstance = axios.create({
  baseURL: "https://crm-backend-b0bv.onrender.com/api/",
});

// Add request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
   // console.log("Request Headers:", config.headers); // Debug headers
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle 401 errors and refresh tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
