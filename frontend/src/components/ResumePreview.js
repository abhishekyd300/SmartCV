import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumePreview({ resume, onBack }) {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${resume?.personalInfo?.name || "Resume"} - Resume`,
  });

  if (!resume) return null;

  const {
    personalInfo = {},
    summary = "",
    education = [],
    skills = {},
    projects = [],
    experience = [],
    certifications = [],
    achievements = []
  } = resume;

  // Build header contacts array separated by pipe
  const contacts = [];
  if (personalInfo.email) contacts.push(personalInfo.email);
  if (personalInfo.phone) contacts.push(personalInfo.phone);
  if (personalInfo.linkedin) contacts.push(personalInfo.linkedin);
  if (personalInfo.github) contacts.push(personalInfo.github);
  if (personalInfo.leetcode) contacts.push(personalInfo.leetcode);
  if (personalInfo.portfolio) contacts.push(personalInfo.portfolio);

  return (
    <div>
      {/* Action Bar */}
      <div className="no-print" style={{
        display: "flex", gap: 12, marginBottom: 24,
        alignItems: "center", flexWrap: "wrap"
      }}>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Edit Resume
        </button>
        <button className="btn btn-primary" onClick={handlePrint} style={{ marginLeft: "auto" }}>
          🖨️ Download / Print PDF
        </button>
      </div>

      {/* Printable Resume Canvas */}
      <div ref={printRef}>
        <style>{`
          @media print {
            body { margin: 0; padding: 0; background: white; }
            .no-print { display: none !important; }
            .resume-container {
              box-shadow: none !important;
              padding: 32px 40px !important;
              max-width: 100% !important;
              border: none !important;
            }
          }
          .resume-container {
            background: white;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 48px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            border-radius: 4px;
            font-family: 'Bookman Old Style', 'Bookman', Georgia, serif;
            color: #000;
            line-height: 1.35;
            font-size: 13.5px;
          }
          .resume-header {
            text-align: center;
            margin-bottom: 16px;
          }
          .resume-name {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            margin-bottom: 4px;
            color: #000;
          }
          .resume-contact {
            font-size: 12.5px;
            color: #111;
          }
          .resume-section {
            margin-bottom: 14px;
          }
          .section-heading {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 13.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #111;
            padding-bottom: 1px;
            margin-bottom: 6px;
            color: #000;
          }
          .bullet-list {
            margin: 3px 0 0 0;
            padding-left: 18px;
          }
          .bullet-list li {
            margin-bottom: 3px;
            line-height: 1.35;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .item-title {
            font-weight: 700;
          }
          .item-subtitle {
            font-style: italic;
            color: #333;
          }
          .item-date {
            font-weight: 400;
            white-space: nowrap;
          }
        `}</style>

        <div className="resume-container">
          {/* Header */}
          <div className="resume-header">
            <div className="resume-name">{personalInfo.name || "YOUR NAME"}</div>
            {contacts.length > 0 && (
              <div className="resume-contact">
                {contacts.join("  |  ")}
              </div>
            )}
          </div>

          {/* SUMMARY */}
          {summary && (
            <div className="resume-section">
              <div className="section-heading">SUMMARY</div>
              <div style={{ textAlign: "justify" }}>{summary}</div>
            </div>
          )}

          {/* EDUCATION */}
          {education?.length > 0 && (
            <div className="resume-section">
              <div className="section-heading">EDUCATION</div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: i < education.length - 1 ? 6 : 0 }}>
                  <div className="item-row">
                    <span className="item-title">{edu.institution || edu.school}{edu.location ? `, ${edu.location}` : ""}</span>
                    <span className="item-date">{edu.duration || edu.year}</span>
                  </div>
                  {edu.degree && <div>{edu.degree}</div>}
                  {edu.details && <div>{edu.details}</div>}
                </div>
              ))}
            </div>
          )}

          {/* TECHNICAL SKILLS */}
          {skills && Object.keys(skills).length > 0 && (
            <div className="resume-section">
              <div className="section-heading">TECHNICAL SKILLS</div>
              <div>
                {Object.entries(skills).map(([category, list]) => {
                  const skillsStr = Array.isArray(list) ? list.join(", ") : list;
                  if (!skillsStr) return null;
                  return (
                    <div key={category} style={{ marginBottom: 2 }}>
                      <strong style={{ fontWeight: 700 }}>{category}:</strong> {skillsStr}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {projects?.length > 0 && (
            <div className="resume-section">
              <div className="section-heading">PROJECTS</div>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div className="item-row">
                    <span>
                      <strong className="item-title">{proj.title}</strong>
                      {proj.subtitle && <span> — {proj.subtitle}</span>}
                      {proj.links?.github && <span> | <a href={proj.links.github} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "none" }}>GitHub</a></span>}
                      {proj.links?.live && <span> | <a href={proj.links.live} target="_blank" rel="noreferrer" style={{ color: "#000", textDecoration: "none" }}>Live Demo</a></span>}
                    </span>
                  </div>
                  {proj.techStack && (
                    <div className="item-subtitle">
                      {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                    </div>
                  )}
                  {proj.bullets?.length > 0 && (
                    <ul className="bullet-list">
                      {proj.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* WORK EXPERIENCE (if any) */}
          {experience?.length > 0 && (
            <div className="resume-section">
              <div className="section-heading">EXPERIENCE</div>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div className="item-row">
                    <span className="item-title">{exp.title} — {exp.company}</span>
                    <span className="item-date">{exp.duration}</span>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul className="bullet-list">
                      {exp.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications?.length > 0 && (
            <div className="resume-section">
              <div className="section-heading">CERTIFICATIONS</div>
              <ul className="bullet-list">
                {certifications.map((cert, i) => {
                  const certText = typeof cert === "string" ? cert : `${cert.name}${cert.issuer ? ` — ${cert.issuer}` : ""}`;
                  return <li key={i}>{certText}</li>;
                })}
              </ul>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {achievements?.length > 0 && (
            <div className="resume-section">
              <div className="section-heading">ACHIEVEMENTS</div>
              <ul className="bullet-list">
                {achievements.map((ach, i) => (
                  <li key={i}>{typeof ach === "string" ? ach : ach.description}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
