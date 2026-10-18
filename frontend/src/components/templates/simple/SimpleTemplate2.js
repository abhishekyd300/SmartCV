import React from "react";

/**
 * SimpleTemplate2 - Based on "Samantha Williams" reference
 * - Centered elegant serif header
 * - Labeled contact details (Address, Email address, Phone number, LinkedIn, GitHub)
 * - Subtle dashed line separator below header
 * - Single-column layout with clean ATS-friendly typography
 * - Two-column bulleted skills layout matching reference image
 */
export default function SimpleTemplate2({ resume }) {
  if (!resume) return null;

  const {
    personalInfo = {},
    summary = "",
    education = [],
    skills = {},
    projects = [],
    experience = [],
    certifications = [],
    achievements = [],
  } = resume;

  // Extract skills into flat list
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

  // Split skills into two columns like the reference image
  const half = Math.ceil(skillItems.length / 2);
  const col1 = skillItems.slice(0, half);
  const col2 = skillItems.slice(half);

  // Build contact lines with labels
  const contactPartsTop = [];
  if (personalInfo.location) {
    contactPartsTop.push(
      <span key="addr"><strong>Address:</strong> {personalInfo.location}</span>
    );
  }
  if (personalInfo.email) {
    contactPartsTop.push(
      <span key="email"><strong>Email address:</strong> {personalInfo.email}</span>
    );
  }

  const contactPartsBottom = [];
  if (personalInfo.phone) {
    contactPartsBottom.push(
      <span key="phone"><strong>Phone number:</strong> {personalInfo.phone}</span>
    );
  }
  if (personalInfo.linkedin) {
    contactPartsBottom.push(
      <span key="li">
        <strong>LinkedIn:</strong>{" "}
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "none" }}>
          {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
        </a>
      </span>
    );
  }
  if (personalInfo.github) {
    contactPartsBottom.push(
      <span key="gh">
        <strong>GitHub:</strong>{" "}
        <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "none" }}>
          {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
        </a>
      </span>
    );
  }

  return (
    <div className="simple-template-2" style={{
      background: "#ffffff",
      color: "#000000",
      fontFamily: "'Times New Roman', Times, Georgia, serif",
      padding: "44px 52px",
      fontSize: "13px",
      lineHeight: 1.45,
      maxWidth: 820,
      margin: "0 auto",
      boxSizing: "border-box"
    }}>
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: 400,
          fontFamily: "'Times New Roman', Times, Georgia, serif",
          margin: "0 0 10px 0",
          color: "#000000",
          letterSpacing: "0.2px"
        }}>
          {personalInfo.name || "Samantha Williams"}
        </h1>

        {/* Contact Line 1 */}
        {contactPartsTop.length > 0 && (
          <div style={{ fontSize: "12.5px", color: "#111111", marginBottom: 4 }}>
            {contactPartsTop.map((item, idx) => (
              <React.Fragment key={idx}>
                {item}
                {idx < contactPartsTop.length - 1 && <span style={{ margin: "0 8px", color: "#666" }}>·</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Contact Line 2 */}
        {contactPartsBottom.length > 0 && (
          <div style={{ fontSize: "12.5px", color: "#111111" }}>
            {contactPartsBottom.map((item, idx) => (
              <React.Fragment key={idx}>
                {item}
                {idx < contactPartsBottom.length - 1 && <span style={{ margin: "0 8px", color: "#666" }}>·</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Dashed Separator */}
      <div style={{
        borderBottom: "1px dashed #cccccc",
        margin: "16px 0 20px 0",
        width: "100%"
      }} />

      {/* SUMMARY */}
      {summary && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginBottom: 6,
            color: "#000000"
          }}>
            SUMMARY
          </div>
          <div style={{
            fontSize: "12.5px",
            lineHeight: 1.45,
            color: "#111111",
            textAlign: "justify",
            paddingLeft: "14px"
          }}>
            {summary}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginBottom: 8,
            color: "#000000"
          }}>
            EXPERIENCE
          </div>

          <div style={{ paddingLeft: "14px" }}>
            {experience.map((exp, idx) => {
              const bullets = Array.isArray(exp.bullets)
                ? exp.bullets
                : typeof exp.description === "string"
                ? exp.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                : [];

              return (
                <div key={idx} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 700, fontSize: "13px", textTransform: "uppercase" }}>
                      {exp.title || "POSITION TITLE"}
                    </span>
                    <span style={{ fontSize: "12.5px", color: "#222" }}>
                      {exp.duration || "Dates"}
                    </span>
                  </div>

                  {(exp.company || exp.location) && (
                    <div style={{ fontSize: "12.5px", color: "#333333", marginTop: 1, marginBottom: 4 }}>
                      {exp.company}{exp.location ? ` - ${exp.location}` : ""}
                    </div>
                  )}

                  {bullets.length > 0 && (
                    <ul style={{ margin: "4px 0 0 0", paddingLeft: "18px", fontSize: "12px", lineHeight: 1.45 }}>
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
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginBottom: 8,
            color: "#000000"
          }}>
            EDUCATION
          </div>

          <div style={{ paddingLeft: "14px" }}>
            {education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span>
                    <strong style={{ fontSize: "13px" }}>
                      {edu.institution || edu.school}{edu.location ? ` - ${edu.location}` : ""}
                    </strong>
                    {edu.degree && <span> | {edu.degree}</span>}
                  </span>
                </div>
                {(edu.year || edu.duration || edu.details) && (
                  <div style={{ fontSize: "12px", color: "#333333", marginTop: 2 }}>
                    {edu.details ? `${edu.details} | ` : ""}{edu.year || edu.duration}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILLS - Two-column bulleted layout matching reference image */}
      {skillItems.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginBottom: 8,
            color: "#000000"
          }}>
            SKILLS
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px 28px",
            paddingLeft: "14px",
            fontSize: "12.5px"
          }}>
            <ul style={{ margin: 0, paddingLeft: "18px", listStyleType: "disc" }}>
              {col1.map((skill, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>{skill}</li>
              ))}
            </ul>
            <ul style={{ margin: 0, paddingLeft: "18px", listStyleType: "disc" }}>
              {col2.map((skill, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* PROJECTS (If present) */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginBottom: 8,
            color: "#000000"
          }}>
            PROJECTS
          </div>

          <div style={{ paddingLeft: "14px" }}>
            {projects.map((proj, idx) => {
              const bullets = Array.isArray(proj.bullets)
                ? proj.bullets
                : typeof proj.description === "string"
                ? proj.description.split("\n").map((b) => b.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
                : [];

              return (
                <div key={idx} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span>
                      <strong style={{ fontSize: "13px", textTransform: "uppercase" }}>{proj.title}</strong>
                      {proj.subtitle && <span> — {proj.subtitle}</span>}
                    </span>
                    <div style={{ fontSize: "11.5px" }}>
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
                    <div style={{ fontSize: "12px", color: "#333333", fontStyle: "italic", marginBottom: 3 }}>
                      Technologies: {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                    </div>
                  )}

                  {bullets.length > 0 && (
                    <ul style={{ margin: "3px 0 0 0", paddingLeft: "18px", fontSize: "12px", lineHeight: 1.45 }}>
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

      {/* CERTIFICATIONS (If present) */}
      {certifications && certifications.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginBottom: 6,
            color: "#000000"
          }}>
            CERTIFICATIONS
          </div>
          <ul style={{ margin: 0, paddingLeft: "32px", fontSize: "12px", lineHeight: 1.45 }}>
            {certifications.map((c, i) => (
              <li key={i} style={{ marginBottom: 3 }}>
                {typeof c === "string" ? c : c.name || c.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ACHIEVEMENTS (If present) */}
      {achievements && achievements.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginBottom: 6,
            color: "#000000"
          }}>
            ACHIEVEMENTS
          </div>
          <ul style={{ margin: 0, paddingLeft: "32px", fontSize: "12px", lineHeight: 1.45 }}>
            {achievements.map((a, i) => (
              <li key={i} style={{ marginBottom: 3 }}>
                {typeof a === "string" ? a : a.description || a.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
