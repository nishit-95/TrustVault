// src/Components/Admin/SubscriberOfAdmin.js
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SubscriberOfAdmin() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Dummy subscriber data
    const dummySubscribers = [
      { email: "alice@example.com", subscribedAt: "2025-06-26T10:30:00" },
      { email: "bob@example.com", subscribedAt: "2025-06-25T09:45:00" },
      { email: "charlie@example.com", subscribedAt: "2025-06-24T11:00:00" },
      { email: "david@example.com", subscribedAt: "2025-06-23T13:15:00" },
      { email: "eva@example.com", subscribedAt: "2025-06-22T16:30:00" },
      { email: "frank@example.com", subscribedAt: "2025-06-21T14:10:00" },
      { email: "grace@example.com", subscribedAt: "2025-06-20T15:45:00" },
      { email: "henry@example.com", subscribedAt: "2025-06-19T10:10:00" },
      { email: "isabella@example.com", subscribedAt: "2025-06-18T12:00:00" },
      { email: "jake@example.com", subscribedAt: "2025-06-17T11:45:00" },
    ];

    setSubscribers(dummySubscribers);
  }, []);

  const handleResponse = (email) => {
    alert(`Responded to subscriber: ${email}`);
    // Response logic here
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#f9f871] via-[#fdd9e0] to-[#fce4ec] dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#d63384] dark:text-sky-400">
          Subscriber List
        </h2>

        <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900 backdrop-blur-md">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-pink-600 text-white uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Sr. No</th>
                <th className="px-6 py-4">Email ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Response</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => {
                const dateObj = new Date(sub.subscribedAt);
                const date = dateObj.toLocaleDateString();
                const time = dateObj.toLocaleTimeString();

                return (
                  <tr
                    key={index}
                    className={`border-t dark:border-gray-700 ${
                      index % 2 === 0
                        ? "bg-white/60 dark:bg-gray-800/60"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                    data-aos="fade-up"
                  >
                    <td className="px-6 py-3 font-medium">{index + 1}</td>
                    <td className="px-6 py-3">{sub.email}</td>
                    <td className="px-6 py-3">{date}</td>
                    <td className="px-6 py-3">{time}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleResponse(sub.email)}
                        className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all"
                      >
                        Respond
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
