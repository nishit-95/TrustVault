// src/Components/Admin/SubscriberOfAdmin.js
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SubscriberOfAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

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

  const handleRowClick = (row) => {
    if (window.innerWidth < 768) {
      setSelectedRow(row);
    }
  };

  const closeModal = () => setSelectedRow(null);

  const handleResponse = (email) => {
    alert(`Responded to subscriber: ${email}`);
  };

  return (
    <div className="overflow-x-auto">
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#f9f871] via-[#fdd9e0] to-[#fce4ec] rounded-xl dark:from-gray-900 dark:to-black text-gray-900 dark:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#d63384] dark:text-sky-400">
          Subscriber List
        </h2>

        <div className="shadow-xl border border-gray-200 dark:border-gray-700 bg-white/80 rounded-xl dark:bg-gray-900 backdrop-blur-md overflow-x-auto md:overflow-hidden hide-scrollbar">
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
                    onClick={() => handleRowClick(sub)}
                    className={`cursor-pointer border-t dark:border-gray-700 ${
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResponse(sub.email);
                        }}
                        className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-all"
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

      {/* Mobile Popup Modal */}
      {selectedRow && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-sm mx-auto text-gray-800 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center text-pink-600 dark:text-sky-400">
              Subscriber Details
            </h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <strong>Email:</strong> {selectedRow.email}
              </li>
              <li>
                <strong>Date:</strong>{" "}
                {new Date(selectedRow.subscribedAt).toLocaleDateString()}
              </li>
              <li>
                <strong>Time:</strong>{" "}
                {new Date(selectedRow.subscribedAt).toLocaleTimeString()}
              </li>
            </ul>
            <button
              onClick={() => {
                handleResponse(selectedRow.email);
                closeModal();
              }}
              className="w-full mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-all"
            >
              Respond
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}