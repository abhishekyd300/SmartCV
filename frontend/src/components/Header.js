import React from "react";

export default function Header() {
  return (
    <header style={{
      background: "white", borderBottom: "1px solid #e5e7eb",
      padding: "16px 24px", display: "flex", alignItems: "center",
      gap: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}>
      <div style={{
        width: 36, height: 36, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18
      }}>📄</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#1e293b" }}>SmartCV</div>
        
      </div>
      
    </header>
  );
}
