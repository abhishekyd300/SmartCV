import React from "react";

export default function LandingPage({ onStart }) {
  return (
    <div style={{ display: "grid", gap: 64, padding: "20px 0 60px" }}>

      {/* Hero Section */}
      <section style={{
        textAlign: "center",
        maxWidth: 900,
        margin: "0 auto",
        position: "relative"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(99, 102, 241, 0.15)",
          border: "1px solid rgba(99, 102, 241, 0.3)",
          padding: "6px 18px",
          borderRadius: 99,
          fontSize: 14,
          fontWeight: 600,
          color: "#a5b4fc",
          marginBottom: 24,
          boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)"
        }}>
          ⚡ Powered by Next-Gen AI Resume Engine
        </div>

        <h1 style={{
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 800,
          lineHeight: 1.15,
          fontFamily: "'Outfit', sans-serif",
          marginBottom: 20,
          background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #a855f7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px"
        }}>
          75% of Resumes Are Rejected by ATS Filters Before a Human Sees Them.
        </h1>

        <p style={{
          fontSize: 18,
          color: "#94a3b8",
          lineHeight: 1.6,
          marginBottom: 36,
          maxWidth: 720,
          margin: "0 auto 36px"
        }}>
          Bad formatting, unoptimized keywords, and cluttered structures cost millions of talented candidates their dream jobs. SmartCV AI builds single-page, ATS-optimized resumes that land interviews 3x faster.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button className="btn-3d-primary" onClick={onStart} style={{ padding: "16px 44px", fontSize: 18 }}>
            Build Your AI Resume Now 🚀
          </button>
        </div>
      </section>

      {/* 3D Interactive Stats Card Section */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        <div className="glass-card-3d" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>❌</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: "#ef4444", fontFamily: "'Outfit', sans-serif" }}>
            75%+
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#f8fafc", margin: "8px 0" }}>
            Rejected by ATS Systems
          </div>
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>
            Automated applicant tracking filters instantly discard resumes with multi-column tables, fancy icons, or non-standard fonts.
          </p>
        </div>

        <div className="glass-card-3d" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>⏱️</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: "#f59e0b", fontFamily: "'Outfit', sans-serif" }}>
            6 Seconds
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#f8fafc", margin: "8px 0" }}>
            Average Recruiter Initial Scan
          </div>
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>
            Recruiters scan resumes in seconds. Cluttered layouts mean your key achievements get overlooked immediately.
          </p>
        </div>

        <div className="glass-card-3d" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🏆</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: "#10b981", fontFamily: "'Outfit', sans-serif" }}>
            3.2x More
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#f8fafc", margin: "8px 0" }}>
            Interviews with SmartCV AI
          </div>
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>
            Our clean single-page layout with Georgia headers & Bookman body guarantees 100% ATS readability and maximum recruiter impact.
          </p>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="glass-card-3d" style={{ padding: 48 }}>
        <h2 style={{
          textAlign: "center",
          fontSize: 32,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          marginBottom: 36,
          color: "#fff"
        }}>
          Why Candidates Choose <span style={{ color: "#a855f7" }}>SmartCV AI</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          <div style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: 18,
            padding: 24
          }}>
            <h3 style={{ color: "#fca5a5", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
              ❌ Traditional / Graphic Resumes
            </h3>
            <ul style={{ listStyle: "none", display: "grid", gap: 12, fontSize: 14, color: "#cbd5e1" }}>
              <li>⚠️ Complex graphics parsed as blank noise by ATS</li>
              <li>⚠️ Skill bars and star ratings confuse hiring managers</li>
              <li>⚠️ Inconsistent font sizes cause page overflow</li>
              <li>⚠️ Hours spent manually aligning columns</li>
            </ul>
          </div>

          <div style={{
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: 18,
            padding: 24,
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.15)"
          }}>
            <h3 style={{ color: "#6ee7b7", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
              ✅ SmartCV AI Format
            </h3>
            <ul style={{ listStyle: "none", display: "grid", gap: 12, fontSize: 14, color: "#e2e8f0" }}>
              <li>✨ 100% ATS Parsing Rate across all major ATS tools</li>
              <li>✨ Professional typography (Georgia & Bookman Old Style)</li>
              <li>✨ Automated AI bullet point generation tailored to job role</li>
              <li>✨ Instant PDF download ready for one-click application</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dummy Resume Preview Showcase */}
      <section style={{ textAlign: "center" }}>
        <h2 style={{
          fontSize: 32,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          marginBottom: 12,
          color: "#fff"
        }}>
          Preview The Proven Resume Format
        </h2>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>
          Clean, concise, and structured specifically for software engineers, developers, and tech professionals.
        </p>

        {/* 3D Floating Mockup Wrapper */}
        <div style={{
          position: "relative",
          maxWidth: 780,
          margin: "0 auto",
          transform: "perspective(1200px) rotateX(6deg) translateY(0)",
          transition: "all 0.5s ease",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(99, 102, 241, 0.3)",
          borderRadius: 12,
          overflow: "hidden"
        }}>
          <div style={{
            background: "#ffffff",
            padding: "36px 44px",
            textAlign: "left",
            color: "#000000",
            fontSize: 13,
            lineHeight: 1.35,
            fontFamily: "'Bookman Old Style', 'Bookman', Georgia, serif"
          }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "Georgia, serif",
                letterSpacing: 1,
                textTransform: "uppercase"
              }}>
                ALEX MORGAN
              </div>
              <div style={{ fontSize: 12, color: "#111", marginTop: 4 }}>
                alex.morgan@example.com  |  +1 (555) 019-2834  |  LinkedIn  |  GitHub  |  Portfolio
              </div>
            </div>

            {/* SUMMARY */}
            <div style={{ marginBottom: 14 }}>
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: 1,
                marginBottom: 4
              }}>
                SUMMARY
              </div>
              <div>
                Computer Science undergraduate with hands-on experience building full-stack MERN applications and AI-driven platforms. Skilled in JavaScript, React.js, Node.js, and MongoDB, with a strong foundation in Data Structures, Algorithms, and System Design. AWS Certified Cloud Practitioner.
              </div>
            </div>

            {/* EDUCATION */}
            <div style={{ marginBottom: 14 }}>
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: 1,
                marginBottom: 4
              }}>
                EDUCATION
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>State University of Technology, San Francisco, CA</strong>
                <span>2021 – 2025</span>
              </div>
              <div>Bachelor of Science in Computer Science & Engineering</div>
              <div>GPA: 3.8 / 4.0</div>
            </div>

            {/* TECHNICAL SKILLS */}
            <div style={{ marginBottom: 14 }}>
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: 1,
                marginBottom: 4
              }}>
                TECHNICAL SKILLS
              </div>
              <div><strong>Languages:</strong> C/C++, JavaScript, TypeScript, Python</div>
              <div><strong>Frontend:</strong> HTML5, CSS3, React.js, Next.js</div>
              <div><strong>Backend:</strong> Node.js, Express.js, REST APIs</div>
              <div><strong>Database:</strong> PostgreSQL, MongoDB</div>
              <div><strong>Tools:</strong> Git, GitHub, Docker, VS Code, AWS</div>
              <div><strong>Core CS:</strong> Data Structures & Algorithms, OOP, DBMS, Operating Systems</div>
            </div>

            {/* PROJECTS */}
            <div>
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: 1,
                marginBottom: 4
              }}>
                PROJECTS
              </div>
              <div>
                <strong>DevMetrics — Developer Analytics Platform</strong> | GitHub
                <div style={{ fontStyle: "italic", color: "#444" }}>React.js, Node.js, Express.js, MongoDB, Chart.js</div>
                <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
                  <li>Developed an open-source web application for developer productivity tracking and automated repo analytics.</li>
                  <li>Implemented JWT authentication and role-based access control supporting over 1,000 active users.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <button className="btn-3d-primary" onClick={onStart} style={{ padding: "16px 40px" }}>
            Start Building Your Resume Free ✨
          </button>
        </div>
      </section>

    </div>
  );
}
