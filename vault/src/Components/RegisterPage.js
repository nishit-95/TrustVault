import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
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
          {/* Decorative blobs */}
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30 z-0"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-400 rounded-full blur-2xl opacity-30 z-0"></div>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:p-10 bg-white/90 rounded-r-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create your TrustVault Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[{ label: "Full Name", name: "fullName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "tel" },
              { label: "Country", name: "country", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="relative">
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 bg-white rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-transparent"
                  placeholder={label}
                  required
                />
                <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-500">
                  {label}
                </label>
              </div>
            ))}

            {/* Password Field with Toggle */}
            {[{
              label: "Password",
              name: "password",
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
                  className="peer w-full border border-gray-300 bg-white rounded-xl px-4 pt-5 pb-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-transparent"
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
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}