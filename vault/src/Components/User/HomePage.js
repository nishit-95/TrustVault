import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300 text-gray-900 dark:text-white relative overflow-hidden">
      
      {/* SVG Background Glow */}
      <svg
        className="absolute top-0 left-0 w-full h-full -z-10 animate-pulse opacity-20 dark:opacity-40"
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

      {/* Welcome Card */}
      <div
        data-aos="fade-up"
        className="bg-white/70 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-10 md:p-16 max-w-xl text-center"
      >
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-full shadow-lg animate-bounce">
            <ShieldCheck size={36} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h1
          data-aos="zoom-in"
          className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text mb-4"
        >
          Welcome to TrustVault 
        </h1>

        {/* Subtext */}
        <p
          data-aos="fade-up"
          data-aos-delay="500"
          className="text-base md:text-lg text-gray-700 dark:text-gray-300"
        >
          Your data, your power — <br /> securely stored and shared with confidence.
        </p>
      </div>
    </div>
  );
}