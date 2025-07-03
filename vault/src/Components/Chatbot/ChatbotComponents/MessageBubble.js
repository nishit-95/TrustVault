import React from "react";

export default function MessageBubble({ text, isSender }) {
  return (
    <div
      className={`max-w-[80%] px-3 py-2 text-sm rounded-lg shadow 
        ${isSender 
          ? "bg-blue-600 text-white self-end ml-auto text-right" 
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white self-start text-left"
        }`}
    >
      {text}
    </div>
  );
}