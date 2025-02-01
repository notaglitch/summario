import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-4 bg-gray-800 text-white">
      <div className="navbar-left cursor-pointer">
        <Link to="/">
          <h3>Summario</h3>
        </Link>
      </div>
      <div className="navbar-right space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/" className="hover:underline">
          Options
        </Link>
        <Link to="/About" className="hover:underline">
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
