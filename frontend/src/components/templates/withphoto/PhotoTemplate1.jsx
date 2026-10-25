import React from "react";

/**
 * PhotoTemplate1 - James Miller Reference Style
 * - Left Column: Soft cool-gray background, circular headshot, skills with bullets, languages
 * - Right Column: Pure white, uppercase bold name, subtitle role, contact info with icons,
 *   Summary, Experience, Education, Projects
 */
export default function PhotoTemplate1({ resume }) {
  if (!resume) return null;

  const {
    personalInfo = {},
    targetRole = "",
    summary = "",
    education = [],
    skills = {},
    languages = [],
    projects = [],
    experience = [],
    certifications = [],
    achievements = [],
  } = resume;

  // Flatten / extract skills list
  let skillItems = [];
  if (Array.isArray(skills)) {
    skillItems = skills.filter(Boolean);
  } else if (typeof skills === "object" && skills !== null) {
    Object.values(skills).forEach((val) => {
      if (Array.isArray(val)) {
        skillItems.push(...val.filter(Boolean));
      } else if (typeof val === "string") {
        skillItems.push(...val.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean));
      }
    });
  } else if (typeof skills === "string") {
    skillItems = skills.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
  }

  // Flatten languages
  let langItems = [];
  if (Array.isArray(languages)) {
    langItems = languages.filter(Boolean);
  } else if (typeof languages === "string") {
    langItems = languages.split(/[,;\n]/).map((l) => l.trim()).filter(Boolean);
  }

  const roleTitle = targetRole || personalInfo.title || "Financial Analyst";
  const photo = personalInfo.photoUrl || personalInfo.photo || "";

  return (
    <div
      className="photo-template-1"
      style={{
        background: "#ffffff",
        color: "#18181b",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
        maxWidth: 840,
        margin: "0 auto",
        display: "flex",
        minHeight: 1080,
        boxSizing: "border-box",
      }}
    >
      {/* ─── LEFT COLUMN (Sidebar with Photo) ───────────────────── */}
      <div
        style={{
          width: "35%",
          background: "#eceff2",
          padding: "36px 24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e2e8f0",
        }}
      >
        {/* Circular Headshot */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          {photo ? (
            <img
              src={photo}
              alt={personalInfo.name || "Profile"}
              style={{
                width: 155,
                height: 155,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #ffffff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                background: "#cbd5e1",
              }}
            />
          ) : (
            <div
              style={{
                width: 155,
                height: 155,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #cbd5e1, #94a3b8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                border: "4px solid #ffffff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span style={{ fontSize: 10, marginTop: 4, fontWeight: 600 }}>Photo</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#64748b", width: "100%", marginBottom: 22 }} />

        {/* SKILLS SECTION */}
        {skillItems.length > 0 && (
          <div style={{ marginBottom: 26 }}>
            <h3
              style={{
                fontSize: "12.5px",
                fontWeight: 800,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#0f172a",
                margin: "0 0 12px 0",
              }}
            >
              Skills
            </h3>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#1e293b", fontSize: "11.5px", lineHeight: 1.7 }}>
              {skillItems.map((skill, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {langItems.length > 0 && (
          <div style={{ height: 1, background: "#64748b", width: "100%", marginBottom: 22 }} />
        )}

        {/* LANGUAGES SECTION */}
        {langItems.length > 0 && (
          <div style={{ marginBottom: 26 }}>
            <h3
              style={{
                fontSize: "12.5px",
                fontWeight: 800,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#0f172a",
                margin: "0 0 12px 0",
              }}
            >
              Languages
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {langItems.map((lang, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#1e293b",
                    letterSpacing: "0.4px",
                  }}
                >
                  {lang}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS (if provided) */}
        {certifications.length > 0 && (
          <>
            <div style={{ height: 1, background: "#64748b", width: "100%", marginBottom: 22 }} />
            <div style={{ marginBottom: 26 }}>
              <h3
                style={{
                  fontSize: "12.5px",
                  fontWeight: 800,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  color: "#0f172a",
                  margin: "0 0 12px 0",
                }}
              >
                Certifications
              </h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#1e293b", fontSize: "11px", lineHeight: 1.6 }}>
                {certifications.map((c, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>
                    {typeof c === "string" ? c : c.name || c.title}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* ─── RIGHT COLUMN (Main Content) ────────────────────────── */}
      <div
        style={{
          width: "65%",
          background: "#ffffff",
          padding: "36px 36px 36px 32px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Name & Role Header */}
        <div style={{ marginBottom: 18 }}>
          <h1
            style={{
              fontSize: "27px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "#000000",
              margin: "0 0 4px 0",
            }}
          >
            {personalInfo.name || "JAMES MILLER"}
          </h1>
          <div
            style={{
              fontSize: "13.5px",
              fontWeight: 500,
              color: "#334155",
              marginBottom: 14,
            }}
          >
            {roleTitle}
          </div>

          {/* Contact Details with Clean SVG Icons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: "11.5px", color: "#1e293b" }}>
            {personalInfo.email && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY SECTION */}
        {summary && (
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "#000000",
                margin: "0 0 8px 0",
              }}
            >
              Summary
            </h2>
            <p style={{ margin: 0, fontSize: "11.5px", lineHeight: 1.55, color: "#27272a" }}>
              {summary}
            </p>
          </div>
        )}

        {/* EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "#000000",
                margin: "0 0 12px 0",
              }}
            >
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#000000" }}>
                    {exp.title}
                    {exp.company && <span style={{ fontWeight: 600 }}>, {exp.company}</span>}
                    {exp.location && <span style={{ fontWeight: 400, color: "#52525b" }}>, {exp.location}</span>}
                  </div>
                  {(exp.duration || exp.dates) && (
                    <div style={{ fontSize: "10.5px", color: "#52525b", marginTop: 1, marginBottom: 5 }}>
                      {exp.duration || exp.dates}
                    </div>
                  )}

                  {/* Bullet Points */}
                  {Array.isArray(exp.bullets) && exp.bullets.length > 0 ? (
                    <ul style={{ margin: "4px 0 0 0", paddingLeft: 18, fontSize: "11px", lineHeight: 1.55, color: "#27272a" }}>
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: 3 }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p style={{ margin: "4px 0 0 0", fontSize: "11px", lineHeight: 1.55, color: "#27272a" }}>
                      {exp.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS (if available) */}
        {projects.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "#000000",
                margin: "0 0 12px 0",
              }}
            >
              Projects
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {projects.map((proj, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#000000" }}>
                    {proj.title}
                    {proj.subtitle && <span style={{ fontWeight: 400, color: "#52525b" }}> — {proj.subtitle}</span>}
                  </div>
                  {proj.techStack && (
                    <div style={{ fontSize: "10px", color: "#64748b", margin: "2px 0 4px" }}>
                      Tech Stack: {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                    </div>
                  )}
                  {Array.isArray(proj.bullets) && proj.bullets.length > 0 ? (
                    <ul style={{ margin: "3px 0 0 0", paddingLeft: 18, fontSize: "11px", lineHeight: 1.55, color: "#27272a" }}>
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: 2 }}>{b}</li>
                      ))}
                    </ul>
                  ) : proj.description ? (
                    <p style={{ margin: "3px 0 0 0", fontSize: "11px", lineHeight: 1.55, color: "#27272a" }}>
                      {proj.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION SECTION */}
        {education.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "#000000",
                margin: "0 0 10px 0",
              }}
            >
              Education
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#000000" }}>
                    {edu.degree || edu.degreeTitle || "Degree"}
                    {edu.institution && <span>, {edu.institution}</span>}
                  </div>
                  {edu.year && (
                    <div style={{ fontSize: "10.5px", color: "#52525b", marginTop: 1 }}>
                      {edu.year}
                    </div>
                  )}
                  {edu.details && (
                    <div style={{ fontSize: "10.5px", color: "#3f3f46", marginTop: 2 }}>
                      {edu.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
