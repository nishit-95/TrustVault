import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Briefcase } from "lucide-react";

export default function CompanyHomepage() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 via-yellow-100 to-sky-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-white transition-colors duration-500">
      <div
        className="bg-white/70 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-10 md:p-16 max-w-xl text-center"
        data-aos="fade-up"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full shadow-lg animate-bounce">
            <Briefcase size={36} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 mb-4">
          Welcome, Company Partner
        </h1>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
          We're excited to have you on board. Explore the tools built to help you securely access documents and manage your organization’s digital space with confidence.
        </p>
      </div>
    </div>
  );
}