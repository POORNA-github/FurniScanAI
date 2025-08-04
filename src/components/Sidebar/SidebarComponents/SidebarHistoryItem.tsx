import React, { useState } from "react";
import { SidebarHistoryItemProps } from "../../../types/props";
import ConfirmDialog from "./ConfirmDialog"; // adjust path as needed

const SidebarHistoryItem: React.FC<SidebarHistoryItemProps> = ({
  id,
  title,
  active,
  onSelect,
  onDelete,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div
        className={`wooder-sidebar-chat${active ? " active" : ""}`}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          position: "relative",
          paddingRight: 4,
        }}
        onClick={() => onSelect(id)}
      >
        <span
          className="wooder-sidebar-chat-icon"
          role="img"
          aria-label="chat"
          style={{ marginLeft: 4 }}
        >
          ✉
        </span>
        <span
          style={{
            flex: 1,
            marginLeft: 4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <button
          className="wooder-sidebar-chat-delete"
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          title="Delete chat"
          aria-label="Delete chat"
          style={{
            background: "none",
            border: "none",
            padding: "4px",
            marginLeft: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Trash SVG icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
      <ConfirmDialog
        open={showConfirm}
        message="Do you want to delete this chat history?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          onDelete(id);
        }}
      />
    </>
  );
};

export default SidebarHistoryItem;
