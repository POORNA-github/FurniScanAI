import React from "react";
import { ChatFooterProps } from "../../types/props";

const ChatFooter: React.FC<ChatFooterProps> = ({
  input,
  setInput,
  image,
  handleImageChange,
  handleSend,
  sidebarCollapsed,
}) => (
  <footer className={`chat-footer${sidebarCollapsed ? " expanded" : ""}`}>
    <div className="chat-input-container">
      <input
        type="file"
        accept="image/*"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor="file-upload" className="icon-btn" title="Upload image">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16.5 13.5L12 9l-4.5 4.5M12 9v6" />
          <rect x="3" y="3" width="18" height="18" rx="4" />
        </svg>
      </label>
      <input
        className="chat-input"
        type="text"
        placeholder="Type a message or upload an image"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        readOnly={!!image}
      />
      <button
        className="send-btn"
        onClick={handleSend}
        disabled={!input && !image}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </footer>
);

export default ChatFooter;
