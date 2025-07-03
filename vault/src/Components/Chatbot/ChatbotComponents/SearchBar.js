import React, { useState } from "react";

export default function SearchBar({ onUserSelect }) {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearchResult(null);
    setNotFound(false);

    try {
      // 🔄 Replace with your actual backend/API/Firebase query
      const mockUsers = [
        { id: "u1", name: "Jeel Donga", email: "jeel@example.com" },
        { id: "u2", name: "Aryan Patel", email: "aryan@trustvault.com" },
      ];

      const foundUser = mockUsers.find(
        (user) => user.email.toLowerCase() === searchEmail.toLowerCase()
      );

      if (foundUser) {
        setSearchResult(foundUser);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-3 border-b dark:border-gray-700">
      <div className="flex gap-2 mb-3">
        <input
          type="email"
          placeholder="Enter email to search..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {searchResult && (
        <div className="p-3 rounded-lg bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-md">
          <div className="font-medium text-gray-800 dark:text-white">
            {searchResult.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            {searchResult.email}
          </div>
          <button
            onClick={() => onUserSelect(searchResult)}
            className="mt-2 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Start Chat
          </button>
        </div>
      )}

      {notFound && (
        <div className="text-sm text-red-500 dark:text-red-400 mt-2">
          User not found
        </div>
      )}
    </div>
  );
}
