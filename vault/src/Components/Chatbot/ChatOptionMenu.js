// src/Components/Chatbot/ChatOptionMenu.js
import React from "react";
import { Bot, Users2 } from "lucide-react";

export default function ChatOptionMenu({ onClose, position, onSelect }) {
  const isRight = position?.x > window.innerWidth / 2;

  return (
    <div
      className={`absolute z-50 flex flex-col gap-2
        ${isRight ? "items-end right-0" : "items-start left-0"}
        max-w-[90vw] w-fit px-1
      `}
      style={{
        position: "fixed",
        left: isRight ? undefined : position.x,
        right: isRight ? window.innerWidth - position.x - 60 : undefined,
        top: position.y - 90,
      }}
    >
      {/* Chat with Us (AI) */}
      <div
        onClick={() => {
          onSelect("ai");
          console.log("ONSELECT:", onSelect);
          onClose();
        }}
        className="min-w-[140px] max-w-xs px-3 py-1.5 rounded-md shadow-md flex items-center gap-2
          bg-gradient-to-r from-blue-500 to-sky-500
          dark:from-red-500 dark:to-pink-600
          text-white cursor-pointer hover:scale-105
          transition-all duration-200 break-words whitespace-normal text-sm"
      >
        <Bot className="w-4 h-4 shrink-0" />
        <span className="font-medium">Chat with Us</span>
      </div>

      {/* User Chat */}
      <div
        onClick={() => {
          onSelect("user");
          console.log("ONSELECT:", onSelect);
          onClose();
        }}
        className="min-w-[140px] max-w-xs px-3 py-1.5 rounded-md shadow-md flex items-center gap-2
          bg-gradient-to-r from-blue-500 to-sky-500
          dark:from-red-500 dark:to-pink-600
          text-white cursor-pointer hover:scale-105
          transition-all duration-200 break-words whitespace-normal text-sm"
      >
        <Users2 className="w-4 h-4 shrink-0" />
        <span className="font-medium">User Chat</span>
      </div>
    </div>
  );
}