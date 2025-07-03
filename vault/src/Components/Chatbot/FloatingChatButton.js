import React, { useState, useEffect } from "react";
import { MessageSquare , X } from "lucide-react";
import ChatOptionMenu from "./ChatOptionMenu";

export default function FloatingChatButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(false);
  const [buttonSize, setButtonSize] = useState(60);

  // Set initial position and responsive button size
  useEffect(() => {
    const updateSizeAndPosition = () => {
      const isMobile = window.innerWidth <= 768;
      const size = isMobile ? 48 : 60;
      const margin = isMobile ? 12 : 20;

      setButtonSize(size);
      setPosition({
        x: window.innerWidth - size - margin - 10,
        y: window.innerHeight - size - margin,
      });
    };

    updateSizeAndPosition();
    window.addEventListener("resize", updateSizeAndPosition);
    return () => window.removeEventListener("resize", updateSizeAndPosition);
  }, []);

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const margin = window.innerWidth <= 768 ? 12 : 20;
      const maxX = window.innerWidth - buttonSize - margin;
      const maxY = window.innerHeight - buttonSize - margin;

      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      setPosition({
        x: Math.max(margin, Math.min(newX, maxX)),
        y: Math.max(margin, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      const isRight = position.x > window.innerWidth / 2;
      const isMobile = window.innerWidth <= 768;
      const margin = isMobile ? 12 : 20;

      setPosition({
        x: isRight
          ? window.innerWidth - buttonSize - margin - 10 // extra padding for scrollbar
          : margin,
        y: window.innerHeight - buttonSize - margin,
      });

      setDragging(false);
      document.body.style.userSelect = "auto";
    }
  };

  const toggleOptions = () => setShowOptions((prev) => !prev);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <>
      {showOptions && (
        <ChatOptionMenu
          onClose={() => setShowOptions(false)}
          position={position}
        />
      )}

      <div
        onMouseDown={handleMouseDown}
        onClick={toggleOptions}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: buttonSize,
          height: buttonSize,
          zIndex: 1000,
        }}
        className={`
          rounded-full cursor-pointer shadow-lg flex items-center justify-center
          transition-transform duration-300 hover:scale-105

          bg-blue-600 dark:bg-pink-600
        `}
      >
        {showOptions ? (
          <X className="text-white w-7 h-7" />
        ) : (
          <MessageSquare className="text-white w-6 h-6" />
        )}
      </div>
    </>
  );
}