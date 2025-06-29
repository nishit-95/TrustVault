// src/Components/Navbar.js
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelectionModal from "./RoleSelectionModal";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [modalAction, setModalAction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">
          TrustVault
        </Link>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* Login Button */}
          <button
            onClick={() => setModalAction("login")}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </button>

          {/* Sign Up Button */}
          <button
            onClick={() => setModalAction("register")}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-100"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        show={modalAction !== null}
        actionType={modalAction}
        onClose={() => setModalAction(null)}
      />
    </>
  );
}
