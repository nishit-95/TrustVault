// src/Components/Admin/AdminLayout.js
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Users, Building2, MailOpen, Menu, X, Sun, Moon, LogOut } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/user-of-admin", label: "Users", icon: <Users size={20} /> },
    { path: "/company-user-of-admin", label: "Companies", icon: <Building2 size={20} /> },
    { path: "/subscriber-of-admin", label: "Subscribers", icon: <MailOpen size={20} /> },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout from Admin Desk?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-tr from-[#fdfcfb] via-[#e2ebf0] to-[#f7faff] dark:from-[#1f1f2f] dark:to-[#0f0f1a] text-gray-800 dark:text-gray-100 font-sans">

      {/* Backdrop for closing sidebar on outside click */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed z-50 top-0 left-0 h-full w-64 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        backdrop-blur-md bg-white/90 dark:bg-[#151525] shadow-2xl border-r border-gray-300 dark:border-gray-700`}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-extrabold text-[#273c75] dark:text-indigo-300 tracking-wide">
              Admin Desk
            </h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-600 dark:text-gray-300">
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-5 pt-6 space-y-4">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-4 px-4 py-2 rounded-xl font-medium transition-all duration-200
              ${
                pathname === path
                  ? "bg-gradient-to-r from-[#4158d0] via-[#c850c0] to-[#ffcc70] text-white shadow-md"
                  : "hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-[#2e2e60] dark:hover:to-[#3a3a6a] text-gray-700 dark:text-gray-200"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {/* Divider */}
          <hr className="border-gray-300 dark:border-gray-700 my-4" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-2 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>

          {/* Theme Toggle Button with Label */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-4 w-full px-4 py-2 rounded-xl font-medium text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            Theme Change
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">

        {/* Mobile Topbar */}
        <header className="md:hidden flex justify-between items-center p-4 shadow bg-white dark:bg-[#1a1a2a] border-b dark:border-gray-700">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700 dark:text-gray-300">
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold text-[#273c75] dark:text-indigo-300">Admin Dashboard</h2>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="bg-white/80 dark:bg-[#202034] backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-h-[85vh] transition-all">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}