import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-4 bg-gray-900 text-gray-200 border-b border-gray-800">
      <div className="navbar-left cursor-pointer">
        <Link to="/">
          <h3>Summario</h3>
        </Link>
      </div>
      <div className="navbar-right space-x-4">
        <Link to="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link to="/" className="hover:text-blue-400 transition-colors">
          Options
        </Link>
        <Link to="/About" className="hover:text-blue-400 transition-colors">
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
