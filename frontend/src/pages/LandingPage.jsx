import React from "react";

const MOCKUP_IMG = "/mockup.jpg";

const features1 = [
  "AI-powered resume generation in seconds",
  "ATS-optimized format guaranteed",
  "Real-time preview as you build",
  "Download as clean PDF instantly",
];

const features2 = [
  "Skills displayed as professional tags",
  "Tailored bullet points for each role",
  "Professional typography & formatting",
  "Smart section ordering & layout",
];

const features3 = [
  "Instant ATS compatibility check",
  "Keyword optimization for job roles",
  "Improve score from 68% to 91%+",
  "Real-time optimization suggestions",
];

const CheckIcon = ({ color = "#f97316" }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="9" cy="9" r="9" fill={color} opacity="0.15" />
    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionBadge = ({ label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: `${color}18`, border: `1px solid ${color}40`,
    borderRadius: 20, padding: "4px 14px", fontSize: 12,
    fontWeight: 600, color, marginBottom: 20,
    letterSpacing: 0.3,
  }}>
    <span>▶ {label}</span>
  </div>
);

function FeatureRow({ badge, badgeColor, title, subtitle, features, ctaLabel, onStart, mockupSrc, reverse, gradient }) {
  return (
    <section style={{
      display: "flex",
      flexDirection: reverse ? "row-reverse" : "row",
      alignItems: "center",
      gap: "clamp(32px, 5vw, 60px)",
      padding: "clamp(40px, 6vw, 80px) clamp(16px, 5vw, 80px)",
      background: gradient || "white",
      flexWrap: "wrap",
    }}>
      {/* Text Side */}
      <div style={{ flex: "1 1 300px", maxWidth: 520 }}>
        <SectionBadge label={badge} color={badgeColor} />
        <h2 style={{
          fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, color: "#0f172a",
          fontFamily: "'Outfit', sans-serif", lineHeight: 1.2,
          marginBottom: 16,
        }}>{title}</h2>
        <p style={{
          fontSize: 15, color: "#475569", lineHeight: 1.75,
          marginBottom: 28,
        }}>{subtitle}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#334155" }}>
              <CheckIcon color={badgeColor} />
              <span>{f}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: badgeColor === "#f97316" ? "linear-gradient(135deg, #f97316, #ef4444)" : "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "white", border: "none", borderRadius: 50,
            padding: "14px 32px", fontSize: 15, fontWeight: 700,
            cursor: "pointer",
            boxShadow: badgeColor === "#f97316" ? "0 8px 24px rgba(249,115,22,0.35)" : "0 8px 24px rgba(59,130,246,0.35)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = badgeColor === "#f97316" ? "0 12px 32px rgba(249,115,22,0.5)" : "0 12px 32px rgba(59,130,246,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = badgeColor === "#f97316" ? "0 8px 24px rgba(249,115,22,0.35)" : "0 8px 24px rgba(59,130,246,0.35)"; }}
        >
          ⚡ {ctaLabel} →
        </button>
      </div>

      {/* Mockup Side */}
      <div style={{ flex: "1 1 280px", minWidth: 260, maxWidth: 560, display: "flex", justifyContent: "center" }}>
        <div style={{
          background: "white",
          borderRadius: 16,
          boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
          overflow: "hidden",
          maxWidth: 560,
          width: "100%",
          transform: "perspective(1200px) rotateY(-4deg)",
          transition: "transform 0.4s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "perspective(1200px) rotateY(0deg) scale(1.01)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "perspective(1200px) rotateY(-4deg)"; }}
        >
          <img src={mockupSrc} alt="App Preview" style={{ width: "100%", display: "block" }} />
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "10K+", label: "Resumes Generated" },
    { value: "98%", label: "ATS Pass Rate" },
    { value: "3.2×", label: "More Interviews" },
    { value: "< 60s", label: "Generation Time" },
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
      borderTop: "1px solid #e2e8f0",
      borderBottom: "1px solid #e2e8f0",
      padding: "clamp(24px, 4vw, 40px) clamp(16px, 4vw, 80px)",
      display: "flex", justifyContent: "center", gap: "clamp(24px, 5vw, 80px)", flexWrap: "wrap",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "#1e293b", fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
            {s.value}
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function HeroSection({ onStart, mockupSrc }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fef9f5 0%, #fff5f0 30%, #fdf4ff 70%, #f0f4ff 100%)",
      minHeight: "88vh",
      display: "flex",
      alignItems: "center",
      padding: "clamp(40px, 6vw, 60px) clamp(16px, 5vw, 80px)",
      gap: "clamp(32px, 5vw, 60px)",
      flexWrap: "wrap",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: -60, right: -60, width: 400, height: 400,
        background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -40, width: 300, height: 300,
        background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Left */}
      <div style={{ flex: "1 1 300px", maxWidth: 520, position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          width: 52, height: 52, background: "linear-gradient(135deg, #fff7ed, #fed7aa)",
          borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, marginBottom: 24, border: "1px solid #fdba74",
          boxShadow: "0 4px 12px rgba(249,115,22,0.15)",
        }}>
          📄
        </div>

        <h1 style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 800, color: "#0f172a",
          fontFamily: "'Outfit', sans-serif",
          lineHeight: 1.15, marginBottom: 20,
        }}>
          AI Resume Builder
        </h1>

        <p style={{
          fontSize: 16, color: "#475569", lineHeight: 1.75, marginBottom: 32,
          maxWidth: 440,
        }}>
          Create professional resumes from scratch with our AI-powered builder. Get ATS-optimized resumes tailored to your target role, and download your perfect resume in under a minute. No design skills required!
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
          {features1.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#334155" }}>
              <CheckIcon color="#f97316" />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #f97316, #ef4444)",
            color: "white", border: "none", borderRadius: 50,
            padding: "16px 40px", fontSize: 16, fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(249,115,22,0.4)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(249,115,22,0.55)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 10px 30px rgba(249,115,22,0.4)"; }}
        >
          ⚡ Try It Now →
        </button>
      </div>

      {/* Right — Floating Mockup */}
      <div style={{ flex: "1 1 280px", minWidth: 260, maxWidth: 580, display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          background: "white",
          borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
          maxWidth: 580,
          width: "100%",
          transform: "perspective(1400px) rotateY(-6deg) rotateX(2deg)",
          transition: "transform 0.4s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "perspective(1400px) rotateY(-2deg) rotateX(0deg) scale(1.01)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "perspective(1400px) rotateY(-6deg) rotateX(2deg)"; }}
        >
          <img src={mockupSrc} alt="SmartCV App Preview" style={{ width: "100%", display: "block" }} />
        </div>
      </div>
    </div>
  );
}

