import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="min-h-screen bg-[#24252D] flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center mb-24">
        {/* Logo */}
        <div className="w-24 flex items-center justify-center rounded-md mb-4">
          <img src="logo.svg" alt="Logo" />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold mb-10">SDU IT PARK</h1>
        <p className="text-gray-400 text-sm mb-6">
          Post project request cards.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              navigate("/submit"); // Use the navigate function here
            }}
            className="bg-[#33ADA9] hover:bg-teal-600 text-white font-medium text-xl py-2 px-20 rounded-md"
          >
            Proceed
          </button>
          <button
            onClick={() => {
              navigate("/login"); // Use the navigate function here
            }}
            className="bg-gray-700 hover:bg-gray-600 py-2 rounded-md border font-medium text-xl border-gray-500"
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
