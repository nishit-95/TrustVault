// CompanyRequestForm.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CompanyRequestForm() {
  const [formData, setFormData] = useState({
    document: "",
    userName: "",
    purpose: "",
  });

  const documents = ["Aadhaar Card", "PAN Card", "Business License", "GST Certificate", "Passport"];
  const users = ["Alice Johnson", "Bob Smith", "Charlie Brown", "David Lee", "Eva Green"];

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted:\nDocument: ${formData.document}\nUser: ${formData.userName}\nPurpose: ${formData.purpose}`);
    // You can replace the alert with your actual API logic
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center text-gray-800 dark:text-white transition-colors duration-300">
      <div
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl w-full max-w-lg p-6 sm:p-8"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#273c75] dark:text-sky-400">
          Company Requested Data
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Document Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Document</label>
            <select
              name="document"
              value={formData.document}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              required
            >
              <option value="">Select Document</option>
              {documents.map((doc, idx) => (
                <option key={idx} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          {/* User Dropdown */}
          <div>
            <label className="block mb-1 font-medium">User Name</label>
            <select
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              required
            >
              <option value="">Select User</option>
              {users.map((user, idx) => (
                <option key={idx} value={user}>{user}</option>
              ))}
            </select>
          </div>

          {/* Purpose Text Box */}
          <div>
            <label className="block mb-1 font-medium">Purpose</label>
            <textarea
              name="purpose"
              rows="4"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white resize-none"
              placeholder="Enter purpose here..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200 font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
