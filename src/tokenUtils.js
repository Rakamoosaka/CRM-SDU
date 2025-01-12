// isTokenExpired.js
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    // If token parse fails, treat as expired
    console.error("Token parse error:", error);
    return true;
  }
};
