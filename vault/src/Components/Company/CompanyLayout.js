// src/Components/Company/CompanyNavbar.js
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function CompanyNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("company-token");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/homepage" },
    { name: "User's Data", path: "/company-user-data" },
    { name: "Requested Data", path: "/company-requests" },
    { name: "Access Log", path: "/access-log" },
  ];

  return (
    <nav className="relative h-[70px] flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900 dark:text-white z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 dark:text-white">TrustVault</div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-lg">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.path} className="hover:text-blue-600 transition-colors duration-150">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Settings + Theme Toggle */}
      <div className="flex items-center gap-3 relative">
        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xl"
          >
            ⚞
          </button>
          {showSettings && (
            <ul className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 z-50">
              <li>
                <Link
                  to="/company-update-profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Update Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}