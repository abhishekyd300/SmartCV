import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ onNavigate, currentStep }) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowMenu(false);
    try {
      await logout();
      onNavigate("landing");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

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

        {/* Login button when not logged in */}
        {!user && (
          <button
            type="button"
            className="nav-login-btn"
            onClick={() => onNavigate("auth")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Login
          </button>
        )}

        {/* User avatar menu when logged in */}
        {user && (
          <div className="user-menu-container" ref={menuRef}>
            <button
              type="button"
              className="user-avatar-btn"
              onClick={() => setShowMenu(!showMenu)}
              title={user.displayName || user.email}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="user-avatar-img"
                />
              ) : (
                <span className="user-avatar-initials">{getInitials()}</span>
              )}
            </button>

            {showMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-info">
                  <span className="user-dropdown-name">
                    {user.displayName || "User"}
                  </span>
                  <span className="user-dropdown-email">{user.email}</span>
                </div>
                <div className="user-dropdown-divider" />
                <button
                  type="button"
                  className="user-dropdown-item user-dropdown-logout"
                  onClick={handleLogout}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
