import React from "react";
import { DiscordCardProps } from "../../../types/props";

const DiscordCard: React.FC<DiscordCardProps> = ({ grayscale, onHide }) => (
  <div className={`wooder-sidebar-card${grayscale ? " dark-card" : ""}`}>
    {/* Abstract background with Discord logo */}
    <div
      style={{
        width: "100%",
        height: 90,
        borderRadius: 8,
        marginBottom: 10,
        background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80') center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        
      }}
    >
      <img
        src="https://img.icons8.com/color/48/discord-logo.png"
        alt="Discord"
        style={{
          width: 48,
          height: 48,
          background: "rgba(255,255,255,0.8)",
          borderRadius: "50%",
          padding: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      />
    </div>
    <div className="wooder-sidebar-card-label">Experimental</div>
    <div className="wooder-sidebar-card-title">Introducing FurniScan</div>
    <div className="wooder-sidebar-card-desc">
      Your smart assistant for detecting and preventing wood furniture damage.
    </div>
    <a
      href="https://discord.gg/qNZv7tHd"
      target="_blank"
      rel="noopener noreferrer"
      className="wooder-sidebar-card-btn"
    >
      Report Bugs on Discord
    </a>
    <button className="wooder-sidebar-card-hide" onClick={onHide}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* Eye-off SVG */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7 20 2.73 16.11 1 12C1.73 10.33 2.81 8.82 4.17 7.59M9.53 9.53C10.09 9.19 10.8 9 12 9C14.21 9 16 10.79 16 13C16 13.2 15.98 13.39 15.94 13.57M12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15ZM2 2L22 22"
            stroke="#888"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Hide this
      </span>
    </button>
  </div>
);

export default DiscordCard;
