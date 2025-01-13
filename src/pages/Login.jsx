import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://crm-backend-b0bv.onrender.com/api/token/",
        {
          username,
          password,
        }
      );
      const { access, refresh } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Navigate to admin page
      navigate("/admin");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1c1e26] text-white px-4 py-4">
      {/* Header */}
      <header className="w-full bg-[#2a2d38] py-4 px-6 sm:px-10 rounded-lg shadow-md">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl text-white font-bold">
            SDU IT PARK
          </h1>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col justify-center items-center px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Log In
        </h2>
        <div className="bg-[#2a2d38] p-6 sm:p-8 rounded-lg shadow-lg max-w-xs sm:max-w-sm w-full">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* Username Field */}
            <label
              htmlFor="username"
              className="mb-2 text-sm sm:text-base font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="p-3 mb-4 rounded-lg bg-[#3a3f51] text-white
                         focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                         transition-all duration-200"
              required
            />

            {/* Password Field */}
            <label
              htmlFor="password"
              className="mb-2 text-sm sm:text-base font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="p-3 mb-6 rounded-lg bg-[#3a3f51] text-white
                         focus:outline-none focus:ring-2 focus:ring-[#33ADA9]
                         transition-all duration-200"
              required
            />

            {/* Error Message */}
            {error && (
              <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`p-3 sm:py-3 bg-[#33ADA9] rounded text-white font-semibold 
                          hover:bg-teal-600 transition-all duration-200
                          ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </main>
      <Footer isLoginPage={true} />
    </div>
  );
};

export default Login;
