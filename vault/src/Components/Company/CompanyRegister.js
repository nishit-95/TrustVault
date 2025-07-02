import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const countries = ["India", "United States", "Canada", "Germany", "Australia", "Japan", "France"];

export default function CompanyRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "companyName":
        return !value || value.length > 40 ? "Company name is required (max 40 chars)." : "";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format.";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Phone must be exactly 10 digits.";
      case "country":
        return countries.includes(value) ? "" : "Select a valid country.";
      case "password":
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/.test(value)
          ? ""
          : "8–15 chars with upper, lower, number, and special character.";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match.";
      case "agreeTerms":
        return value ? "" : "You must agree to terms.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, fieldValue),
    }));
  };

  const handlePhoneInput = (e) => {
    const allowed = /^[0-9]$/.test(e.key) || ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(e.key);
    if (!allowed) e.preventDefault();
  };

  const handlePhonePaste = (e) => {
    if (!/^\d+$/.test(e.clipboardData.getData("text"))) e.preventDefault();
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const payload = { ...formData };
        delete payload.confirmPassword;

        // Optional: Replace this with actual API call
        console.log("Registered:", payload);

        toast.success("Company registered successfully!", { position: "top-center" });
        setTimeout(() => navigate("/company-login"), 4000);
      } catch (err) {
        toast.error("Something went wrong. Try again.", { position: "top-center" });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 px-4 py-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md bg-white/30 border border-white/20">
          
          {/* 🔵 Left Box Panel */}
          <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-purple-300 via-indigo-500 to-blue-500 p-10 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <div className="flex flex-col items-center text-center space-y-6 relative">
              <div className="relative w-36 h-36 animate-float">
                <div className="absolute inset-0 rounded-full bg-white to-gray-200 shadow-xl flex items-center justify-center text-4xl font-bold text-blue-700 z-10">
                  TV
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-white animate-pulse-glow z-0"></div>
              </div>

              <h2 className="text-4xl font-bold text-white drop-shadow-lg" data-aos="fade-down">
                Join TrustVault 🚀
              </h2>
              <p className="text-white text-lg max-w-md drop-shadow-sm" data-aos="fade-up" data-aos-delay="200">
                Build trust with your clients through secure, verified, and transparent company access.
              </p>
            </div>
          </div>

          {/* 🟢 Right Box Form Panel */}
          <div className="w-full md:w-1/2 p-6 md:p-10 bg-white rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none"
            data-aos={window.innerWidth < 768 ? "zoom-in" : ""}
            data-aos-delay={window.innerWidth < 768 ? "100" : ""}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Company Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Company Name */}
              <div>
                <label className="block text-sm mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="TrustVault Pvt Ltd"
                />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="company@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  maxLength={10}
                  inputMode="numeric"
                  onKeyDown={handlePhoneInput}
                  onPaste={handlePhonePaste}
                  value={formData.phone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, phone: digits });
                    setErrors((prev) => ({ ...prev, phone: validateField("phone", digits) }));
                  }}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="1234567890"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${errors.country ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="" disabled>Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 pr-10 rounded-md bg-gray-100 border ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  placeholder="********"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-sm mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 pr-10 rounded-md bg-gray-100 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                  placeholder="********"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-gray-600">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>

              {/* Agree to Terms */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 accent-pink-600"
                />
                <label className="text-sm">
                  I agree to the{" "}
                  <span className="underline text-blue-600 cursor-pointer">terms and conditions</span>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition"
              >
                Register
              </button>

              <p className="text-sm text-center text-gray-600 mt-3">
                Already have an account?{" "}
                <Link to="/company-login" className="text-pink-600 hover:underline font-medium">
                  Login instead
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* 🎨 Floating & Glowing CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.6);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
      `}</style>

    </>
  );
}