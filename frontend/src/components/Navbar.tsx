import React from "react";
import Logo from "./../assets/logo.svg";

const Navbar = () => {
  return (
    <>
      <div className="navbar-left">
        <h3>Summario</h3>
      </div>
      <div className="navbar-right">
        <a href="#">Home</a>
        <a href="#">Options</a>
        <a href="#">About</a>
      </div>
    </>
  );
};

export default Navbar;
