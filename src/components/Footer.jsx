import React from "react";

const Footer = ({ isLandingPage, isLoginPage }) => {
  return (
    <div
      className={`${
        isLandingPage ? "absolute" : isLoginPage ? "mt-0" : "mt-8"
      } bottom-10 flex flex-col items-center text-gray-500 text-xs`}
    >
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
  );
};

export default Footer;
