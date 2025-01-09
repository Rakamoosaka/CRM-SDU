export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) return null;

  try {
    const response = await axios.post("https://crm-backend-b0bv.onrender.com/api/token/refresh/", {
      refresh,
    });
    const { access } = response.data;
    localStorage.setItem("accessToken", access);
    return access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};
