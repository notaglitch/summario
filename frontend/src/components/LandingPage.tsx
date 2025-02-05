import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Link clicked");
    navigate("/upload");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-gray-200">
      <h1 className="text-center">Landing page</h1>
      <Link
        to="/upload"
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go to File Upload
      </Link>
    </div>
  );
};

export default LandingPage;
