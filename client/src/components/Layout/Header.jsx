import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); 
  const [showDropdown, setShowDropdown] = useState(false);

  // remove dropdown from login/ singup page
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  // profile dropdown only on dashboard page
  const isDashboardPage = location.pathname === "/dashboard";

  const handleLogout = () => {
    logoutUser();
    navigate("/login"); 
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold cursor-pointer">
          Event Management
        </div>

        {!isAuthPage && user && (
          <nav>
            <div className="relative inline-block">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded flex items-center"
              >
                {isDashboardPage ? `Welcome, ${user}` : `${user}'s Profile`}
                <span className="ml-2">▼</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md">
                  {isDashboardPage && (
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
