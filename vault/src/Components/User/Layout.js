import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogoutClick = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("token");
    navigate("/");
  };
  const cancelLogout = () => setShowLogoutModal(false);

  const navLinks = [
    { name: "Home", path: "/homepage" },
    { name: "My Data", path: "/mydata" },
    { name: "Grant Consent", path: "/grant-consent" },
    { name: "Access Logs", path: "/access-log" },
    { name: "Update Profile", path: "/update-profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white transition-colors duration-300 relative">
      
      {/* Navbar */}
      <nav className="relative h-[70px] flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900 dark:text-white z-50">
        <div className="text-2xl font-bold text-primary">TrustVault</div>

        {/* Desktop Right-Aligned Nav + Settings */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-lg">
            {navLinks
              .filter((link) => link.name !== "Update Profile")
              .map((link, index) => (
                <li key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <Link to={link.path} className="hover:text-primary transition-colors duration-150">
                    {link.name}
                  </Link>
                </li>
              ))}
          </ul>

          {/* Gear + Theme Toggle */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
            <li className="relative group list-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800">
                <button className="text-2xl text-gray-800 dark:text-white transition-transform duration-[1200ms] group-hover:rotate-[120deg]">
                  ⛮
                </button>
              </div>
              <ul className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <li>
                  <Link
                    to="/update-profile"
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Update Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogoutClick}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </li>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800">
              <button onClick={toggleTheme} className="text-gray-800 dark:text-white" aria-label="Toggle Theme">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Hamburger for Mobile */}
        <button className="md:hidden text-gray-800 dark:text-white" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      )}

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white dark:bg-gray-900 shadow-lg z-50 transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 p-6 space-y-6`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="block text-lg text-gray-800 dark:text-white font-medium hover:underline"
            onClick={toggleSidebar}
          >
            {link.name}
          </Link>
        ))}

        <hr className="border-gray-300 dark:border-gray-700" />

        <button
          onClick={() => {
            toggleSidebar();
            handleLogoutClick();
          }}
          className="block w-full text-left text-red-600 dark:text-red-400 font-semibold"
        >
          Log Out
        </button>

        <button
          onClick={toggleTheme}
          className="mt-4 flex items-center gap-2 text-gray-700 dark:text-white"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 text-center rounded-xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
}