function TemplateShowcase({ onStart }) {
  const templates = [
    { name: "Professional", colors: ["#1e40af", "#e2e8f0"] },
    { name: "Modern", colors: ["#7c3aed", "#ede9fe"] },
    { name: "Classic", colors: ["#0f172a", "#f1f5f9"] },
  ];

  const ResumeCard = ({ name, colors, rating }) => (
    <div
      onClick={onStart}
      style={{
      background: "white",
      borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      flexShrink: 0,
      width: 240,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}
    >
      {/* Template Header accent */}
      <div style={{ height: 8, background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})` }} />
      <div style={{ padding: "20px 20px 24px" }}>
        {/* Fake resume lines */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ width: 90, height: 10, background: "#1e293b", borderRadius: 3 }} />
          <div style={{
            background: "#fef9c3", border: "1px solid #fde047",
            borderRadius: 12, padding: "2px 8px",
            fontSize: 11, fontWeight: 700, color: "#854d0e",
          }}>⭐ {rating}</div>
        </div>
        <div style={{ width: 130, height: 7, background: "#64748b", borderRadius: 3, marginBottom: 16 }} />
        {[100, 80, 90, 70, 85].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 5, background: "#e2e8f0", borderRadius: 3, marginBottom: 7 }} />
        ))}
        <div style={{ marginTop: 14 }}>
          <div style={{ width: 70, height: 7, background: colors[0], borderRadius: 3, marginBottom: 8 }} />
          {[90, 75].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 5, background: "#e2e8f0", borderRadius: 3, marginBottom: 6 }} />
          ))}
        </div>
        <div style={{ marginTop: 12, fontWeight: 600, fontSize: 12, color: colors[0] }}>{name}</div>
      </div>
    </div>
  );

  return (
    <section style={{
      padding: "clamp(48px, 6vw, 90px) clamp(16px, 5vw, 80px)",
      background: "linear-gradient(180deg, #f8fafc 0%, white 100%)",
      textAlign: "center",
    }}>
      <h2 style={{
        fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: "#0f172a",
        fontFamily: "'Outfit', sans-serif", marginBottom: 8, lineHeight: 1.2,
      }}>
        Generate Your Perfect
        <br /><span style={{ color: "#3b82f6" }}>AI Resume</span>
      </h2>
      <p style={{ fontSize: 16, color: "#475569", marginBottom: 44, maxWidth: 540, margin: "16px auto 44px" }}>
        AI-powered, ATS-optimized resumes trusted by thousands of professionals worldwide. Built in under 60 seconds.
      </p>

      {/* Filter pills */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 44, flexWrap: "wrap" }}>
        {["✦ All Styles", "Professional", "Modern", "Classic", "ATS-Optimized"].map((tab, i) => (
          <div key={tab} style={{
            padding: "9px 22px", borderRadius: 50, fontSize: 14, fontWeight: 600,
            cursor: "pointer",
            background: i === 0 ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "white",
            color: i === 0 ? "white" : "#475569",
            border: i === 0 ? "none" : "1px solid #e2e8f0",
            boxShadow: i === 0 ? "0 4px 16px rgba(59,130,246,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
            transition: "all 0.2s",
          }}>
            {tab}
          </div>
        ))}
      </div>

      {/* Cards row */}
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
        <ResumeCard name="Professional" colors={["#1e40af", "#bfdbfe"]} rating="4.5" />
        <ResumeCard name="ATS-Optimized" colors={["#7c3aed", "#ede9fe"]} rating="4.8" />
        <ResumeCard name="Modern Classic" colors={["#0f172a", "#cbd5e1"]} rating="4.7" />
      </div>

      <button
        onClick={onStart}
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "linear-gradient(135deg, #f97316, #ef4444)",
          color: "white", border: "none", borderRadius: 50,
          padding: "16px 44px", fontSize: 16, fontWeight: 700,
          cursor: "pointer", boxShadow: "0 10px 28px rgba(249,115,22,0.38)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(249,115,22,0.52)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 10px 28px rgba(249,115,22,0.38)"; }}
      >
        ⚡ Build My Resume Free →
      </button>
    </section>
  );
}

function FinalCTA({ onStart }) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      padding: "clamp(56px, 8vw, 100px) clamp(16px, 5vw, 80px)",
      textAlign: "center",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)",
        borderRadius: 20, padding: "6px 18px", fontSize: 13,
        color: "#a5b4fc", fontWeight: 600, marginBottom: 24,
      }}>
        ⚡ 100% Free · No Credit Card · Instant PDF
      </div>
      <h2 style={{
        fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "white",
        fontFamily: "'Outfit', sans-serif", lineHeight: 1.15, marginBottom: 16,
      }}>
        Ready to Land More Interviews?
      </h2>
      <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
        Join thousands who have already built ATS-beating resumes with SmartCV AI. Takes less than 60 seconds.
      </p>
      <button
        onClick={onStart}
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "linear-gradient(135deg, #f97316, #ef4444)",
          color: "white", border: "none", borderRadius: 50,
          padding: "16px clamp(24px, 5vw, 52px)", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 700,
          cursor: "pointer", boxShadow: "0 12px 36px rgba(249,115,22,0.45)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(249,115,22,0.6)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 12px 36px rgba(249,115,22,0.45)"; }}
      >
        ⚡ Start Building Free →
      </button>
    </section>
  );
}

export default function LandingPage({ onStart }) {
  return (
    <div style={{ background: "white", margin: 0, overflow: "hidden" }}>

      {/* Section 1: Hero — AI Resume Builder */}
      <HeroSection onStart={onStart} mockupSrc={MOCKUP_IMG} />

      {/* Stats Bar */}
      <StatsBar />

      {/* Section 2: Smart Formatting */}
      <FeatureRow
        badge="3 Steps · Smart AI"
        badgeColor="#f97316"
        title="Smart Resume Formatting"
        subtitle="Just fill in your details and let the AI handle the rest. Our engine creates professional, keyword-rich bullet points and perfectly structured sections — tailored to your exact target role."
        features={features2}
        ctaLabel="Try It Now"
        onStart={onStart}
        mockupSrc={MOCKUP_IMG}
        gradient="white"
      />

      {/* Section 3: Template Showcase */}
      <TemplateShowcase onStart={onStart} />

      {/* Section 4: ATS Optimization */}
      <FeatureRow
        badge="3 Steps · ATS Checker"
        badgeColor="#3b82f6"
        title={"ATS Score Checker & Enhancer"}
        subtitle="Our AI ensures your resume passes all major ATS systems. Get a targeted, keyword-optimized resume that's guaranteed to reach human recruiters — not the rejection pile."
        features={features3}
        ctaLabel="Try It Now"
        onStart={onStart}
        mockupSrc={MOCKUP_IMG}
        reverse={true}
        gradient="linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)"
      />

      {/* Final CTA */}
      <FinalCTA onStart={onStart} />
    </div>
  );
}
