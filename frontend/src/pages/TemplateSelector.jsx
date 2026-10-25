import React, { useState } from "react";
import { SimpleTemplate1, SimpleTemplate2 } from "../components/templates/simple";
import { ModernTemplate1, ModernTemplate2, ModernTemplate3 } from "../components/templates/modern";
import { PhotoTemplate1, PhotoTemplate2 } from "../components/templates/withphoto";

const SAMPLE_RESUME = {
  personalInfo: {
    name: "James Miller",
    email: "james.miller@email.com",
    phone: "+1 617 947 5112",
    location: "Oak Street 333, Boston, United States, 02101",
    linkedin: "linkedin.com/in/jamesmiller",
    title: "Financial Analyst",
    photoUrl: "https://img.freepik.com/premium-photo/passport-photo-man-welldressed-caucasian-businessman-suit-tie-smiling-id-portrait_817921-61256.jpg?w=2000",
  },
  targetRole: "Financial Analyst",
  summary: "Experienced Financial Analyst with strong background in managing multi-million budgets. Provides analysis and accounting support within product development. Works to reduce expenses and develop operating budgets.",
  experience: [
    {
      title: "Financial Analyst",
      company: "GEO Inc.",
      location: "Boston",
      duration: "Mar 2012 — Jul 2018",
      bullets: [
        "Created budgets and reduced labor and material costs by 15%.",
        "Generated financial reports on completed projects with positive results.",
        "Developed financial statements, cash flow charts and balance sheets.",
      ],
    },
    {
      title: "Financial Analyst",
      company: "Sisco Enterprises Inc.",
      location: "Boston",
      duration: "Aug 2008 — Feb 2012",
      bullets: [
        "Reports, cash flow analysis, annual budgets, monthly forecasts and revenue projections.",
        "Analyzed corporate accounts and advised in negotiations for budget savings.",
        "Coordinated key finance reports and presented results to management.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Finance",
      institution: "Boston University",
      year: "Aug 2000 — Apr 2004",
      details: "Graduated summa cum laude.",
    },
    {
      degree: "High School Diploma",
      institution: "Camden High School, Boston",
      year: "Aug 1996 — Apr 2000",
      details: "",
    },
  ],
  skills: {
    "Core Skills": [
      "Financial Analysis",
      "Strategic Planning",
      "Trend Analysis",
      "Market Assessment",
      "Team Leadership",
    ],
  },
  languages: ["English", "German"],
  certifications: [
    "Chartered Financial Analyst (CFA)",
    "Financial Modeling & Valuation Analyst (FMVA)",
  ],
  projects: [],
};

/* ─── Mini Resume Preview Helper ──────────────────────────── */
function PLine({ w = "100%", h = 5, color = "#e2e8f0", mb = 4, r = 2 }) {
  return <div style={{ width: w, height: h, background: color, borderRadius: r, marginBottom: mb }} />;
}

/* ─── Preview 1: Daryl Banks Style (Two-column timeline) ──── */
function Simple1Preview() {
  return (
    <div style={{ padding: "14px 16px", background: "#ffffff", height: "100%", boxSizing: "border-box", fontFamily: "sans-serif" }}>
      {/* Top Black Bar */}
      <div style={{ height: 3, background: "#000", marginBottom: 6 }} />
      {/* Name & Role */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#000", letterSpacing: 0.5 }}>DARYL BANKS</div>
        <div style={{ fontSize: 8, fontWeight: 700, color: "#333", textTransform: "uppercase" }}>DRIVER</div>
      </div>
      {/* Bottom Black Bar */}
      <div style={{ height: 2.5, background: "#000", marginBottom: 10 }} />

      {/* 2 Column Layout */}
      <div style={{ display: "flex", gap: 10 }}>
        {/* Left Column (Timeline) */}
        <div style={{ flex: "1 1 65%" }}>
          {/* Summary */}
          <div style={{ fontSize: 7.5, fontWeight: 800, borderBottom: "1px solid #d4d4d8", paddingBottom: 2, marginBottom: 4, display: "flex", alignItems: "center", gap: 3 }}>
            <span>📄</span> SUMMARY
          </div>
          <PLine w="100%" h={3.5} color="#71717a" mb={2} />
          <PLine w="90%" h={3.5} color="#71717a" mb={6} />

          {/* Experience */}
          <div style={{ fontSize: 7.5, fontWeight: 800, borderBottom: "1px solid #d4d4d8", paddingBottom: 2, marginBottom: 5, display: "flex", alignItems: "center", gap: 3 }}>
            <span>💼</span> EXPERIENCE
          </div>

          {[
            { date: "2013-19", role: "DRIVER", co: "Albert's Trucking" },
            { date: "2009-13", role: "DRIVER", co: "Bears Transport" }
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, position: "relative" }}>
              <div style={{ width: 44, fontSize: 6.5, fontWeight: 700, color: "#000", flexShrink: 0, display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", border: "1px solid #000", display: "inline-block" }} />
                <span>{item.date}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 7, fontWeight: 800, textTransform: "uppercase" }}>{item.role}</div>
                <div style={{ fontSize: 6, fontWeight: 600, color: "#333" }}>{item.co}</div>
                <PLine w="90%" h={3} color="#a1a1aa" mb={1} />
                <PLine w="75%" h={3} color="#a1a1aa" mb={0} />
              </div>
            </div>
          ))}

          {/* Education */}
          <div style={{ fontSize: 7.5, fontWeight: 800, borderBottom: "1px solid #d4d4d8", paddingBottom: 2, marginTop: 4, marginBottom: 4, display: "flex", alignItems: "center", gap: 3 }}>
            <span>📖</span> EDUCATION
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 44, fontSize: 6.5, fontWeight: 700, color: "#000", flexShrink: 0, display: "flex", alignItems: "center", gap: 2 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", border: "1px solid #000", display: "inline-block" }} />
              <span>2013-17</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 7, fontWeight: 800, textTransform: "uppercase" }}>DRIVING SCHOOL</div>
              <div style={{ fontSize: 6, color: "#333" }}>Commercial License</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: "#e4e4e7" }} />

        {/* Right Column (Contact + Pill Skills) */}
        <div style={{ flex: "0 0 32%" }}>
          <div style={{ fontSize: 6.5, color: "#333", display: "grid", gap: 3, marginBottom: 8 }}>
            <div>✉ banks.daryl@gmail</div>
            <div>📱 (602) 319-1212</div>
            <div>📍 Phoenix, AZ</div>
          </div>

          <div style={{ fontSize: 7.5, fontWeight: 800, borderBottom: "1px solid #d4d4d8", paddingBottom: 2, marginBottom: 6, display: "flex", alignItems: "center", gap: 3 }}>
            <span>🏆</span> SKILLS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
            {["Hand-Eye Coord.", "Manual Dexterity", "References", "Read maps", "Safe Driving"].map(s => (
              <span key={s} style={{
                border: "1px solid #000",
                borderRadius: 10,
                padding: "1px 5px",
                fontSize: 6,
                fontWeight: 600,
                color: "#000",
                background: "#fff"
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Preview 2: Samantha Williams Style (Centered serif) ─── */
function Simple2Preview() {
  return (
    <div style={{ padding: "16px 20px", background: "#ffffff", height: "100%", boxSizing: "border-box", fontFamily: "Georgia, serif" }}>
      {/* Centered Name */}
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 400, color: "#000", letterSpacing: 0.3 }}>Samantha Williams</div>
        <div style={{ fontSize: 6.5, color: "#444", marginTop: 2 }}>
          <strong>Address:</strong> New York, NY · <strong>Email:</strong> samantha@example.com
        </div>
        <div style={{ fontSize: 6.5, color: "#444", marginTop: 1 }}>
          <strong>Phone:</strong> (555) 789-1234
        </div>
      </div>

      {/* Dashed line */}
      <div style={{ borderBottom: "1px dashed #ccc", margin: "6px 0 8px" }} />

      {/* Summary */}
      <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>SUMMARY</div>
      <PLine w="100%" h={3.5} color="#71717a" mb={2} />
      <PLine w="90%" h={3.5} color="#71717a" mb={7} />

      {/* Experience */}
      <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>EXPERIENCE</div>
      <div style={{ marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7, fontWeight: 700 }}>
          <span>SENIOR ANALYST</span>
          <span style={{ fontWeight: 400, fontSize: 6.5 }}>Jun 2021 — Current</span>
        </div>
        <div style={{ fontSize: 6.5, color: "#444", marginBottom: 2 }}>Loom & Lantern Co. - New York, NY</div>
        <PLine w="95%" h={3} color="#a1a1aa" mb={1.5} />
        <PLine w="80%" h={3} color="#a1a1aa" mb={4} />
      </div>

      {/* Education */}
      <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>EDUCATION</div>
      <div style={{ fontSize: 7, fontWeight: 700 }}>New York University | Bachelor of Science</div>
      <div style={{ fontSize: 6.5, color: "#444", marginBottom: 6 }}>Economics | Aug 2013 - Apr 2017</div>

      {/* Skills: 2 Columns */}
      <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>SKILLS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 8px", fontSize: 6.5, color: "#222" }}>
        <div>• Project Management</div>
        <div>• Data-driven Decisions</div>
        <div>• SQL & Excel</div>
        <div>• Financial Analysis</div>
      </div>
    </div>
  );
}

/* ─── Preview 3: Olivia Wilson Style (Modern Editorial Blush) ── */
function Modern1Preview() {
  return (
    <div style={{ padding: "12px 14px", background: "#fffafb", height: "100%", boxSizing: "border-box", fontFamily: "Georgia, serif" }}>
      {/* Top Header Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", border: "1px solid #71717a", marginBottom: 8, background: "#fff" }}>
        <div style={{ padding: "10px 8px", textAlign: "center", borderRight: "1px solid #71717a", background: "radial-gradient(circle, #fce7f3 0%, #fff 75%)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>Olivia Wilson</div>
          <div style={{ fontSize: 6, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#475569", marginTop: 2 }}>WEB DESIGNER</div>
        </div>
        <div style={{ fontSize: 5.5, color: "#333", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ padding: "3px 6px", borderBottom: "1px solid #71717a" }}><strong>Phone:</strong> +1 234-567</div>
          <div style={{ padding: "3px 6px", borderBottom: "1px solid #71717a" }}><strong>Email:</strong> hello@site.com</div>
          <div style={{ padding: "3px 6px" }}><strong>Address:</strong> NYC, 123</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", border: "1px solid #71717a", background: "#fff" }}>
        {/* Left Column */}
        <div style={{ borderRight: "1px solid #71717a" }}>
          <div style={{ background: "#fff1f3", padding: "4px 8px", borderBottom: "1px solid #71717a", display: "flex", justifyContent: "space-between", fontSize: 6.5, fontWeight: 700 }}>
            <span>Experience</span>
            <span style={{ color: "#f43f5e" }}>✦</span>
          </div>
          <div style={{ padding: "6px 8px" }}>
            <div style={{ fontSize: 5.5, fontWeight: 800, textTransform: "uppercase", color: "#0f172a" }}>2020 - CURRENT</div>
            <div style={{ fontSize: 6.5, textTransform: "uppercase", color: "#333" }}>WEB DESIGNER</div>
            <div style={{ fontSize: 5.5, color: "#e11d48", paddingLeft: 4 }}>• Responsive design</div>
            <div style={{ fontSize: 5.5, color: "#e11d48", paddingLeft: 4 }}>• UX prototyping</div>

            <div style={{ fontSize: 5.5, fontWeight: 800, textTransform: "uppercase", color: "#0f172a", marginTop: 4 }}>2017 - 2019</div>
            <div style={{ fontSize: 6.5, textTransform: "uppercase", color: "#333" }}>JR. DESIGNER</div>
          </div>

          <div style={{ background: "#fff1f3", padding: "4px 8px", borderTop: "1px solid #71717a", borderBottom: "1px solid #71717a", display: "flex", justifyContent: "space-between", fontSize: 6.5, fontWeight: 700 }}>
            <span>Education</span>
            <span style={{ color: "#f43f5e" }}>✦</span>
          </div>
          <div style={{ padding: "6px 8px" }}>
            <div style={{ fontSize: 5.5, fontWeight: 800 }}>2012 - 2016</div>
            <div style={{ fontSize: 6 }}>B.S. Design & Web</div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div style={{ background: "#fff1f3", padding: "4px 8px", borderBottom: "1px solid #71717a", display: "flex", justifyContent: "space-between", fontSize: 6.5, fontWeight: 700 }}>
            <span>Summary</span>
            <span style={{ color: "#f43f5e" }}>✦</span>
          </div>
          <div style={{ padding: "6px 8px" }}>
            <PLine w="100%" h={3} color="#94a3b8" mb={1.5} />
            <PLine w="90%" h={3} color="#94a3b8" mb={1.5} />
            <PLine w="75%" h={3} color="#94a3b8" mb={0} />
          </div>

          <div style={{ background: "#fff1f3", padding: "4px 8px", borderTop: "1px solid #71717a", borderBottom: "1px solid #71717a", display: "flex", justifyContent: "space-between", fontSize: 6.5, fontWeight: 700 }}>
            <span>Skills</span>
            <span style={{ color: "#f43f5e" }}>✦</span>
          </div>
          <div style={{ padding: "6px 8px", fontSize: 5.5, display: "grid", gap: 2, color: "#333" }}>
            <div>Web Design</div>
            <div>Front-End Dev</div>
            <div>UX/UI Design</div>
            <div>Responsive Design</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Preview 4: Samantha Williams (Steel Blue Header) ────── */
function Modern2Preview() {
  return (
    <div style={{ background: "#ffffff", height: "100%", boxSizing: "border-box", fontFamily: "sans-serif", border: "1px solid #cbd5e1" }}>
      {/* Top Banner (Steel Blue) */}
      <div style={{ background: "#94b4c7", display: "grid", gridTemplateColumns: "35% 65%", borderBottom: "1px solid #7c9eb2", padding: "10px 12px", gap: 10 }}>
        {/* Left header */}
        <div style={{ borderRight: "1px solid rgba(0,0,0,0.15)", paddingRight: 8 }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: "#1e293b", lineHeight: 1.1 }}>Samantha Williams</div>
          <div style={{ fontSize: 6, fontWeight: 600, color: "#334155", margin: "2px 0 5px" }}>Senior Sales Associate</div>
          <div style={{ fontSize: 5.5, color: "#1e293b", display: "grid", gap: 1.5 }}>
            <div>✉ samantha@site.com</div>
            <div>📱 (555) 789-1234</div>
            <div>📍 New York, NY</div>
          </div>
        </div>
        {/* Right header */}
        <div style={{ paddingLeft: 4 }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, textTransform: "uppercase", borderBottom: "1px solid #1e293b", display: "inline-block", paddingBottom: 1, marginBottom: 3 }}>
            SUMMARY
          </div>
          <PLine w="100%" h={2.5} color="#1e293b" mb={1} />
          <PLine w="95%" h={2.5} color="#1e293b" mb={1} />
          <PLine w="85%" h={2.5} color="#1e293b" mb={0} />
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "35% 65%", padding: "10px 12px", gap: 10 }}>
        {/* Left Body */}
        <div style={{ borderRight: "1px solid #e2e8f0", paddingRight: 8 }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, borderBottom: "1px solid #1e293b", display: "inline-block", paddingBottom: 1, marginBottom: 4 }}>
            EDUCATION
          </div>
          <div style={{ fontSize: 6, fontWeight: 700, color: "#0f172a" }}>New York Univ.</div>
          <div style={{ fontSize: 5.5, color: "#64748b", marginBottom: 6 }}>2013 - 2017</div>

          <div style={{ fontSize: 6.5, fontWeight: 800, borderBottom: "1px solid #1e293b", display: "inline-block", paddingBottom: 1, marginBottom: 4 }}>
            SKILLS
          </div>
          <div style={{ fontSize: 5.5, color: "#333", display: "grid", gap: 2 }}>
            <div>Project Management</div>
            <div>Data Analysis</div>
            <div>SQL & Excel</div>
            <div>Financial Analysis</div>
          </div>
        </div>

        {/* Right Body */}
        <div style={{ paddingLeft: 4 }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, borderBottom: "1px solid #1e293b", display: "inline-block", paddingBottom: 1, marginBottom: 5 }}>
            EXPERIENCE
          </div>
          <div style={{ marginBottom: 5 }}>
            <div style={{ fontSize: 6.5, fontWeight: 800, color: "#0f172a" }}>Senior Analyst - Loom & Lantern</div>
            <div style={{ fontSize: 5.5, color: "#64748b", fontStyle: "italic", marginBottom: 2 }}>Jun 2021 - Current</div>
            <PLine w="100%" h={2.5} color="#64748b" mb={1} />
            <PLine w="85%" h={2.5} color="#64748b" mb={0} />
          </div>
          <div>
            <div style={{ fontSize: 6.5, fontWeight: 800, color: "#0f172a" }}>Business Analyst - Willow Ltd.</div>
            <div style={{ fontSize: 5.5, color: "#64748b", fontStyle: "italic", marginBottom: 2 }}>Jul 2017 - Apr 2021</div>
            <PLine w="95%" h={2.5} color="#64748b" mb={0} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Preview 5: Daniel Gallego (Europass Indigo) ─────────── */
function Modern3Preview() {
  return (
    <div style={{ background: "#ffffff", height: "100%", boxSizing: "border-box", fontFamily: "sans-serif", border: "1px solid #e2e8f0" }}>
      {/* Top Banner (Europass Indigo) */}
      <div style={{ background: "#505f9e", color: "#fff", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>DANIEL GALLEGO</div>
          <div style={{ fontSize: 6, color: "#e0e7ff" }}>Senior Project Manager</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8 }}>
          <span>🇪🇺</span>
          <span style={{ fontSize: 8, fontWeight: 700 }}>europass</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "44% 56%", padding: "10px 12px", gap: 10 }}>
        {/* Left Column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
            <span style={{ color: "#505f9e", fontSize: 6 }}>◆</span>
            <span style={{ fontSize: 6.5, fontWeight: 800 }}>ABOUT ME</span>
            <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
          </div>
          <PLine w="100%" h={2.5} color="#94a3b8" mb={1} />
          <PLine w="85%" h={2.5} color="#94a3b8" mb={5} />

          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
            <span style={{ color: "#505f9e", fontSize: 6 }}>◆</span>
            <span style={{ fontSize: 6.5, fontWeight: 800 }}>CONTACTS</span>
            <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
          </div>
          <div style={{ fontSize: 5.5, color: "#333", display: "grid", gap: 1, marginBottom: 5 }}>
            <div><strong>PHONE:</strong> (+49) 30 987</div>
            <div><strong>EMAIL:</strong> d.gallego@site</div>
            <div><strong>ADDRESS:</strong> Berlin, Germany</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
            <span style={{ color: "#505f9e", fontSize: 6 }}>◆</span>
            <span style={{ fontSize: 6.5, fontWeight: 800 }}>SKILLS</span>
            <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
          </div>
          <div style={{ fontSize: 5.5, color: "#333", paddingLeft: 4 }}>
            <div>• Project Delivery</div>
            <div>• Agile & Scrum</div>
            <div>• Stakeholder Mgmt</div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
            <span style={{ fontSize: 6.5, fontWeight: 800 }}>EXPERIENCE</span>
            <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
          </div>

          <div style={{ paddingLeft: 8, position: "relative", marginBottom: 6 }}>
            <span style={{ position: "absolute", left: 0, top: 2, width: 4, height: 4, borderRadius: "50%", border: "1px solid #505f9e" }} />
            <div style={{ fontSize: 5.5, color: "#64748b" }}>09/2019 – Current Berlin</div>
            <div style={{ fontSize: 6.5, fontWeight: 700 }}>Sr. Project Manager | Siemens</div>
            <PLine w="95%" h={2.5} color="#94a3b8" mb={1} />
            <PLine w="80%" h={2.5} color="#94a3b8" mb={0} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
            <span style={{ fontSize: 6.5, fontWeight: 800 }}>EDUCATION</span>
            <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
          </div>
          <div style={{ paddingLeft: 8, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, top: 2, width: 4, height: 4, borderRadius: "50%", border: "1px solid #505f9e" }} />
            <div style={{ fontSize: 5.5, color: "#64748b" }}>2012 – 2014 Berlin</div>
            <div style={{ fontSize: 6.5, fontWeight: 700 }}>M.S. Engineering Mgmt</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Preview: James Miller (With Photo 1) ────────────────── */
function WithPhoto1Preview() {
  return (
    <div style={{ display: "flex", height: "100%", background: "#ffffff", fontFamily: "sans-serif", boxSizing: "border-box" }}>
      {/* Left Column (35%) */}
      <div style={{ width: "35%", background: "#eceff2", padding: "12px 10px", boxSizing: "border-box", display: "flex", flexDirection: "column", borderRight: "1px solid #e2e8f0" }}>
        {/* Circular Avatar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
            👤
          </div>
        </div>
        <div style={{ height: 1, background: "#64748b", marginBottom: 8 }} />
        <div style={{ fontSize: 6.5, fontWeight: 900, textTransform: "uppercase", color: "#0f172a", marginBottom: 4 }}>Skills</div>
        <div style={{ fontSize: 5, color: "#334155", display: "grid", gap: 2 }}>
          <div>• Financial Analysis</div>
          <div>• Strategic Planning</div>
          <div>• Trend Analysis</div>
          <div>• Team Leadership</div>
        </div>
        <div style={{ height: 1, background: "#64748b", margin: "8px 0 6px" }} />
        <div style={{ fontSize: 6.5, fontWeight: 900, textTransform: "uppercase", color: "#0f172a", marginBottom: 3 }}>Languages</div>
        <div style={{ fontSize: 5, fontWeight: 700, color: "#1e293b", display: "grid", gap: 2 }}>
          <div>ENGLISH</div>
          <div>GERMAN</div>
        </div>
      </div>

      {/* Right Column (65%) */}
      <div style={{ width: "65%", padding: "12px 12px", boxSizing: "border-box" }}>
        <div style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", color: "#000", letterSpacing: 0.3 }}>JAMES MILLER</div>
        <div style={{ fontSize: 6, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Financial Analyst</div>
        <div style={{ fontSize: 5, color: "#475569", display: "grid", gap: 1.5, marginBottom: 8 }}>
          <div>✉ james.miller@email.com</div>
          <div>📍 Oak Street 333, Boston</div>
          <div>📞 +1 617 947 5112</div>
        </div>
        <div style={{ fontSize: 6.5, fontWeight: 900, textTransform: "uppercase", color: "#000", marginBottom: 2 }}>Summary</div>
        <PLine w="100%" h={2.5} color="#94a3b8" mb={1} />
        <PLine w="85%" h={2.5} color="#94a3b8" mb={6} />

        <div style={{ fontSize: 6.5, fontWeight: 900, textTransform: "uppercase", color: "#000", marginBottom: 3 }}>Experience</div>
        <div style={{ fontSize: 5.5, fontWeight: 800, color: "#000" }}>Financial Analyst, GEO Inc.</div>
        <div style={{ fontSize: 4.8, color: "#64748b", marginBottom: 2 }}>Mar 2012 — Jul 2018</div>
        <PLine w="95%" h={2} color="#cbd5e1" mb={1} />
        <PLine w="80%" h={2} color="#cbd5e1" mb={4} />

        <div style={{ fontSize: 6.5, fontWeight: 900, textTransform: "uppercase", color: "#000", marginBottom: 2 }}>Education</div>
        <div style={{ fontSize: 5.5, fontWeight: 800, color: "#000" }}>B.S., Boston University</div>
        <div style={{ fontSize: 4.8, color: "#64748b" }}>2000 — 2004</div>
      </div>
    </div>
  );
}

/* ─── Preview: Samantha Williams (With Photo 2) ───────────── */
function WithPhoto2Preview() {
  return (
    <div style={{ height: "100%", background: "#ffffff", fontFamily: "Georgia, serif", boxSizing: "border-box" }}>
      {/* Top Banner (Warm Beige) */}
      <div style={{ background: "#ece4dc", padding: "10px 12px", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 38, height: 42, background: "#d6ccc2", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#574c43", flexShrink: 0 }}>
          👩
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 400, color: "#111" }}>Samantha Williams</div>
          <div style={{ fontSize: 6, fontWeight: 700, color: "#111", margin: "1px 0 2px" }}>Senior Analyst</div>
          <div style={{ fontSize: 4.8, color: "#444", lineHeight: 1.3 }}>
            <div>New York, NY · (555) 789-1234</div>
            <div>samantha.williams@example.com</div>
          </div>
        </div>
      </div>

      {/* Two Column Body */}
      <div style={{ display: "flex", padding: "10px 12px", gap: 8 }}>
        {/* Left Column (34%) */}
        <div style={{ width: "34%" }}>
          <div style={{ fontSize: 6, fontWeight: 800, textTransform: "uppercase", textDecoration: "underline", color: "#000", marginBottom: 3 }}>Summary</div>
          <PLine w="100%" h={2.2} color="#94a3b8" mb={1} />
          <PLine w="90%" h={2.2} color="#94a3b8" mb={5} />

          <div style={{ fontSize: 6, fontWeight: 800, textTransform: "uppercase", textDecoration: "underline", color: "#000", marginBottom: 3 }}>Skills</div>
          <div style={{ fontSize: 4.8, color: "#333", display: "grid", gap: 1.5 }}>
            <div>• Project Management</div>
            <div>• SQL & Excel</div>
            <div>• Financial Analysis</div>
            <div>• Statistical Modeling</div>
          </div>
        </div>

        <div style={{ width: 1, background: "#e5e7eb" }} />

        {/* Right Column (66%) */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 6, fontWeight: 800, textTransform: "uppercase", textDecoration: "underline", color: "#000", marginBottom: 4 }}>Experience</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 5.5, fontStyle: "italic", fontWeight: 700 }}>
            <span>Senior Analyst</span>
            <span style={{ fontWeight: 400 }}>Jun 2021 — Current</span>
          </div>
          <div style={{ fontSize: 4.8, color: "#555", marginBottom: 2 }}>Loom & Lantern Co. - New York, NY</div>
          <PLine w="95%" h={2} color="#cbd5e1" mb={1} />
          <PLine w="85%" h={2} color="#cbd5e1" mb={4} />

          <div style={{ fontSize: 6, fontWeight: 800, textTransform: "uppercase", textDecoration: "underline", color: "#000", marginBottom: 3 }}>Education</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 5.5, fontStyle: "italic", fontWeight: 700 }}>
            <span>New York University</span>
            <span style={{ fontWeight: 400 }}>2013 — 2017</span>
          </div>
          <div style={{ fontSize: 4.8, color: "#555" }}>B.S., Economics</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Templates Catalog ──────────────────────────────────── */
const CATEGORIES = [
  { id: "All", label: "All Templates", icon: "📑" },
  { id: "With photo", label: "With photo", icon: "🖼" },
  { id: "Simple", label: "Simple", icon: "☆" },
  { id: "Modern", label: "Modern", icon: "🎨" },
];

const TEMPLATES = [
  // With Photo Templates (James Miller & Samantha Williams styles)
  {
    id: "withphoto_1",
    name: "Executive Gray",
    category: "With photo",
    tag: "Popular",
    tagColor: "#10b981",
    accent: "#334155",
    description: "Dual-tone layout with circular headshot sidebar, dark divider rules, and clean typography",
    Component: PhotoTemplate1,
  },
  {
    id: "withphoto_2",
    name: "Warm Editorial Serif",
    category: "With photo",
    tag: "Trending",
    tagColor: "#d97706",
    accent: "#78350f",
    description: "Warm beige header with square portrait, elegant Georgia serif typography, and underlined headers",
    Component: PhotoTemplate2,
  },

  // Simple Templates
  {
    id: "simple_1",
    name: "Classic Timeline",
    category: "Simple",
    tag: "Popular",
    tagColor: "#16a34a",
    accent: "#000000",
    description: "Two-column layout with timeline connectors and black-bordered skill pills",
    Component: SimpleTemplate1,
  },
  {
    id: "simple_2",
    name: "Clean Centered Serif",
    category: "Simple",
    tag: "ATS-Approved",
    tagColor: "#2563eb",
    accent: "#1e293b",
    description: "Centered serif title, dashed divider, and clean 2-column skills list",
    Component: SimpleTemplate2,
  },

  // Modern Templates
  {
    id: "modern_1",
    name: "Editorial Blush",
    category: "Modern",
    tag: "Trending",
    tagColor: "#f43f5e",
    accent: "#f43f5e",
    description: "Chic blush aesthetic, boxed contact table, and rose star accents",
    Component: ModernTemplate1,
  },
  {
    id: "modern_2",
    name: "Steel Blue Executive",
    category: "Modern",
    tag: "Popular",
    tagColor: "#3b82f6",
    accent: "#64748b",
    description: "Dual steel-blue header banner with integrated summary and 35/65 split body",
    Component: ModernTemplate2,
  },
  {
    id: "modern_3",
    name: "Europass Indigo",
    category: "Modern",
    tag: "New",
    tagColor: "#4f46e5",
    accent: "#505f9e",
    description: "Deep indigo banner with diamond section bullets and circular timeline indicators",
    Component: ModernTemplate3,
  },
];

/* ─── Step Indicator (Matches Reference Image) ───────────── */
export function StepIndicator({ current = 1 }) {
  const steps = [
    { num: 1, label: "Choose template" },
    { num: 2, label: "Enter your details" },
    { num: 3, label: "Download resume" },
  ];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 36,
      padding: "10px 0",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    }}>
      {steps.map((st, i) => {
        const isActive = st.num === current;
        const isPast = st.num < current;
        return (
          <React.Fragment key={st.num}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: isActive ? "#16a34a" : isPast ? "#15803d" : "#e2e8f0",
                color: isActive || isPast ? "#ffffff" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
                boxShadow: isActive ? "0 2px 8px rgba(22, 163, 74, 0.35)" : "none",
                transition: "all 0.3s ease"
              }}>
                {isPast ? "✓" : st.num}
              </div>
              <span className="step-indicator-label" style={{
                fontSize: 15,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#1e293b" : "#94a3b8",
                whiteSpace: "nowrap"
              }}>
                {st.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className="step-indicator-line" style={{
                width: 60,
                height: 1.5,
                background: isPast ? "#16a34a" : "#e2e8f0",
                margin: "0 14px",
                flexShrink: 0
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── Main TemplateSelector Component ────────────────────── */
export default function TemplateSelector({ onSelect, onSkip, initialSelected = "withphoto_1" }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(initialSelected || "withphoto_1");

  const filtered = activeCategory === "All" ? TEMPLATES : TEMPLATES.filter(t => t.category === activeCategory);

  const handleChoose = (id) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div style={{
      background: "#ffffff",
      minHeight: "100vh",
      padding: "36px 24px 100px",
      maxWidth: 1140,
      margin: "0 auto",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      color: "#0f172a"
    }}>
      {/* 1. Step Indicator matching reference */}
      <StepIndicator current={1} />

      {/* 2. Headline & Subheading matching reference */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 800,
          color: "#27272a",
          fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
          marginBottom: 10,
          letterSpacing: "-0.5px"
        }}>
          Resume templates
        </h1>
        <p style={{
          fontSize: 16,
          color: "#52525b",
          marginBottom: 12,
          maxWidth: 600,
          margin: "0 auto 12px"
        }}>
          Simple to use and ready in minutes resume templates — give it a try now!
        </p>
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: "none",
            color: "#16a34a",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            padding: 0
          }}
        >
          Choose later
        </button>
      </div>

      {/* 3. Category Filter Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        borderBottom: "1.5px solid #e4e4e7",
        marginBottom: 36,
        overflowX: "auto",
        scrollbarWidth: "none"
      }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "none",
                border: "none",
                borderBottom: isActive ? "2.5px solid #16a34a" : "2.5px solid transparent",
                color: isActive ? "#18181b" : "#71717a",
                fontWeight: isActive ? 600 : 500,
                fontSize: 15,
                cursor: "pointer",
                marginBottom: -1.5,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
            >
              <span style={{ fontSize: 16 }}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Large Templates Stack — Displayed One After Another */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "#fafafa",
          borderRadius: 16,
          border: "1.5px dashed #e4e4e7"
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#18181b", marginBottom: 6 }}>
            {activeCategory} Templates Coming Soon
          </div>
          <button
            onClick={() => setActiveCategory("All")}
            style={{
              background: "#16a34a",
              color: "#ffffff",
              border: "none",
              borderRadius: 50,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Browse All Templates →
          </button>
        </div>
      ) : (
        <div className="template-stack" style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          maxWidth: 850,
          margin: "0 auto",
          alignItems: "stretch"
        }}>
          {filtered.map(tpl => {
            const isSelected = selectedId === tpl.id;
            const TemplateComponent = tpl.Component;

            return (
              <div
                key={tpl.id}
                id={`template-${tpl.id}`}
                onClick={() => setSelectedId(tpl.id)}
                style={{
                  background: "#ffffff",
                  border: isSelected ? `2.5px solid ${tpl.accent || "#16a34a"}` : "1.5px solid #e2e8f0",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isSelected
                    ? `0 20px 44px rgba(0, 0, 0, 0.1), 0 0 0 3px ${tpl.accent || "#16a34a"}20`
                    : "0 4px 20px rgba(0, 0, 0, 0.04)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  scrollMarginTop: 90,
                }}
              >
                {/* Header Bar for Template */}
                <div style={{
                  padding: "16px 22px",
                  background: isSelected ? "rgba(22, 163, 74, 0.04)" : "#fafafa",
                  borderBottom: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 14
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" }}>
                        {tpl.name}
                      </h3>
                      {tpl.tag && (
                        <span style={{
                          background: tpl.tagColor,
                          color: "#ffffff",
                          fontSize: 10.5,
                          fontWeight: 700,
                          padding: "2.5px 10px",
                          borderRadius: 20,
                          boxShadow: `0 2px 6px ${tpl.tagColor}35`
                        }}>
                          {tpl.tag}
                        </span>
                      )}
                      <span style={{
                        fontSize: 11.5,
                        color: "#64748b",
                        background: "#f1f5f9",
                        padding: "2px 7px",
                        borderRadius: 6
                      }}>
                        {tpl.category}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
                      {tpl.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {isSelected && (
                      <span style={{
                        color: "#16a34a",
                        fontWeight: 700,
                        fontSize: 13.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 5
                      }}>
                        ✓ Selected
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChoose(tpl.id);
                      }}
                      style={{
                        background: isSelected
                          ? "linear-gradient(135deg, #16a34a, #15803d)"
                          : (tpl.accent === "#000000" ? "#1e293b" : tpl.accent),
                        color: "#ffffff",
                        border: "none",
                        borderRadius: 50,
                        padding: "9px 24px",
                        fontSize: 13.5,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        transition: "all 0.2s ease"
                      }}
                    >
                      {isSelected ? "Use this template →" : "Select this template"}
                    </button>
                  </div>
                </div>

                {/* Large, High-Fidelity Resume Template Container */}
                <div style={{
                  background: "#f1f5f9",
                  padding: "24px 16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  maxHeight: 720,
                  overflowY: "auto",
                  borderBottom: "1px solid #f1f5f9"
                }}>
                  <div style={{
                    width: "100%",
                    maxWidth: 790,
                    background: "#ffffff",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.07)",
                    borderRadius: 4,
                    overflow: "hidden"
                  }}>
                    {TemplateComponent ? (
                      <TemplateComponent resume={SAMPLE_RESUME} />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom CTA Bar when a template is active */}
      {selectedId && (
        <div className="template-floating-cta" style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          animation: "fadeUp 0.25s ease-out"
        }}>
          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translate(-50%, 15px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
          `}</style>
          <button
            onClick={() => onSelect(selectedId)}
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#ffffff",
              border: "none",
              borderRadius: 50,
              padding: "16px 44px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 14px 36px rgba(22, 163, 74, 0.45)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              whiteSpace: "nowrap",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 18px 42px rgba(22, 163, 74, 0.55)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 14px 36px rgba(22, 163, 74, 0.45)";
            }}
          >
            Use {TEMPLATES.find(t => t.id === selectedId)?.name || "Selected"} template →
          </button>
        </div>
      )}
    </div>
  );
}
