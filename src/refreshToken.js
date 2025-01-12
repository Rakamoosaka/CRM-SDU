// refreshToken.js
import axios from "axios";

// Attempt to refresh the access token using the refresh token
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) return null; // No refresh token => can't refresh

  try {
    const response = await axios.post(
      "https://crm-backend-b0bv.onrender.com/api/token/refresh/",
      { refresh }
    );
    const { access } = response.data;

    // Store the new access token in localStorage
    localStorage.setItem("accessToken", access);

    return access;
  } catch (error) {
    console.error("Failed to refresh token:", error);

    // Clear out tokens if refresh fails
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Return null to signify refresh did not succeed
    return null;
  }
};
