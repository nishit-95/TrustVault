// src/Components/Admin/UserOfAdmin.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UserOfAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    const dummyUsers = [
      { c_full_name: "Alice Johnson", c_email: "alice@example.com", c_phone: "9876543210", c_country: "India" },
      { c_full_name: "Bob Smith", c_email: "bob@example.com", c_phone: "9123456789", c_country: "Canada" },
      { c_full_name: "Charlie Brown", c_email: "charlie@example.com", c_phone: "9988776655", c_country: "Germany" },
      { c_full_name: "David Lee", c_email: "david@example.com", c_phone: "9090909090", c_country: "Australia" },
      { c_full_name: "Eva Green", c_email: "eva@example.com", c_phone: "9011223344", c_country: "Japan" },
      { c_full_name: "Frank Ocean", c_email: "frank@example.com", c_phone: "8000000000", c_country: "France" },
      { c_full_name: "Grace Hopper", c_email: "grace@example.com", c_phone: "9887766554", c_country: "USA" },
      { c_full_name: "Henry Ford", c_email: "henry@example.com", c_phone: "9900112233", c_country: "India" },
      { c_full_name: "Isabella Cruz", c_email: "isabella@example.com", c_phone: "9877887766", c_country: "Canada" },
      { c_full_name: "Jake Paul", c_email: "jake@example.com", c_phone: "9999999999", c_country: "UK" },
    ];

    setUsers(dummyUsers);
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-[#fffacc] via-[#ffe0ec] to-[#ffd6e0] rounded-xl dark:from-gray-900 dark:to-black text-gray-800 dark:text-white">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center text-[#273c75] dark:text-sky-400">
          All Registered Users
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-700"
              data-aos="fade-up"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#4158d0] dark:text-indigo-300 mb-2">
                {user.c_full_name}
              </h3>
              <p className="text-sm"><span className="font-medium">Email:</span> {user.c_email}</p>
              <p className="text-sm"><span className="font-medium">Phone:</span> {user.c_phone}</p>
              <p className="text-sm"><span className="font-medium">Country:</span> {user.c_country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}