import React from "react";
import logo from "../../assets/furniscan-logo.png";

const ChatPreview: React.FC = () => (
  <div
    className="chat-preview"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "60vh",
      textAlign: "center",
      color: "#222",
      opacity: 0.85,
    }}
  >
    <img
      src="/furniscan-logo.png"
      alt="FurniScan"
      style={{ marginBottom: 5, width: 100, height: 100, borderRadius: 10 }}
    />
    <h1 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>FurniScan </h1>
    <h2 style={{ fontWeight: 500, fontSize: "1.2rem", margin: "12px 0 0 0" }}>
      AI Wooden Furniture Damage Detection
    </h2>
    <div className="chat-preview-desc">
      AI Powered Chat for wood care, repair, and prevention.
      <br />
      <span className="chat-preview-ask">
        Ask me anything about wooden furniture damage or upload your image to
        get started!
      </span>
    </div>
  </div>
);

export default ChatPreview;
