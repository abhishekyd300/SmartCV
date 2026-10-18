import React from "react";

/**
 * ModernTemplate1 - Based on "Olivia Wilson" reference
 * - Chic editorial design with soft blush/cream accents
 * - Name in large classic serif with subtle blush aura
 * - Boxed contact table on top right
 * - Two-column layout with blush section headers and decorative star accents (✦)
 * - Pink bullet points and clean serif/sans typography
 */
export default function ModernTemplate1({ resume }) {
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
    <div className="modern-template-1" style={{
      background: "#fffafb",
      color: "#18181b",
      fontFamily: "'Playfair Display', 'Georgia', serif",
      padding: "40px 48px",
      fontSize: "12.5px",
      lineHeight: 1.5,
      maxWidth: 820,
      margin: "0 auto",
      boxSizing: "border-box",
      border: "1px solid #f5e6e8"
    }}>
      {/* Top Header Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        border: "1px solid #71717a",
        marginBottom: 24,
        background: "#ffffff"
      }}>
        {/* Left Name Area with soft blush aura */}
        <div style={{
          padding: "32px 24px",
          textAlign: "center",
          borderRight: "1px solid #71717a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: "radial-gradient(circle, rgba(253, 226, 230, 0.6) 0%, rgba(255, 255, 255, 0) 70%)"
        }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: 400,
            lineHeight: 1.1,
            margin: "0 0 10px 0",
            color: "#0f172a",
            letterSpacing: "-0.5px"
          }}>
            {personalInfo.name || "Olivia Wilson"}
          </h1>
          <div style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#3f3f46",
            fontFamily: "'Inter', sans-serif"
          }}>
            {targetRole || personalInfo.title || "WEB DESIGNER"}
          </div>
        </div>

        {/* Right Contact Table */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {personalInfo.phone && (
            <div style={{
              padding: "10px 16px",
              borderBottom: "1px solid #71717a",
              fontSize: "12px"
            }}>
              <strong>Phone:</strong> {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div style={{
              padding: "10px 16px",
              borderBottom: "1px solid #71717a",
              fontSize: "12px",
              wordBreak: "break-all"
            }}>
              <strong>Email:</strong> {personalInfo.email}
            </div>
          )}
          {personalInfo.location && (
            <div style={{
              padding: "10px 16px",
              borderBottom: (personalInfo.linkedin || personalInfo.github) ? "1px solid #71717a" : "none",
              fontSize: "12px"
            }}>
              <strong>Address:</strong> {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{
              padding: "10px 16px",
              fontSize: "12px",
              wordBreak: "break-all"
            }}>
              <strong>LinkedIn:</strong>{" "}
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "#0f172a", textDecoration: "none" }}>
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div style={{
              padding: "10px 16px",
              borderTop: "1px solid #71717a",
              fontSize: "12px",
              wordBreak: "break-all"
            }}>
              <strong>GitHub:</strong>{" "}
              <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: "#0f172a", textDecoration: "none" }}>
                {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Content Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        border: "1px solid #71717a",
        background: "#ffffff"
      }}>
        {/* Left Column: Experience & Education */}
        <div style={{ borderRight: "1px solid #71717a" }}>
          {/* Experience Header */}
          <div style={{
            background: "#fff1f3",
            padding: "10px 18px",
            borderBottom: "1px solid #71717a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "15px",
            color: "#18181b"
          }}>
            <span>Experience</span>
            <span style={{ color: "#f43f5e", fontSize: "16px" }}>✦</span>
          </div>

          <div style={{ padding: "18px 20px" }}>
            {experience && experience.length > 0 ? (
              experience.map((exp, idx) => {
                const bullets = Array.isArray(exp.bullets)
                  ? exp.bullets
                  : typeof exp.description === "string"
                  ? exp.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                  : [];

                return (
                  <div key={idx} style={{ marginBottom: idx < experience.length - 1 ? 18 : 8 }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#0f172a",
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {exp.duration || "AUG 2020 - CURRENT"}
                    </div>
                    <div style={{
                      fontSize: "13px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginTop: 2,
                      color: "#18181b"
                    }}>
                      {exp.title}
                    </div>
                    {(exp.company || exp.location) && (
                      <div style={{ fontSize: "12px", color: "#52525b", fontStyle: "italic", marginBottom: 6 }}>
                        {exp.company}{exp.location ? `, ${exp.location}` : ""}
                      </div>
                    )}
                    {bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "11.5px", lineHeight: 1.45, listStyleType: "none" }}>
                        {bullets.map((b, bIdx) => (
                          <li key={bIdx} style={{ position: "relative", marginBottom: 4, paddingLeft: 8 }}>
                            <span style={{ position: "absolute", left: -8, color: "#f43f5e" }}>•</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={{ fontSize: "12px", color: "#a1a1aa" }}>No experience listed</div>
            )}
          </div>

          {/* Education Header */}
          <div style={{
            background: "#fff1f3",
            padding: "10px 18px",
            borderTop: "1px solid #71717a",
            borderBottom: "1px solid #71717a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "15px",
            color: "#18181b"
          }}>
            <span>Education</span>
            <span style={{ color: "#f43f5e", fontSize: "16px" }}>✦</span>
          </div>

          <div style={{ padding: "18px 20px" }}>
            {education && education.length > 0 ? (
              education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: idx < education.length - 1 ? 14 : 0 }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#0f172a",
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {edu.year || edu.duration || "JUL 2012 - JUL 2016"}
                  </div>
                  <div style={{
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginTop: 2,
                    color: "#18181b"
                  }}>
                    {edu.degree || "DEGREE"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#52525b", fontStyle: "italic" }}>
                    {edu.institution || edu.school}{edu.location ? `, ${edu.location}` : ""}
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>

        {/* Right Column: Summary, Skills, Projects */}
        <div>
          {/* Summary Header */}
          <div style={{
            background: "#fff1f3",
            padding: "10px 18px",
            borderBottom: "1px solid #71717a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "15px",
            color: "#18181b"
          }}>
            <span>Summary</span>
            <span style={{ color: "#f43f5e", fontSize: "16px" }}>✦</span>
          </div>

          <div style={{ padding: "18px 20px" }}>
            {summary ? (
              <div style={{ fontSize: "12px", lineHeight: 1.5, color: "#27272a", textAlign: "justify" }}>
                {summary}
              </div>
            ) : (
              <div style={{ fontSize: "12px", color: "#a1a1aa" }}>No summary provided</div>
            )}
          </div>

          {/* Skills Header */}
          <div style={{
            background: "#fff1f3",
            padding: "10px 18px",
            borderTop: "1px solid #71717a",
            borderBottom: "1px solid #71717a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "15px",
            color: "#18181b"
          }}>
            <span>Skills</span>
            <span style={{ color: "#f43f5e", fontSize: "16px" }}>✦</span>
          </div>

          <div style={{ padding: "18px 20px" }}>
            {skillItems.length > 0 ? (
              <div style={{ display: "grid", gap: "6px" }}>
                {skillItems.map((skill, idx) => (
                  <div key={idx} style={{ fontSize: "12px", color: "#27272a" }}>
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: "12px", color: "#a1a1aa" }}>No skills listed</div>
            )}
          </div>

          {/* Projects (if provided) */}
          {projects && projects.length > 0 && (
            <>
              <div style={{
                background: "#fff1f3",
                padding: "10px 18px",
                borderTop: "1px solid #71717a",
                borderBottom: "1px solid #71717a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "15px",
                color: "#18181b"
              }}>
                <span>Projects</span>
                <span style={{ color: "#f43f5e", fontSize: "16px" }}>✦</span>
              </div>
              <div style={{ padding: "18px 20px" }}>
                {projects.map((proj, idx) => (
                  <div key={idx} style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: "12.5px" }}>{proj.title}</div>
                    {proj.techStack && (
                      <div style={{ fontSize: "11px", color: "#e11d48", fontStyle: "italic" }}>
                        {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                      </div>
                    )}
                    {proj.description && (
                      <div style={{ fontSize: "11.5px", color: "#3f3f46", marginTop: 2 }}>
                        {proj.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Certifications (if provided) */}
          {certifications && certifications.length > 0 && (
            <>
              <div style={{
                background: "#fff1f3",
                padding: "10px 18px",
                borderTop: "1px solid #71717a",
                borderBottom: "1px solid #71717a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "15px",
                color: "#18181b"
              }}>
                <span>Certifications</span>
                <span style={{ color: "#f43f5e", fontSize: "16px" }}>✦</span>
              </div>
              <div style={{ padding: "18px 20px", fontSize: "12px" }}>
                {certifications.map((c, idx) => (
                  <div key={idx} style={{ marginBottom: 4 }}>
                    • {typeof c === "string" ? c : c.name || c.title}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Languages (if provided) */}
          {languageItems.length > 0 && (
            <>
              <div style={{
                background: "#fff1f3",
                padding: "10px 18px",
                borderTop: "1px solid #71717a",
                borderBottom: "1px solid #71717a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "15px",
                color: "#18181b"
              }}>
                <span>Languages</span>
                <span style={{ color: "#f43f5e", fontSize: "16px" }}>✦</span>
              </div>
              <div style={{ padding: "18px 20px", fontSize: "12px" }}>
                {languageItems.map((lang, idx) => (
                  <div key={idx} style={{ marginBottom: 4 }}>
                    • {lang}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
