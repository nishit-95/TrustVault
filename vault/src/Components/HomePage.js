// HomePage.js
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* SVG Animated Background Layer */}
      <svg
        className="absolute top-0 left-0 w-full h-full -z-10 animate-pulse opacity-30 dark:opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="liveGradient" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#8E2DE2" />
            <stop offset="50%" stopColor="#4A00E0" />
            <stop offset="100%" stopColor="#00C9FF" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="300" r="400" fill="url(#liveGradient)" />
      </svg>

      <nav
        className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900 dark:text-white"
        data-aos="fade-down"
      >
        <div className="text-2xl font-bold text-primary" data-aos="zoom-in-right">
          TrustVault
        </div>

        <ul className="flex gap-6 text-lg" data-aos="zoom-in-up">
          <li className="hover:text-primary cursor-pointer" data-aos="fade-up" data-aos-delay="0">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-primary cursor-pointer" data-aos="fade-up" data-aos-delay="100">
            <Link to="/mydata">My Data</Link>
          </li>

          <li className="hover:text-primary cursor-pointer" data-aos="fade-up" data-aos-delay="200">
            <Link to="/grant-consent">Grant Consent</Link>
          </li>
          <li className="hover:text-primary cursor-pointer" data-aos="fade-up" data-aos-delay="300">
            Access Logs
          </li>
          <li className="hover:text-primary cursor-pointer" data-aos="fade-up" data-aos-delay="400">
            Log Out
          </li>
        </ul>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Toggle Theme"
          data-aos="zoom-in-left"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <section className="flex items-center justify-center h-[85vh] px-4 text-center">
        <div data-aos="zoom-in" className="text-4xl md:text-6xl font-extrabold text-primary dark:text-white">
          Welcome to TrustVault 🔐
          <p
            data-aos="fade-up"
            data-aos-delay="500"
            className="text-lg md:text-2xl font-light mt-4 dark:text-white"
          >
            Your data, your power — securely stored and shared.
          </p>
        </div>
      </section>
    </div>
  );
}
