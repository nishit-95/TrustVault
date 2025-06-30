// src/Components/RoleSelectionPopup.js
import { useEffect } from "react";
import { User, Briefcase, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoleSelectionPopup({ show, onClose, actionType }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [show]);

  if (!show) return null;

  // Compute path based on actionType ("login" or "register")
  const getPath = (role) => {
    if (role === "user") return actionType === "login" ? "/login" : "/register";
    if (role === "company") return actionType === "login" ? "/company-login" : "/company-register";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-xl animate-fade-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Choose Your Role
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          Select whether you want to{" "}
          <span className="font-semibold capitalize">{actionType}</span> as a{" "}
          <span className="text-blue-600">User</span> or a{" "}
          <span className="text-pink-500">Company</span>
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              navigate(getPath("user"));
              onClose();
            }}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            <User size={20} /> User {actionType === "login" ? "Login" : "Sign Up"}
          </button>

          <button
            onClick={() => {
              navigate(getPath("company"));
              onClose();
            }}
            className="flex items-center justify-center gap-3 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition"
          >
            <Briefcase size={20} /> Company {actionType === "login" ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
