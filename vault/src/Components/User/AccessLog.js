// AccessLog.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AccessLog() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = "/login"; // Redirect if no token
      return;
    }
    AOS.init({ duration: 1200, once: false });
  }, []);

  // Dummy access log data (you can replace with real API data)
  const logs = [
    {
      id: 1,
      document: "Aadhaar Card",
      time: "2025-06-26 14:30",
      accessedBy: "Gov Agency X",
      location: "Delhi, India",
      notes: "Verified identity for eKYC"
    },
    {
      id: 2,
      document: "PAN Card",
      time: "2025-06-25 10:15",
      accessedBy: "Bank Y",
      location: "Mumbai, India",
      notes: "Account opening"
    },
    {
      id: 3,
      document: "Passport",
      time: "2025-06-20 18:45",
      accessedBy: "Travel Portal Z",
      location: "Online",
      notes: "Visa application"
    },
  ];

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300">
      <div
        className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">Access Logs</h2>

        <div className="overflow-hidden">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-left">
                <th className="p-4">Sr. No.</th>
                <th className="p-4">Document</th>
                <th className="p-4">Access Time</th>
                <th className="p-4">Accessed By</th>
                <th className="p-4">Location</th>
                <th className="p-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-300 dark:border-gray-700"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{log.document}</td>
                  <td className="p-4">{log.time}</td>
                  <td className="p-4">{log.accessedBy}</td>
                  <td className="p-4">{log.location}</td>
                  <td className="p-4">{log.notes}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No logs available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}