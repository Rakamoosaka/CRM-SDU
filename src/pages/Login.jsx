import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1c1e26] text-white">
      {/* Navbar */}
      <header className="bg-[#2a2d38] py-4 px-10">
        <h1 className="text-2xl font-bold">SDU IT PARK</h1>
      </header>

      {/* Login Container */}
      <main className="flex flex-1 flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
        <div className="bg-[#2a2d38] p-8 rounded-2xl shadow-lg max-w-sm w-full">
          <form className="flex flex-col">
            {/* Email Field */}
            <label htmlFor="email" className="mb-2 text-base font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="p-3 mb-4 rounded-lg bg-[#3a3f51] text-white focus:outline-none focus:ring-1 focus:ring-white opacity-50"
              required
            />

            {/* Password Field */}
            <label htmlFor="password" className="mb-2 text-base font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              className="p-3 mb-6 rounded-lg bg-[#3a3f51] text-white focus:outline-none focus:ring-1 focus:ring-white opacity-50"
              required
            />

            {/* Login Button */}
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
