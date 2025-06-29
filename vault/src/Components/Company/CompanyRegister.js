import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CompanyRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { companyName, email, password, confirmPassword, agreeTerms } = formData;

    if (!companyName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setError("");
    alert("Company registered successfully");
    navigate("/company-login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300 items-center justify-center p-10">
        <div className="text-center" data-aos="fade-right">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome Company!</h2>
          <p className="text-lg text-gray-700 max-w-md">
            Create your TrustVault company account to securely access user data with transparency and compliance.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl"
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Company Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
                placeholder="TrustVault Pvt Ltd"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Company Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
                placeholder="company@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
                placeholder="********"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
                placeholder="********"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="accent-pink-600 w-4 h-4"
              />
              <label>
                I agree to the <span className="underline text-blue-600 cursor-pointer">terms and conditions</span>.
              </label>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>

            {/* Switch to Login */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/company-login" className="text-pink-600 hover:underline font-medium">
                Login instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}