import React from "react";

export default function Header({ onNavigate, currentStep }) {
  return (
    <header className="app-header">
      <div className="logo-brand" onClick={() => onNavigate("landing")}>
        <div className="logo-icon">✨</div>
        <span className="logo-text">
          <span className="logo-text-smartcv">SmartCV</span>{" "}
          <span className="logo-text-ai">AI</span>
        </span>
      </div>

      <nav className="nav-links">
        <button
          type="button"
          className={`nav-link-btn ${currentStep === "landing" ? "active" : ""}`}
          onClick={() => onNavigate("landing")}
        >
          Home
        </button>
        <button
          type="button"
          className={`nav-link-btn ${currentStep === "templates" ? "active" : ""}`}
          onClick={() => onNavigate("templates")}
        >
          Templates
        </button>
        <button
          type="button"
          className="nav-btn-glow"
          onClick={() => {
            if (currentStep === "landing") onNavigate("templates");
            else onNavigate("form");
          }}
        >
          Build Resume ✨
        </button>
      </nav>
    </header>
  );
}
