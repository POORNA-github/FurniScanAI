import React from "react";
import { SidebarNewChatButtonProps } from "../../../types/props";

const SidebarNewChatButton: React.FC<SidebarNewChatButtonProps> = ({
  onClick,
}) => (
  <div
    className="wooder-sidebar-chat"
    style={{
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start", // same as history
      marginBottom: 6,
      paddingLeft: 10, // match history
      paddingTop: 12,
      paddingBottom: 12,
    }}
    onClick={onClick}
  >
    <span
      className="wooder-sidebar-chat-icon"
      role="img"
      aria-label="new chat"
      style={{ marginLeft: 4 }}
    >
      ✉
    </span>
    <span style={{ flex: 1, marginLeft: 4, fontWeight: 500 }}>
      Create New Chat
    </span>
  </div>
);

export default SidebarNewChatButton;
