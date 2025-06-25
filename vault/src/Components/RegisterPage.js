import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const countries = ["India", "United States", "Canada", "Germany", "Australia", "Japan", "France"];

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    c_full_name: "",
    c_email: "",
    c_password: "",
    confirmPassword: "",
    c_phone: "",
    c_country: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "c_full_name":
        return !value || value.length > 20 ? "Name is required and must be under 20 characters." : "";
      case "c_email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";
      case "c_phone":
        return /^\d{10}$/.test(value) ? "" : "Phone number must be exactly 10 digits.";
      case "c_country":
        return countries.includes(value) ? "" : "Please select a valid country.";
      case "c_password":
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/.test(value) ? "" : "Password must be 8-15 characters with upper, lower, digit, and special character.";
      case "confirmPassword":
        return value === formData.c_password ? "" : "Passwords do not match.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
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
        // Only send backend fields
        const payload = {
          c_full_name: formData.c_full_name,
          c_email: formData.c_email,
          c_password: formData.c_password,
          c_phone: formData.c_phone,
          c_country: formData.c_country,
        };
        const response = await fetch("http://localhost:5002/api/UserApi/Register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          setIsRegistered(true);
          toast.success("Registration successful! Redirecting to login...", { position: "top-center" });
          setTimeout(() => navigate("/login"), 5000);
        } else {
          const errorData = await response.json();
          setErrors({ api: errorData.message || "Registration failed." });
          toast.error(errorData.message || "Registration failed.", { position: "top-center" });
        }
      } catch (error) {
        setErrors({ api: "Network error. Please try again." });
        toast.error("Network error. Please try again.", { position: "top-center" });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 px-4">
        <div
          data-aos="zoom-in"
          className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full bg-white/20 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden"
        >
          {/* Left Panel */}
          <div className="hidden md:flex flex-col justify-center items-center relative p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-90 z-0"></div>
            <div className="relative z-10 text-white space-y-6 text-center">
              <h1 className="text-4xl font-extrabold tracking-wide">TrustVault</h1>
              <p className="text-lg max-w-sm mx-auto">Experience the future of secure financial services with luxury style and high-grade security.</p>
              <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-xl font-bold bg-gradient-to-br from-white to-gray-300 text-black mx-auto">
                TV
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30 z-0"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-400 rounded-full blur-2xl opacity-30 z-0"></div>
          </div>

          {/* Right Panel */}
          <div className="p-8 md:p-10 bg-white/90 rounded-r-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create your TrustVault Account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name, Email, Phone */}
              {["c_full_name", "c_email", "c_phone"].map((name) => {
                const label = name === "c_full_name" ? "Full Name" : name === "c_email" ? "Email" : "Phone Number";
                const type = name === "c_email" ? "email" : name === "c_phone" ? "tel" : "text";
                return (
                  <div key={name} className="relative">
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className={`peer w-full border ${errors[name] ? 'border-red-500' : 'border-gray-300'} bg-white rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-transparent`}
                      placeholder={label}
                      required
                    />
                    <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-500">
                      {label}
                    </label>
                    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                  </div>
                );
              })}

              {/* Country Dropdown */}
              <div className="relative">
                <input
                  list="country-list"
                  name="c_country"
                  value={formData.c_country}
                  onChange={handleChange}
                  placeholder="Country"
                  className={`peer w-full border ${errors.c_country ? 'border-red-500' : 'border-gray-300'} bg-white rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-transparent`}
                  required
                />
                <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-500">
                  Country
                </label>
                <datalist id="country-list">
                  {countries.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
                {errors.c_country && <p className="text-red-500 text-xs mt-1">{errors.c_country}</p>}
              </div>

              {/* Passwords */}
              {[{
                label: "Password",
                name: "c_password",
                type: showPassword ? "text" : "password",
                toggle: () => setShowPassword(!showPassword),
                icon: showPassword ? <EyeOff size={20} /> : <Eye size={20} />,
              }, {
                label: "Confirm Password",
                name: "confirmPassword",
                type: showConfirmPassword ? "text" : "password",
                toggle: () => setShowConfirmPassword(!showConfirmPassword),
                icon: showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />,
              }].map(({ label, name, type, toggle, icon }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`peer w-full border ${errors[name] ? 'border-red-500' : 'border-gray-300'} bg-white rounded-xl px-4 pt-5 pb-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-transparent`}
                    placeholder={label}
                    required
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-500">
                    {label}
                  </label>
                  <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {icon}
                  </button>
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition"
              >
                Create Account
              </button>

              {isRegistered && (
                <div className="mt-4 text-center text-green-600 text-sm"></div>
              )}

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full py-2 mt-2 text-blue-600 font-medium underline hover:text-blue-800"
              >
                Sign In Instead
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}