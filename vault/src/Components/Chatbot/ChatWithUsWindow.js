import React, { useState } from "react";
import ChatWindow from "./ChatbotComponents/ChatWindow";
import MessageBubble from "./ChatbotComponents/MessageBubble";
import { X } from "lucide-react";

export default function ChatWithUsWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I assist you today?", sender: "ai" },
    { id: 2, text: "Can you explain what TrustVault does?", sender: "user" },
    { id: 3, text: "Sure! TrustVault helps users control and share their data securely with companies.", sender: "ai" },
    { id: 4, text: "Wow, sounds cool. Is my data safe?", sender: "user" },
    { id: 5, text: "Absolutely. You have full control over who accesses your data.", sender: "ai" },
  ]);

  return (
    <div
      className="fixed bottom-20 right-4 w-[320px] max-h-[80vh]
      bg-white dark:bg-gray-900 shadow-xl rounded-xl flex flex-col
      overflow-hidden border dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-500 dark:from-red-500 dark:to-pink-600 text-white">
        <span className="font-semibold text-sm">Chat with TrustVault AI</span>
        <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
      </div>

      {/* Chat messages */}
      <ChatWindow>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
      </ChatWindow>

      {/* Input bar can be added here later */}
    </div>
  );
}