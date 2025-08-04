import React, { useState, useRef } from "react";
import "./Sidebar.css";
import { SidebarProps } from "../../types/props";
import DiscordCard from "./SidebarComponents/DiscordCard";
import ReportBugsButton from "./SidebarComponents/ReportBugsButton";
import SidebarHistoryItem from "./SidebarComponents/SidebarHistoryItem";
import SidebarNewChatButton from "./SidebarComponents/SidebarNewChatButton";

export default function Sidebar({
  onNewChat,
  history,
  onSelectHistory,
  onDeleteHistory,
  collapsed,
  onToggleCollapse,
  grayscale,
  onToggleGrayscale,
}: SidebarProps) {
  const [showCard, setShowCard] = useState(true);
  const labelRef = useRef<HTMLLabelElement>(null);

  // Tooltip show/hide handlers
  const handleBlur = () => {
    if (labelRef.current) {
      labelRef.current.classList.remove("show-tooltip");
    }
  };
  const handleMouseEnter = () => {
    if (labelRef.current) {
      labelRef.current.classList.add("show-tooltip");
    }
  };
  const handleMouseLeave = () => {
    if (labelRef.current) {
      labelRef.current.classList.remove("show-tooltip");
    }
  };

  return (
    <aside
      className={`wooder-sidebar${collapsed ? " collapsed" : ""}${
        grayscale ? " dark" : ""
      }`}
    >
      <div className="wooder-sidebar-header">
        {/* Theme toggle at top left */}
        <div className="wooder-sidebar-theme-toggle-top">
          {!collapsed && (
            <label
              className="theme-switch"
              ref={labelRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onBlur={handleBlur}
            >
              <input
                type="checkbox"
                checked={grayscale}
                onChange={onToggleGrayscale}
                aria-label="Switch theme"
                tabIndex={0}
              />
              <span className="slider">
                <span
                  className={`theme-icon ${grayscale ? "sun" : "moon"}`}
                  role="img"
                  aria-label={grayscale ? "Sun" : "Moon"}
                >
                  {grayscale ? "☀" : "🌙"}
                </span>
              </span>
             
            </label>
          )}
        </div>
        {!collapsed && (
          <span className="wooder-sidebar-title" style={{ margin: "0 auto" }}>
            FurniScan
          </span>
        )}
        <button
          className="wooder-sidebar-collapse-btn"
          title={collapsed ? "Expand" : "Collapse"}
          onClick={onToggleCollapse}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            style={{
              transform: collapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            <polyline
              points="7,5 13,10 7,15"
              fill="none"
              stroke="#8B5C2A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {!collapsed && (
        <>
          <div className="wooder-sidebar-section">
            <SidebarNewChatButton onClick={onNewChat} />
            <div className="wooder-sidebar-section-title">History</div>
            <div className="wooder-sidebar-history-list">
              {history.length === 0 && (
                <div className="wooder-sidebar-chat" style={{ color: "#bbb" }}>
                  No chats yet
                </div>
              )}
              {history.map((item) => (
                <SidebarHistoryItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  active={item.active}
                  onSelect={onSelectHistory}
                  onDelete={onDeleteHistory}
                />
              ))}
            </div>
          </div>
          {showCard && (
            <DiscordCard
              grayscale={grayscale}
              onHide={() => setShowCard(false)}
            />
          )}
          <div className="wooder-sidebar-footer">
            <ReportBugsButton
              onClick={() =>
                window.open("https://discord.gg/qNZv7tHd", "_blank")
              }
            />
          </div>
        </>
      )}
    </aside>
  );
}
