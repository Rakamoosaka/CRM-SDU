import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = ({ isLandingPage, isLoginPage }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`${
        isLandingPage ? "absolute" : isLoginPage ? "mt-0" : "mt-8"
      } bottom-10 flex flex-col items-center text-gray-500 text-xs`}
    >
      <div className="flex gap-4">
        <button
          onClick={() => handleNavigation("/home")}
          className="hover:underline"
        >
          Home
        </button>
        <a
          href="https://sdu.edu.kz/language/en/corporate-development/technopark/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Contact
        </a>
      </div>
      <p className="mt-2">&copy; TOO SDU IT PARK. All rights reserved.</p>
    </div>
  );
};

export default Footer;
