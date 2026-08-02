import React from "react";

export default function Header({ onNavigate, currentStep }) {
  return (
    <header className="app-header">
      <div className="logo-brand" onClick={() => onNavigate("landing")}>
        <div className="logo-icon">✨</div>
        <span style={{ background: "linear-gradient(135deg, #fff 30%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          SmartCV AI
        </span>
      </div>

      <nav className="nav-links">
        <button
          className={`btn-3d-secondary ${currentStep === "landing" ? "active" : ""}`}
          onClick={() => onNavigate("landing")}
          style={{ border: "none" }}
        >
          Home
        </button>
        <button
          className="nav-btn-glow"
          onClick={() => onNavigate("form")}
        >
          {currentStep === "preview" ? "Edit Resume" : "Create Resume ✨"}
        </button>
      </nav>
    </header>
  );
}
