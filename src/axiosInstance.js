// axiosInstance.js
import axios from "axios";
import { refreshToken } from "./refreshToken";

const axiosInstance = axios.create({
  baseURL: "https://crm-backend-b0bv.onrender.com/api/",
});

// REQUEST Interceptor: attach the stored access token, if any
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

// RESPONSE Interceptor: if we get 401, try refreshing once
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401: unauthorized, and request has not been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the token
      const newAccessToken = await refreshToken();

      // If refresh is successful, attach the new token and retry
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }

      // If refresh failed, forcibly redirect to login
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Not a 401 or already retried => reject
    return Promise.reject(error);
  }
);

export default axiosInstance;
