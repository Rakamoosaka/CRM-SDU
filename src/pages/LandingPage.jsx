import React from "react";

const LandingPage = () => {
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
          <button className="bg-[#33ADA9] hover:bg-teal-600 text-white font-medium text-xl py-2 px-20 rounded-md">
            Proceed
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded-md border font-medium text-xl border-gray-500">
            Log in as admin
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 flex flex-col items-center text-gray-500 text-xs">
        <button className="border border-gray-500 px-4 py-1 rounded-md mb-4">
          lorem
        </button>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
        <p className="mt-2">&copy; TOO SDU IT PARK. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
