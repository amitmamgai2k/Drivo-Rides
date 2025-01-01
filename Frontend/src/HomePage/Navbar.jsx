// Navbar.js
import React, { useState } from "react";

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">Uber</div>

        {/* Links */}
        <ul className="flex items-center space-x-8">
          <li>
            <a href="/" className="hover:text-gray-400">Ride</a>
          </li>
          <li>
            <a href="/drive" className="hover:text-gray-400">Drive</a>
          </li>
          <li>
            <a href="/business" className="hover:text-gray-400">Business</a>
          </li>
          {/* Dropdown for About */}
          <li className="relative">
            <button
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="hover:text-gray-400 flex items-center"
            >
              About
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isAboutOpen && (
              <ul className="absolute top-10 left-0 bg-white text-black shadow-lg py-2 rounded-md">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="/about-us">About Us</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="/careers">Careers</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="/press">Press</a>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Right-side Actions */}
        <ul className="flex items-center space-x-6">
          <li>
            <a href="/language" className="hover:text-gray-400">
              <span className="flex items-center">
                🌐 EN
              </span>
            </a>
          </li>
          <li>
            <a href="/help" className="hover:text-gray-400">Help</a>
          </li>
          <li>
            <a href="/login" className="hover:text-gray-400">Log in</a>
          </li>
          <li>
            <a
              href="/signup"
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
            >
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
