import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminClick = (e) => {
    e.preventDefault(); // Prevent direct navigation
    setShowAdminModal(true); // Show confirmation modal
  };

  const confirmAdminRedirect = () => {
    setShowAdminModal(false);
    navigate("/Admin-login");
  };

  const cancelAdminRedirect = () => {
    setShowAdminModal(false);
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand and Social */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">TrustVault</h2>
          <p className="mb-4 text-sm">
            Secure your digital finance with the trust you deserve.
          </p>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-blue-600 transition"><FaFacebookF /></a>
            <a href="/" className="hover:text-blue-600 transition"><FaTwitter /></a>
            <a href="/" className="hover:text-blue-600 transition"><FaLinkedinIn /></a>
            <a href="https://github.com/nishit-95/TrustVault" className="hover:text-blue-600 transition"><FaGithub /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            <li><a href="/" className="hover:text-blue-600 transition">Terms of Service</a></li>
            <li><a href="/" className="hover:text-blue-600 transition">Documentation</a></li>
            <li><a href="/" className="hover:text-blue-600 transition">Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm mb-4">Get the latest updates, news, and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md focus:outline-none bg-white dark:bg-gray-800 border dark:border-gray-700"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} TrustVault.{" "}
        <button
          onClick={handleAdminClick}
          className="hover:text-blue-600 transition underline"
        >
          All rights reserved.
        </button>
      </div>

      {/* Confirmation Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 text-center rounded-xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Proceed to Admin Login?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmAdminRedirect}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
              <button
                onClick={cancelAdminRedirect}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
