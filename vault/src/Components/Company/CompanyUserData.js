// CompanyUserDocuments.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CompanyUserDocuments() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });

    const dummyDocs = [
      {
        docName: "Business License.pdf",
        userName: "Alice Johnson",
        startTime: "2024-06-01 09:00 AM",
        endTime: "2024-06-01 05:00 PM",
      },
      {
        docName: "GST Certificate.docx",
        userName: "Bob Smith",
        startTime: "2024-06-02 10:00 AM",
        endTime: "2024-06-02 06:00 PM",
      },
      {
        docName: "Company PAN Card.jpg",
        userName: "Charlie Brown",
        startTime: "2024-06-03 08:30 AM",
        endTime: "2024-06-03 04:00 PM",
      },
      {
        docName: "Address Proof.pdf",
        userName: "David Lee",
        startTime: "2024-06-04 11:00 AM",
        endTime: "2024-06-04 07:00 PM",
      },
      {
        docName: "Trade Certificate.png",
        userName: "Eva Green",
        startTime: "2024-06-05 09:15 AM",
        endTime: "2024-06-05 05:30 PM",
      },
    ];

    setDocs(dummyDocs);
  }, []);

  const handleView = (docName) => {
    alert(`Viewing document: ${docName}`);
  };

  return (
    <div className="h-auto overflow-y-auto min-h-screen px-6 py-8 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#273c75] dark:text-sky-400">
          Company Document Access
        </h2>

        <div className="overflow-hidden">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-left">
                <th className="p-4">Sr. No.</th>
                <th className="p-4">Document Name</th>
                <th className="p-4">User Name</th>
                <th className="p-4">Start Time</th>
                <th className="p-4">End Time</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-700"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{doc.docName}</td>
                  <td className="p-4">{doc.userName}</td>
                  <td className="p-4">{doc.startTime}</td>
                  <td className="p-4">{doc.endTime}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleView(doc.docName)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {docs.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No documents available yet.
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