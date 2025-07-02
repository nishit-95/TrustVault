import React, { useState } from "react";
import SearchBar from "./ChatbotComponents/SearchBar";
import ChatWindow from "./ChatbotComponents/ChatWindow";

export default function UserToUserChat({ onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Simulate your logged-in user ID (replace with real auth later)
  const currentUserId = "current-user-id";

  const handleSendMessage = (text) => {
    const newMsg = {
      senderId: currentUserId,
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulated response (for testing)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          senderId: selectedUser.id,
          text: "Got it! ✅",
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 800);
  };

  return (
    <div>
      {!selectedUser ? (
        <SearchBar onUserSelect={(user) => setSelectedUser(user)} />
      ) : (
        <ChatWindow
          chatTitle={`Chat with ${selectedUser.name}`}
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSendMessage}
          onClose={onClose}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}