import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const countries = ["India", "United States", "Canada", "Germany", "Australia", "Japan", "France"];

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "user@example.com", // Pre-filled and disabled
    phone: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName" && value.length > 20) return;
    if (name === "phone" && value.length > 10) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!/^[A-Za-z\s]+$/.test(formData.fullName)) newErrors.fullName = "Only letters allowed";
    if (formData.fullName.length > 20) newErrors.fullName = "Max 20 characters";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Must be 10 digits";

    if (!formData.country) newErrors.country = "Please select a country";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Profile Updated:", formData);
      alert("Profile Updated Successfully");
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      alert("Account Deleted"); // later integrate backend here
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300">
      <div
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">Update Profile</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            placeholder="Enter your name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit number"
            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Country */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          >
            <option value="">-- Select Country --</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        {/* Submit Button */}
        <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-md shadow-md hover:bg-green-700 transition-all duration-200 mb-4"
            >
            Submit
        </button>

        {/* Delete Account */}
        <button
          onClick={handleDeleteAccount}
          className="w-full border-2 border-red-600 text-red-600 py-3 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}