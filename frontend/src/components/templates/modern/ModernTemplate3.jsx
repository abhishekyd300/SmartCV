import React from "react";

/**
 * ModernTemplate3 - Based on "DANIEL GALLEGO" Europass Blue reference
 * - Deep periwinkle / blue header with European style emblem
 * - Left column (~44%): Diamond bullet headers (◆), About Me, Contacts, Social links, Skills, Languages/Certifications
 * - Right column (~56%): Timeline indicators with hollow blue circles (○), Experience & Education with company and location
 */
export default function ModernTemplate3({ resume }) {
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

  const primaryAccent = "#505f9e";

  return (
    <div className="modern-template-3" style={{
      background: "#ffffff",
      color: "#1e293b",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      maxWidth: 820,
      margin: "0 auto",
      boxSizing: "border-box",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      border: "1px solid #e2e8f0"
    }}>
      {/* Top Banner (Europass Indigo/Blue) */}
      <div style={{
        background: primaryAccent,
        color: "#ffffff",
        padding: "26px 36px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{
            fontSize: "26px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            margin: "0 0 4px 0",
            color: "#ffffff"
          }}>
            {personalInfo.name || "DANIEL GALLEGO"}
          </h1>
          <div style={{
            fontSize: "13px",
            color: "#e0e7ff",
            fontWeight: 500
          }}>
            {targetRole || personalInfo.title || "Senior Project Manager"}
          </div>
        </div>

      </div>

      {/* Main Body Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "44% 56%", padding: "32px 36px", gap: "36px" }}>
        {/* Left Column: About Me, Contacts, Links, Skills */}
        <div>
          {/* ABOUT ME */}
          {summary && (
            <div style={{ marginBottom: 26 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10
              }}>
                <span style={{ color: primaryAccent, fontSize: "13px" }}>◆</span>
                <span style={{ fontWeight: 800, fontSize: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  ABOUT ME
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>
              <div style={{ fontSize: "12px", lineHeight: 1.5, color: "#334155", textAlign: "justify" }}>
                {summary}
              </div>
            </div>
          )}

          {/* CONTACTS */}
          <div style={{ marginBottom: 26 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12
            }}>
              <span style={{ color: primaryAccent, fontSize: "13px" }}>◆</span>
              <span style={{ fontWeight: 800, fontSize: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                CONTACTS
              </span>
              <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
            </div>

            <div style={{ fontSize: "12px", display: "grid", gap: "8px", color: "#1e293b" }}>
              {personalInfo.phone && (
                <div>
                  <strong style={{ fontSize: "11px", textTransform: "uppercase", color: "#0f172a" }}>PHONE NUMBER:</strong>{" "}
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div style={{ wordBreak: "break-all" }}>
                  <strong style={{ fontSize: "11px", textTransform: "uppercase", color: "#0f172a" }}>EMAIL ADDRESS:</strong>{" "}
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.location && (
                <div>
                  <strong style={{ fontSize: "11px", textTransform: "uppercase", color: "#0f172a" }}>ADDRESS:</strong>{" "}
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* SOCIAL LINKS (WEBSITE) */}
          {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
            <div style={{ marginBottom: 26 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{ color: primaryAccent, fontSize: "13px" }}>◆</span>
                <span style={{ fontWeight: 800, fontSize: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  SOCIAL LINKS (WEBSITE)
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <div style={{ fontSize: "12px", display: "grid", gap: "6px" }}>
                {personalInfo.linkedin && (
                  <div>
                    <strong style={{ fontSize: "11px", textTransform: "uppercase", color: "#0f172a" }}>LINKEDIN:</strong>{" "}
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", wordBreak: "break-all" }}>
                      {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </div>
                )}
                {personalInfo.github && (
                  <div>
                    <strong style={{ fontSize: "11px", textTransform: "uppercase", color: "#0f172a" }}>GITHUB:</strong>{" "}
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", wordBreak: "break-all" }}>
                      {personalInfo.github.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div>
                    <strong style={{ fontSize: "11px", textTransform: "uppercase", color: "#0f172a" }}>PORTFOLIO:</strong>{" "}
                    <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", wordBreak: "break-all" }}>
                      {personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {skillItems.length > 0 && (
            <div style={{ marginBottom: 26 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{ color: primaryAccent, fontSize: "13px" }}>◆</span>
                <span style={{ fontWeight: 800, fontSize: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  SKILLS
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", lineHeight: 1.5, color: "#1e293b" }}>
                {skillItems.map((skill, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* LANGUAGES */}
          {languageItems.length > 0 && (
            <div style={{ marginBottom: 26 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{ color: primaryAccent, fontSize: "13px" }}>◆</span>
                <span style={{ fontWeight: 800, fontSize: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  LANGUAGES
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", lineHeight: 1.5, color: "#1e293b" }}>
                {languageItems.map((lang, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications && certifications.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{ color: primaryAccent, fontSize: "13px" }}>◆</span>
                <span style={{ fontWeight: 800, fontSize: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  CERTIFICATIONS
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", lineHeight: 1.45, color: "#1e293b" }}>
                {certifications.map((c, idx) => (
                  <li key={idx} style={{ marginBottom: 3 }}>
                    {typeof c === "string" ? c : c.name || c.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {achievements && achievements.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{ color: primaryAccent, fontSize: "13px" }}>◆</span>
                <span style={{ fontWeight: 800, fontSize: "13.5px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  ACHIEVEMENTS
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", lineHeight: 1.45, color: "#1e293b" }}>
                {achievements.map((a, idx) => (
                  <li key={idx} style={{ marginBottom: 3 }}>
                    {typeof a === "string" ? a : a.description || a.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Experience, Education, Projects */}
        <div>
          {/* EXPERIENCE */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16
              }}>
                <span style={{ fontWeight: 800, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  EXPERIENCE
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <div>
                {experience.map((exp, idx) => {
                  const bullets = Array.isArray(exp.bullets)
                    ? exp.bullets
                    : typeof exp.description === "string"
                      ? exp.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                      : [];

                  return (
                    <div key={idx} style={{ marginBottom: 18, position: "relative", paddingLeft: 18 }}>
                      {/* Timeline circle */}
                      <span style={{
                        position: "absolute",
                        left: 0,
                        top: 3,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        border: `2px solid ${primaryAccent}`,
                        background: "#ffffff"
                      }} />

                      {/* Date & Location */}
                      <div style={{ fontSize: "11px", color: "#64748b", marginBottom: 3 }}>
                        {exp.duration}{exp.location ? ` ${exp.location}` : ""}
                      </div>

                      {/* Title & Company */}
                      <div style={{ fontSize: "13px", marginBottom: 6 }}>
                        <strong style={{ color: "#0f172a" }}>{exp.title}</strong>
                        {exp.company && <span style={{ color: "#334155" }}> | {exp.company}</span>}
                      </div>

                      {/* Bullets */}
                      {bullets.length > 0 && (
                        <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11.5px", lineHeight: 1.45, color: "#334155" }}>
                          {bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ marginBottom: 3 }}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16
              }}>
                <span style={{ fontWeight: 800, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  EDUCATION
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <div>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: 16, position: "relative", paddingLeft: 18 }}>
                    <span style={{
                      position: "absolute",
                      left: 0,
                      top: 3,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      border: `2px solid ${primaryAccent}`,
                      background: "#ffffff"
                    }} />

                    <div style={{ fontSize: "11px", color: "#64748b", marginBottom: 3 }}>
                      {edu.year || edu.duration}{edu.location ? ` ${edu.location}` : ""}
                    </div>

                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                      {edu.degree || "Degree"}
                    </div>

                    <div style={{ fontSize: "12px", color: "#475569" }}>
                      {edu.institution || edu.school}
                    </div>

                    {edu.details && (
                      <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: 2 }}>
                        {edu.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14
              }}>
                <span style={{ fontWeight: 800, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#0f172a" }}>
                  PROJECTS
                </span>
                <div style={{ flex: 1, height: 1, background: "#cbd5e1" }} />
              </div>

              <div>
                {projects.map((proj, idx) => {
                  const bullets = Array.isArray(proj.bullets)
                    ? proj.bullets
                    : typeof proj.description === "string"
                      ? proj.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                      : [];

                  return (
                    <div key={idx} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontWeight: 700, fontSize: "13px", color: "#0f172a" }}>
                          {proj.title}
                          {proj.subtitle && <span style={{ fontWeight: 500, color: "#64748b" }}> — {proj.subtitle}</span>}
                        </span>
                        <div style={{ fontSize: "11px" }}>
                          {proj.links?.github && <a href={proj.links.github} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", marginRight: 8 }}>GitHub</a>}
                          {proj.links?.live && <a href={proj.links.live} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>Live</a>}
                        </div>
                      </div>

                      {proj.techStack && (
                        <div style={{ fontSize: "11px", color: primaryAccent, fontWeight: 500, marginBottom: 3 }}>
                          {Array.isArray(proj.techStack) ? proj.techStack.join(" · ") : proj.techStack}
                        </div>
                      )}

                      {bullets.length > 0 && (
                        <ul style={{ margin: "2px 0 0 0", paddingLeft: "16px", fontSize: "11.5px", lineHeight: 1.45, color: "#334155" }}>
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
      </div>
    </div>
  );
}
