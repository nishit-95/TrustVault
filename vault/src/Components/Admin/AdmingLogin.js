import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setError("");
    alert("Admin logged in successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div
        data-aos="fade-up"
        className="max-w-md w-full bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Admin Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>

          {/* Admin Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">Admin Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-3 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="accent-pink-500 w-4 h-4"
            />
            <label>
              I agree to the{" "}
              <span className="text-blue-400 underline cursor-pointer">
                terms and conditions
              </span>
              .
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-semibold transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
