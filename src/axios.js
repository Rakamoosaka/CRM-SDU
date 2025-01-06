import axios from "axios";
import { refreshToken } from "./refreshToken";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://crm-backend-b0bv.onrender.com/api/",
});

// Request interceptor to attach tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token expiration
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is OK, just return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and not a refresh endpoint
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      // Attempt to refresh the token
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error); // Pass the error along if not handled
  }
);

export default axiosInstance;
