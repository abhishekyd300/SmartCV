import React from "react";

/**
 * SimpleTemplate1 - Based on "Daryl Banks" reference
 * - Thick black bars above and below header
 * - Bold uppercase name & role
 * - Left column (~68%): Summary, Experience with timeline circles, Education with timeline circles, Projects
 * - Right column (~32%): Contact details with icons, Skills in black-bordered pills
 */
export default function SimpleTemplate1({ resume }) {
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

  // Flatten / extract skills list without inventing any new skills
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

  return (
    <div className="simple-template-1" style={{
      background: "#ffffff",
      color: "#000000",
      fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif",
      padding: "36px 44px",
      fontSize: "12.5px",
      lineHeight: 1.4,
      maxWidth: 820,
      margin: "0 auto",
      boxSizing: "border-box"
    }}>
      {/* Top Black Bar */}
      <div style={{ height: 3.5, background: "#000000", width: "100%", marginBottom: 14 }} />

      {/* Header Area */}
      <div style={{ marginBottom: 14 }}>
        <h1 style={{
          fontSize: "26px",
          fontWeight: 800,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          margin: "0 0 4px 0",
          color: "#000000"
        }}>
          {personalInfo.name || "DARYL BANKS"}
        </h1>
        <div style={{
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color: "#222222"
        }}>
          {targetRole || personalInfo.title || "DRIVER"}
        </div>
      </div>

      {/* Bottom Header Black Bar */}
      <div style={{ height: 3, background: "#000000", width: "100%", marginBottom: 22 }} />

      {/* Two Column Layout */}
      <div style={{ display: "flex", gap: "24px" }}>
        {/* Left Column (Content & Timelines) */}
        <div style={{ flex: "1 1 66%", minWidth: 0 }}>
          {/* SUMMARY */}
          {summary && (
            <div style={{ marginBottom: 22 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800,
                fontSize: "13.5px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #d4d4d8",
                paddingBottom: 4,
                marginBottom: 8
              }}>
                <span>📄</span>
                <span>SUMMARY</span>
              </div>
              <div style={{ fontSize: "12px", lineHeight: 1.45, color: "#18181b", textAlign: "justify" }}>
                {summary}
              </div>
            </div>
          )}

          {/* EXPERIENCE WITH TIMELINE */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800,
                fontSize: "13.5px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #d4d4d8",
                paddingBottom: 4,
                marginBottom: 12
              }}>
                <span>💼</span>
                <span>EXPERIENCE</span>
              </div>

              <div style={{ position: "relative" }}>
                {experience.map((exp, idx) => {
                  const isLast = idx === experience.length - 1;
                  const bullets = Array.isArray(exp.bullets)
                    ? exp.bullets
                    : typeof exp.description === "string"
                    ? exp.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                    : [];

                  return (
                    <div key={idx} style={{ display: "flex", position: "relative", marginBottom: isLast ? 0 : 16 }}>
                      {/* Timeline Left: Dates + Circle + Vertical Line */}
                      <div style={{ width: "140px", flexShrink: 0, paddingRight: "14px", position: "relative" }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontWeight: 700,
                          fontSize: "11px",
                          textTransform: "uppercase",
                          color: "#000"
                        }}>
                          <span style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            border: "1.5px solid #000",
                            background: "#fff",
                            display: "inline-block",
                            flexShrink: 0
                          }} />
                          <span>{exp.duration || "MAR 2013 — JUL 2019"}</span>
                        </div>

                        {/* Connecting vertical line */}
                        {!isLast && (
                          <div style={{
                            position: "absolute",
                            left: 3,
                            top: 14,
                            bottom: -16,
                            width: 1,
                            background: "#d4d4d8"
                          }} />
                        )}
                      </div>

                      {/* Timeline Right: Role, Company, Bullets */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: "12.5px", textTransform: "uppercase", color: "#000" }}>
                          {exp.title || "DRIVER"}
                        </div>
                        {(exp.company || exp.location) && (
                          <div style={{ fontWeight: 700, fontSize: "12px", color: "#18181b", marginBottom: 4 }}>
                            {exp.company}{exp.location ? `, ${exp.location}` : ""}
                          </div>
                        )}
                        {bullets.length > 0 && (
                          <ul style={{ margin: "4px 0 0 0", paddingLeft: "16px", fontSize: "11.5px", lineHeight: 1.4 }}>
                            {bullets.map((b, bIdx) => (
                              <li key={bIdx} style={{ marginBottom: 3 }}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EDUCATION WITH TIMELINE */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800,
                fontSize: "13.5px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #d4d4d8",
                paddingBottom: 4,
                marginBottom: 12
              }}>
                <span>📖</span>
                <span>EDUCATION</span>
              </div>

              <div>
                {education.map((edu, idx) => {
                  const isLast = idx === education.length - 1;
                  return (
                    <div key={idx} style={{ display: "flex", position: "relative", marginBottom: isLast ? 0 : 12 }}>
                      <div style={{ width: "140px", flexShrink: 0, paddingRight: "14px", position: "relative" }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontWeight: 700,
                          fontSize: "11px",
                          textTransform: "uppercase",
                          color: "#000"
                        }}>
                          <span style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            border: "1.5px solid #000",
                            background: "#fff",
                            display: "inline-block",
                            flexShrink: 0
                          }} />
                          <span>{edu.year || edu.duration || "AUG 2013 - APR 2017"}</span>
                        </div>
                        {!isLast && (
                          <div style={{
                            position: "absolute",
                            left: 3,
                            top: 14,
                            bottom: -12,
                            width: 1,
                            background: "#d4d4d8"
                          }} />
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: "12.5px", textTransform: "uppercase", color: "#000" }}>
                          {edu.institution || edu.school || "PHOENIX DRIVING SCHOOL"}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: "12px", color: "#18181b" }}>
                          {edu.degree || "Commercial Driver's License"}{edu.location ? `, ${edu.location}` : ""}
                        </div>
                        {edu.details && (
                          <div style={{ fontSize: "11.5px", color: "#3f3f46", marginTop: 2 }}>{edu.details}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PROJECTS (If present) */}
          {projects && projects.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800,
                fontSize: "13.5px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #d4d4d8",
                paddingBottom: 4,
                marginBottom: 10
              }}>
                <span>📁</span>
                <span>PROJECTS</span>
              </div>

              <div>
                {projects.map((proj, idx) => {
                  const bullets = Array.isArray(proj.bullets)
                    ? proj.bullets
                    : typeof proj.description === "string"
                    ? proj.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                    : [];

                  return (
                    <div key={idx} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontWeight: 800, fontSize: "12.5px", textTransform: "uppercase", color: "#000" }}>
                          {proj.title}
                          {proj.subtitle && <span style={{ fontWeight: 600, textTransform: "none", color: "#333" }}> — {proj.subtitle}</span>}
                        </span>
                        <div style={{ fontSize: "11px" }}>
                          {proj.links?.github && (
                            <a href={proj.links.github} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "underline", marginRight: 8 }}>
                              GitHub
                            </a>
                          )}
                          {proj.links?.live && (
                            <a href={proj.links.live} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "underline" }}>
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>

                      {proj.techStack && (
                        <div style={{ fontSize: "11.5px", color: "#3f3f46", fontStyle: "italic", marginBottom: 3 }}>
                          Tech: {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                        </div>
                      )}

                      {bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "16px", fontSize: "11.5px", lineHeight: 1.4 }}>
                          {bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ marginBottom: 2 }}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div style={{ width: "1px", background: "#e4e4e7", alignSelf: "stretch" }} />

        {/* Right Column (Contact & Skills) */}
        <div style={{ flex: "0 0 32%", minWidth: 0, paddingLeft: 4 }}>
          {/* Contact Details with Icons */}
          <div style={{ marginBottom: 24, fontSize: "12px", display: "grid", gap: "8px" }}>
            {personalInfo.email && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                <span style={{ fontSize: "13px" }}>✉</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "13px" }}>📱</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ fontSize: "13px", marginTop: 1 }}>📍</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                <span style={{ fontSize: "13px" }}>🔗</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "none" }}>
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                <span style={{ fontSize: "13px" }}>💻</span>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "none" }}>
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                </a>
              </div>
            )}
            {personalInfo.portfolio && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, wordBreak: "break-all" }}>
                <span style={{ fontSize: "13px" }}>🌐</span>
                <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "none" }}>
                  {personalInfo.portfolio.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* SKILLS with Black Border Pills */}
          {skillItems.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800,
                fontSize: "13.5px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #d4d4d8",
                paddingBottom: 4,
                marginBottom: 12
              }}>
                <span>🏆</span>
                <span>SKILLS</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "7px", alignItems: "flex-start" }}>
                {skillItems.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      border: "1.2px solid #000000",
                      borderRadius: "18px",
                      padding: "3px 12px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      color: "#000000",
                      background: "#ffffff",
                      lineHeight: "1.35",
                      display: "inline-block",
                      maxWidth: "100%",
                      wordBreak: "break-word"
                    }}
                  >
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
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                borderBottom: "1px solid #d4d4d8",
                paddingBottom: 4,
                marginBottom: 8
              }}>
                <span>🎖</span>
                <span>CERTIFICATIONS</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11.5px", lineHeight: 1.4 }}>
                {certifications.map((c, i) => (
                  <li key={i} style={{ marginBottom: 3 }}>
                    {typeof c === "string" ? c : c.name || c.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements (if provided) */}
          {achievements && achievements.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                borderBottom: "1px solid #d4d4d8",
                paddingBottom: 4,
                marginBottom: 8
              }}>
                <span>⭐</span>
                <span>ACHIEVEMENTS</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11.5px", lineHeight: 1.4 }}>
                {achievements.map((a, i) => (
                  <li key={i} style={{ marginBottom: 3 }}>
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
