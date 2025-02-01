import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-4 bg-gray-800 text-white">
      <div className="navbar-left">
        <h3>Summario</h3>
      </div>
      <div className="navbar-right space-x-4">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          Options
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
      </div>
    </div>
  );
};

export default Navbar;
