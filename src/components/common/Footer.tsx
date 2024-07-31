import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">ElderWiseCare</h2>
          <p className="text-gray-400 text-sm mb-4">
            Providing exceptional care for the elderly with a personal touch.
          </p>
          <div className="flex space-x-4 mb-2">
            <a href="#" className="text-gray-400 hover:text-white">
            <FaFacebook/>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
            <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
            <FaTiktok />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
      <div className="bg-gray-700 text-center py-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ElderWiseCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
