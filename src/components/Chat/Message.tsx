import React from "react";
import { MessageProps } from "../../types/props";
import ImageWithBoxes from "../ImageWithBoxes";
import ReactMarkdown from "react-markdown";

const Message: React.FC<MessageProps> = ({ msg, isModelOutput }) => (
  <div className={`message ${msg.sender}${isModelOutput ? " no-bg" : ""}`}>
    {/* User image preview (no predictions yet) */}
    {msg.sender === "user" && msg.imageUrl && !msg.predictions && (
      <img
        src={msg.imageUrl}
        alt="preview"
        className="chat-image"
        style={{ borderRadius: 10, maxWidth: "100%" }}
      />
    )}
    {/* Model output: image with bounding boxes */}
    {isModelOutput && msg.imageUrl && msg.predictions && (
      <ImageWithBoxes
        imageUrl={msg.imageUrl}
        predictions={msg.predictions}
        grayscale={false}
        outlineColor="#2563eb"
        originalSize={true}
      />
    )}
    {/* Text message (Markdown) */}
    {msg.text && (
      <div className="chat-markdown">
        <ReactMarkdown>{msg.text}</ReactMarkdown>
      </div>
    )}
  </div>
);

export default Message;
