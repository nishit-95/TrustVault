import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  chatTitle = "Chat",
  messages = [],
  onSend,
  onClose,
  input,
  setInput,
  currentUserId,
}) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-[90vw] max-w-sm h-[75vh] bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg flex flex-col z-50">
      {/* Header */}
      <div className="p-3 flex justify-between items-center bg-blue-600 text-white rounded-t-xl">
        <span className="font-semibold text-base">{chatTitle}</span>
        <X onClick={onClose} className="cursor-pointer hover:opacity-70" />
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            text={msg.text}
            isSender={msg.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t dark:border-gray-700 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-2 text-sm rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
