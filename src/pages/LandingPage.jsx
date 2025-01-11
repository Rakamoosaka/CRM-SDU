import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#24252D] flex flex-col items-center justify-center text-white px-4 sm:px-8">
      <div className="flex flex-col items-center mb-16 sm:mb-24">
        {/* Logo */}
        <div className="w-20 sm:w-32 flex items-center justify-center rounded-md mb-4">
          <img src="logo.svg" alt="Logo" className="w-full h-auto" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-7xl font-bold text-center mb-6 sm:mb-10">
          SDU IT PARK
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg text-center mb-4 sm:mb-6">
          Post project request cards.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/submit")}
            className="bg-[#33ADA9] hover:bg-teal-600 text-white font-medium text-lg md:text-3xl lg:text-xl py-2 px-10 sm:px-20 rounded-md"
          >
            Proceed
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-700 hover:bg-gray-600 py-2 rounded-md border font-medium text-lg md:text-3xl lg:text-xl border-gray-500"
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
