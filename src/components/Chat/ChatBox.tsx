import React from "react";
import { ChatBoxProps } from "../../types/props";
import Message from "./Message";

const ChatBox: React.FC<ChatBoxProps> = ({ messages, isTyping }) => (
  <div className="chat-box">
    {messages.map((msg, idx) => {
      const isModelOutput = !!(
        msg.sender === "furniscan" &&
        msg.imageUrl &&
        msg.predictions &&
        !msg.text
      );
      return <Message key={idx} msg={msg} isModelOutput={isModelOutput} />;
    })}
    {isTyping && (
      <div className="message furniscan typing">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    )}
  </div>
);

export default ChatBox;
