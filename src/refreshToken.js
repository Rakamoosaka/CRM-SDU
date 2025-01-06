import axios from "./axios";

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) throw new Error("Refresh token not found");

    const response = await axios.post("/token/refresh/", { refresh });
    const { access } = response.data;

    // Update the access token
    localStorage.setItem("accessToken", access);
    return access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Optionally handle redirect to login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
};
