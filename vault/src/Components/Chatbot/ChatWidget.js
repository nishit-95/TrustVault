import React, { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import FloatingChatButton from "./FloatingChatButton";
import ChatOptionMenu from "./ChatOptionMenu";
import ChatWithUsWindow from "./ChatWithUsWindow";
import UserToUserChat from "./UserToUserChat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);         // menu open
  const [chatType, setChatType] = useState(null);      // "ai" | "user" | null
  const [buttonPosition, setButtonPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 100,
  });

  const toggleMenu = () => {
    if (chatType) {
      setChatType(null); // close active chat first
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (type) => {
    setChatType(type); // "ai" or "user"
    setIsOpen(false);  // hide menu
  };

  return (
    <>
      {/* Chat windows */}
      {chatType === "ai" && <ChatWithUsWindow onClose={() => setChatType(null)} />}
      {chatType === "user" && <UserToUserChat onClose={() => setChatType(null)} />}

      {/* Options dropdown */}
      {isOpen && !chatType && (
        <ChatOptionMenu
          onClose={() => setIsOpen(false)}
          position={buttonPosition}
          onSelect={handleOptionClick}
        />
      )}

      {/* Floating button */}
      <FloatingChatButton
        isOpen={isOpen || !!chatType}
        position={buttonPosition}
        setPosition={setButtonPosition}
        onClick={toggleMenu}
        icon={chatType ? <X size={18} /> : <MessageCircle size={18} />}
      />
    </>
  );
}