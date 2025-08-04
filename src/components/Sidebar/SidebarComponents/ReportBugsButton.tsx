import React from "react";
import { ReportBugsButtonProps } from "../../../types/props";

const ReportBugsButton: React.FC<ReportBugsButtonProps> = ({ onClick }) => (
  <button
    className="wooder-sidebar-card-btn"
    style={{
      width: "100%",
      justifyContent: "center",
      margin: 0,
      marginBottom: 8,
      fontWeight: 500,
      color: "#fff",
      background: "#222",

      border: "none",
    }}
    onClick={onClick}
  >
    <span
      className="wooder-sidebar-chat-icon"
      role="img"
      aria-label="bug"
    ></span>
    Suggestions
  </button>
);

export default ReportBugsButton;
