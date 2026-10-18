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
          className={`btn-3d-secondary ${currentStep === "templates" ? "active" : ""}`}
          onClick={() => onNavigate("templates")}
          style={{ border: "none" }}
        >
          Templates
        </button>
        <button
          className="nav-btn-glow"
          onClick={() => {
            if (currentStep === "preview") onNavigate("form");
            else if (currentStep === "landing") onNavigate("templates");
            else onNavigate("form");
          }}
        >
          {currentStep === "preview" ? "Edit Resume" : currentStep === "templates" ? "Continue →" : "Build Resume ✨"}
        </button>
      </nav>
    </header>
  );
}
