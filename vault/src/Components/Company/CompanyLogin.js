// CompanyLogin.js
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    alert("Company logged in successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 px-4 py-10">
      <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 p-10 text-white hidden md:flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Welcome Back, Company!</h2>
          <p className="text-lg">Sign in to manage your consents and data requests.</p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12" data-aos="fade-left">
          <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Company Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Company Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
                placeholder="company@example.com"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-8 right-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="accent-pink-600 w-4 h-4"
              />
              <label>
                I agree to the <span className="text-pink-500 underline cursor-pointer">terms and conditions</span>.
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-semibold transition-all"
            >
              Sign In
            </button>

            <p className="text-sm text-center mt-4">
              Don't have an account?{' '}
              <Link to="/company-register" className="text-pink-600 font-semibold hover:underline">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}