import React from "react";

/**
 * PhotoTemplate2 - Samantha Williams Reference Style
 * - Top Banner: Soft warm beige/ivory header containing a square headshot,
 *   elegant serif name, title, and contact details
 * - Body: White background split into two columns with a vertical divider
 * - Left column (~33%): Underlined uppercase serif headers (SUMMARY, SKILLS, LANGUAGES)
 * - Right column (~67%): Underlined uppercase serif headers (EXPERIENCE, EDUCATION, PROJECTS)
 *   with italic job titles and italic dates aligned right.
 */
export default function PhotoTemplate2({ resume }) {
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
  let langItems = [];
  if (Array.isArray(languages)) {
    langItems = languages.filter(Boolean);
  } else if (typeof languages === "string") {
    langItems = languages.split(/[,;\n]/).map((l) => l.trim()).filter(Boolean);
  }

  const roleTitle = targetRole || personalInfo.title || "Senior Analyst";
  const photo = personalInfo.photoUrl || personalInfo.photo || "";

  return (
    <div
      className="photo-template-2"
      style={{
        background: "#ffffff",
        color: "#1c1917",
        fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif",
        maxWidth: 840,
        margin: "0 auto",
        minHeight: 1080,
        boxSizing: "border-box",
      }}
    >
      {/* ─── TOP HEADER BANNER (Warm Beige / Ivory) ─────────────── */}
      <div
        style={{
          background: "#ece4dc",
          padding: "32px 36px",
          display: "flex",
          alignItems: "flex-start",
          gap: 28,
          boxSizing: "border-box",
        }}
      >
        {/* Square Headshot */}
        <div style={{ flexShrink: 0 }}>
          {photo ? (
            <img
              src={photo}
              alt={personalInfo.name || "Profile"}
              style={{
                width: 120,
                height: 125,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                display: "block",
                background: "#d6ccc2",
              }}
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 125,
                borderRadius: 3,
                background: "#dfd6cd",
                border: "1px dashed #b7aba0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b5e52",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span style={{ fontSize: 9.5, marginTop: 4, fontStyle: "italic" }}>Photo</span>
            </div>
          )}
        </div>

        {/* Name, Role & Contact */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 400,
              letterSpacing: "0.2px",
              color: "#111827",
              margin: "0 0 4px 0",
              fontFamily: "'Georgia', serif",
            }}
          >
            {personalInfo.name || "Samantha Williams"}
          </h1>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: 12,
              fontFamily: "'Georgia', serif",
            }}
          >
            {roleTitle}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              fontSize: "12px",
              color: "#292524",
              lineHeight: 1.45,
            }}
          >
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.linkedin && (
              <div style={{ fontSize: "11px", color: "#44403c" }}>
                {personalInfo.linkedin.replace(/^https?:\/\//, "")}
              </div>
            )}
            {personalInfo.portfolio && (
              <div style={{ fontSize: "11px", color: "#44403c" }}>
                {personalInfo.portfolio.replace(/^https?:\/\//, "")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── TWO-COLUMN BODY ────────────────────────────────────── */}
      <div
        style={{
          padding: "32px 36px",
          display: "flex",
          gap: 28,
          boxSizing: "border-box",
        }}
      >
        {/* ─── LEFT COLUMN (~33%) ──────────────────────────────── */}
        <div style={{ width: "34%", flexShrink: 0 }}>
          {/* SUMMARY */}
          {summary && (
            <div style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  margin: "0 0 12px 0",
                }}
              >
                Summary
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "11.5px",
                  lineHeight: 1.6,
                  color: "#262626",
                  textAlign: "justify",
                }}
              >
                {summary}
              </p>
            </div>
          )}

          {/* SKILLS */}
          {skillItems.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  margin: "0 0 12px 0",
                }}
              >
                Skills
              </h2>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 16,
                  fontSize: "11.5px",
                  lineHeight: 1.65,
                  color: "#262626",
                }}
              >
                {skillItems.map((skill, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* LANGUAGES */}
          {langItems.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  margin: "0 0 10px 0",
                }}
              >
                Languages
              </h2>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 16,
                  fontSize: "11.5px",
                  lineHeight: 1.65,
                  color: "#262626",
                }}
              >
                {langItems.map((lang, idx) => (
                  <li key={idx} style={{ marginBottom: 3 }}>
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  margin: "0 0 10px 0",
                }}
              >
                Certifications
              </h2>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 16,
                  fontSize: "11px",
                  lineHeight: 1.6,
                  color: "#262626",
                }}
              >
                {certifications.map((c, idx) => (
                  <li key={idx} style={{ marginBottom: 3 }}>
                    {typeof c === "string" ? c : c.name || c.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ─── VERTICAL DIVIDER ─────────────────────────────────── */}
        <div style={{ width: 1, background: "#e5e7eb", flexShrink: 0 }} />

        {/* ─── RIGHT COLUMN (~66%) ─────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  margin: "0 0 14px 0",
                }}
              >
                Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    {/* Header: Title in Italic Bold + Date in Italic */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 2,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12.5px",
                          fontWeight: 700,
                          fontStyle: "italic",
                          color: "#171717",
                        }}
                      >
                        {exp.title}
                      </div>
                      {(exp.duration || exp.dates) && (
                        <div
                          style={{
                            fontSize: "11px",
                            fontStyle: "italic",
                            color: "#171717",
                            fontWeight: 600,
                            flexShrink: 0,
                            marginLeft: 8,
                          }}
                        >
                          {exp.duration || exp.dates}
                        </div>
                      )}
                    </div>

                    {/* Company & Location */}
                    {(exp.company || exp.location) && (
                      <div style={{ fontSize: "11.5px", color: "#374151", marginBottom: 6 }}>
                        {exp.company}
                        {exp.company && exp.location && " - "}
                        {exp.location}
                      </div>
                    )}

                    {/* Bullets */}
                    {Array.isArray(exp.bullets) && exp.bullets.length > 0 ? (
                      <ul
                        style={{
                          margin: "4px 0 0 0",
                          paddingLeft: 16,
                          fontSize: "11px",
                          lineHeight: 1.6,
                          color: "#262626",
                        }}
                      >
                        {exp.bullets.map((b, bIdx) => (
                          <li key={bIdx} style={{ marginBottom: 4 }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : exp.description ? (
                      <p
                        style={{
                          margin: "4px 0 0 0",
                          fontSize: "11px",
                          lineHeight: 1.6,
                          color: "#262626",
                        }}
                      >
                        {exp.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <div style={{ marginBottom: 26 }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  margin: "0 0 12px 0",
                }}
              >
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 2,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12.5px",
                          fontWeight: 700,
                          fontStyle: "italic",
                          color: "#171717",
                        }}
                      >
                        {edu.institution || "University"}
                      </div>
                      {edu.year && (
                        <div
                          style={{
                            fontSize: "11px",
                            fontStyle: "italic",
                            color: "#171717",
                            fontWeight: 600,
                            flexShrink: 0,
                            marginLeft: 8,
                          }}
                        >
                          {edu.year}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: "11px", color: "#374151" }}>
                      {edu.location && <span>{edu.location} | </span>}
                      <span>{edu.degree || edu.degreeTitle}</span>
                      {edu.details && <span>, {edu.details}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#000000",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  margin: "0 0 12px 0",
                }}
              >
                Projects
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        fontStyle: "italic",
                        color: "#171717",
                      }}
                    >
                      {proj.title}
                      {proj.subtitle && (
                        <span style={{ fontWeight: 400, fontStyle: "normal", color: "#52525b" }}>
                          {" "}
                          — {proj.subtitle}
                        </span>
                      )}
                    </div>
                    {proj.techStack && (
                      <div style={{ fontSize: "10px", color: "#64748b", margin: "2px 0 4px" }}>
                        Tech Stack: {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                      </div>
                    )}
                    {Array.isArray(proj.bullets) && proj.bullets.length > 0 ? (
                      <ul
                        style={{
                          margin: "3px 0 0 0",
                          paddingLeft: 16,
                          fontSize: "11px",
                          lineHeight: 1.55,
                          color: "#262626",
                        }}
                      >
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} style={{ marginBottom: 2 }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : proj.description ? (
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          fontSize: "11px",
                          lineHeight: 1.55,
                          color: "#262626",
                        }}
                      >
                        {proj.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
