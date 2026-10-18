import React from "react";

/**
 * ModernTemplate2 - Based on "Samantha Williams" (Steel Blue Header) reference
 * - Steel-blue / slate-blue dual header banner
 * - Left header: Bold name, target role, contact items with clean icons
 * - Right header: Summary section with dark text and underline
 * - Body: Left column (~35%) for Education & Skills; Right column (~65%) for Experience & Projects
 */
export default function ModernTemplate2({ resume }) {
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

  // Flatten skills
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
  let languageItems = [];
  if (Array.isArray(languages)) {
    languageItems = languages.filter(Boolean);
  } else if (typeof languages === "string") {
    languageItems = languages.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean);
  }

  return (
    <div className="modern-template-2" style={{
      background: "#ffffff",
      color: "#1e293b",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      maxWidth: 820,
      margin: "0 auto",
      boxSizing: "border-box",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      border: "1px solid #cbd5e1"
    }}>
      {/* Top Banner (Steel Blue / Slate Blue) */}
      <div style={{
        background: "#94b4c7",
        display: "grid",
        gridTemplateColumns: "35% 65%",
        borderBottom: "1px solid #7c9eb2"
      }}>
        {/* Left Header: Name, Title, Contacts */}
        <div style={{
          padding: "32px 28px",
          borderRight: "1px solid rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h1 style={{
            fontSize: "26px",
            fontWeight: 800,
            margin: "0 0 6px 0",
            color: "#1e293b",
            letterSpacing: "-0.3px",
            lineHeight: 1.15
          }}>
            {personalInfo.name || "Samantha Williams"}
          </h1>
          <div style={{
            fontSize: "13.5px",
            fontWeight: 600,
            color: "#334155",
            marginBottom: 16
          }}>
            {targetRole || personalInfo.title || "Senior Sales Associate"}
          </div>

          <div style={{ display: "grid", gap: "8px", fontSize: "11.5px", color: "#1e293b" }}>
            {personalInfo.email && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                <span>✉</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>📱</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>📍</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                <span>🔗</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "#1e293b", textDecoration: "none" }}>
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                <span>💻</span>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: "#1e293b", textDecoration: "none" }}>
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Header: Summary */}
        <div style={{ padding: "32px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            color: "#1e293b",
            borderBottom: "1.5px solid #1e293b",
            display: "inline-block",
            paddingBottom: 2,
            marginBottom: 12,
            alignSelf: "flex-start"
          }}>
            SUMMARY
          </div>
          <div style={{
            fontSize: "12px",
            lineHeight: 1.5,
            color: "#1e293b",
            textAlign: "justify"
          }}>
            {summary || "Experienced professional with proven expertise and dedication to delivering measurable business impact."}
          </div>
        </div>
      </div>

      {/* Body Section: Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "35% 65%", minHeight: "600px" }}>
        {/* Left Column: Education & Skills */}
        <div style={{
          padding: "28px",
          borderRight: "1px solid #cbd5e1"
        }}>
          {/* EDUCATION */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1e293b",
                borderBottom: "1.5px solid #1e293b",
                paddingBottom: 2,
                marginBottom: 14,
                display: "inline-block"
              }}>
                EDUCATION
              </div>

              {education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: "12px", color: "#0f172a" }}>
                    {edu.institution || edu.school}
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b", fontStyle: "italic", marginBottom: 2 }}>
                    {edu.location ? `${edu.location} · ` : ""}{edu.year || edu.duration}
                  </div>
                  {edu.degree && (
                    <div style={{ fontWeight: 700, fontSize: "11.5px", color: "#1e293b" }}>
                      {edu.degree}
                    </div>
                  )}
                  {edu.details && (
                    <div style={{ fontSize: "11px", color: "#475569", marginTop: 2 }}>
                      {edu.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {skillItems.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1e293b",
                borderBottom: "1.5px solid #1e293b",
                paddingBottom: 2,
                marginBottom: 14,
                display: "inline-block"
              }}>
                SKILLS
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                {skillItems.map((skill, idx) => (
                  <div key={idx} style={{ fontSize: "12px", color: "#1e293b" }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (if provided) */}
          {certifications && certifications.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1e293b",
                borderBottom: "1.5px solid #1e293b",
                paddingBottom: 2,
                marginBottom: 12,
                display: "inline-block"
              }}>
                CERTIFICATIONS
              </div>
              <div style={{ display: "grid", gap: "6px", fontSize: "11.5px", color: "#1e293b" }}>
                {certifications.map((c, idx) => (
                  <div key={idx}>• {typeof c === "string" ? c : c.name || c.title}</div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languageItems.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1e293b",
                borderBottom: "1.5px solid #1e293b",
                paddingBottom: 2,
                marginBottom: 12,
                display: "inline-block"
              }}>
                LANGUAGES
              </div>
              <div style={{ display: "grid", gap: "6px", fontSize: "11.5px", color: "#1e293b" }}>
                {languageItems.map((lang, idx) => (
                  <div key={idx}>• {lang}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Experience & Projects */}
        <div style={{ padding: "28px 32px" }}>
          {/* EXPERIENCE */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1e293b",
                borderBottom: "1.5px solid #1e293b",
                paddingBottom: 2,
                marginBottom: 16,
                display: "inline-block"
              }}>
                EXPERIENCE
              </div>

              {experience.map((exp, idx) => {
                const bullets = Array.isArray(exp.bullets)
                  ? exp.bullets
                  : typeof exp.description === "string"
                  ? exp.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                  : [];

                return (
                  <div key={idx} style={{ marginBottom: 18 }}>
                    <div style={{ fontWeight: 800, fontSize: "13px", color: "#0f172a" }}>
                      {exp.title}{exp.company ? ` - ${exp.company}` : ""}
                    </div>
                    <div style={{ fontSize: "11.5px", color: "#64748b", fontStyle: "italic", marginBottom: 6 }}>
                      {exp.location ? `${exp.location} · ` : ""}{exp.duration}
                    </div>
                    {bullets.length > 0 && (
                      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "#334155" }}>
                        {bullets.map((b, bIdx) => (
                          <p key={bIdx} style={{ margin: "0 0 6px 0" }}>{b}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1e293b",
                borderBottom: "1.5px solid #1e293b",
                paddingBottom: 2,
                marginBottom: 16,
                display: "inline-block"
              }}>
                PROJECTS
              </div>

              {projects.map((proj, idx) => {
                const bullets = Array.isArray(proj.bullets)
                  ? proj.bullets
                  : typeof proj.description === "string"
                  ? proj.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                  : [];

                return (
                  <div key={idx} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontWeight: 800, fontSize: "13px", color: "#0f172a" }}>
                        {proj.title}
                        {proj.subtitle && <span style={{ fontWeight: 600, color: "#64748b" }}> — {proj.subtitle}</span>}
                      </span>
                      <div style={{ fontSize: "11px" }}>
                        {proj.links?.github && (
                          <a href={proj.links.github} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", marginRight: 8 }}>
                            GitHub
                          </a>
                        )}
                        {proj.links?.live && (
                          <a href={proj.links.live} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                            Live
                          </a>
                        )}
                      </div>
                    </div>

                    {proj.techStack && (
                      <div style={{ fontSize: "11.5px", color: "#475569", fontStyle: "italic", marginBottom: 4 }}>
                        Tech: {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                      </div>
                    )}

                    {bullets.length > 0 && (
                      <div style={{ fontSize: "12px", lineHeight: 1.5, color: "#334155" }}>
                        {bullets.map((b, bIdx) => (
                          <p key={bIdx} style={{ margin: "0 0 4px 0" }}>{b}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {achievements && achievements.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1e293b",
                borderBottom: "1.5px solid #1e293b",
                paddingBottom: 2,
                marginBottom: 12,
                display: "inline-block"
              }}>
                ACHIEVEMENTS
              </div>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "#334155" }}>
                {achievements.map((a, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {typeof a === "string" ? a : a.description || a.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
