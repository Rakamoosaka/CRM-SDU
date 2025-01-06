import React, { useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://your-backend-url/token/", {
        username: email,
        password: password,
      });
      const { access, refresh } = response.data;

      // Store tokens in localStorage (or secure storage)
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Redirect or handle successful login
      console.log("Logged in successfully!");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1c1e26] text-white">
      <header className="bg-[#2a2d38] py-4 px-10">
        <Link to="/">
          <h1 className="text-2xl text-white font-bold">SDU IT PARK</h1>
        </Link>
      </header>

      <main className="flex flex-1 flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
        <div className="bg-[#2a2d38] p-8 rounded-2xl shadow-lg max-w-sm w-full">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mb-2 text-base font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="p-3 mb-4 rounded-lg bg-[#3a3f51] text-white focus:outline-none focus:ring-1 focus:ring-white opacity-50"
              required
            />
            <label htmlFor="password" className="mb-2 text-base font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="p-3 mb-6 rounded-lg bg-[#3a3f51] text-white focus:outline-none focus:ring-1 focus:ring-white opacity-50"
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="p-3 bg-[#33ADA9] rounded text-white font-semibold hover:bg-teal-600 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
