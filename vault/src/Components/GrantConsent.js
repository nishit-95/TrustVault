// GrantConsent.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function GrantConsent() {
  const [company, setCompany] = useState("");
  const [dataType, setDataType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = () => {
    if (company && dataType && purpose && startTime && endTime) {
      const consentInfo = {
        company,
        dataType,
        purpose,
        startTime,
        endTime,
      };
      console.log("Consent Given:", consentInfo);
      // Further logic or toast can be added
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300">
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8"
        data-aos="zoom-in"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Grant Consent</h2>

        <div className="space-y-6">
          {/* Company List */}
          <div>
            <label className="block mb-2 font-medium">Select Company</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">-- Choose Company --</option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              <option value="TCS">TCS</option>
            </select>
          </div>

          {/* Data To Share */}
          <div>
            <label className="block mb-2 font-medium">Data to Share</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
            >
              <option value="">-- Select Data Type --</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="PAN">PAN</option>
              <option value="Bank Statement">Bank Statement</option>
              <option value="Medical Record">Medical Record</option>
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="block mb-2 font-medium">Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Verification, KYC"
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Duration */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-primary text-white px-8 py-3 rounded-md shadow-md hover:scale-105 transition-transform"
              data-aos="zoom-in-up"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}