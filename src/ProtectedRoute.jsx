// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "./tokenUtils"; // We'll show a revised isTokenExpired below

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  // If no token, redirect
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token is expired, also redirect
  if (isTokenExpired(token)) {
    // Clear stored tokens (optional but recommended)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return <Navigate to="/login" />;
  }

  // Otherwise, token is good => render children
  return children;
};

export default ProtectedRoute;
