import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#24252D] to-[#1c1e26] flex flex-col items-center justify-center text-white px-4 sm:px-8">
      {/* Hero Section / Logo */}
      <div className="w-full h-64 bg-cover bg-center bg-no-repeat relative">
        {/* Background image (optional)
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover bg-black bg-opacity-20"
          style={{ backgroundImage: `url('/hero-image.jpg')` }}
        ></div>
        */}
        {/* Centered Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 sm:w-24 flex items-center justify-center rounded-md mb-4 shadow-md">
            <img src="logo.svg" alt="Logo" className="w-full h-auto" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-center mb-2 sm:mb-4 drop-shadow-lg">
            SDU IT PARK
          </h1>
          <p className="text-gray-300 text-sm sm:text-base text-center leading-relaxed">
            Post project request cards.
          </p>
        </div>
      </div>

      {/* Content / Buttons */}
      <div className="flex flex-col items-center mb-8 sm:mb-16 space-y-4 sm:space-y-6 mt-6 sm:mt-12">
        <button
          onClick={() => navigate("/submit")}
          className="bg-[#33ADA9] hover:bg-teal-600 text-white font-medium text-lg sm:text-xl py-2 px-12 sm:px-20 rounded-md
                     shadow-md hover:shadow-lg transition-all duration-200"
        >
          Proceed
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium text-lg sm:text-xl py-2 px-8 sm:px-16 rounded-md
                     border border-gray-600 shadow-md hover:shadow-lg transition-all duration-200"
        >
          Log in as admin
        </button>
      </div>

      {/* Footer */}
      <Footer isLandingPage={true} />
    </div>
  );
};

export default LandingPage;
