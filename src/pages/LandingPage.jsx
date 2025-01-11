import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#24252D] flex flex-col items-center justify-center text-white px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col items-center mb-16 sm:mb-24 lg:mb-32">
        {/* Logo */}
        <div className="w-20 sm:w-24 md:w-32 lg:w-40 flex items-center justify-center rounded-md mb-4">
          <img src="logo.svg" alt="Logo" className="w-full h-auto" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
          SDU IT PARK
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-center mb-4 sm:mb-6 md:mb-8">
          Post project request cards.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <button
            onClick={() => navigate("/submit")}
            className="bg-[#33ADA9] hover:bg-teal-600 text-white font-medium text-lg sm:text-xl md:text-2xl py-2 px-10 sm:px-16 md:px-20 lg:px-24 rounded-md"
          >
            Proceed
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-700 hover:bg-gray-600 py-2 rounded-md border font-medium text-lg sm:text-xl md:text-2xl border-gray-500"
          >
            Log in as admin
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
