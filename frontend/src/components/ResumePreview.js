import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumePreview({ resume, onBack }) {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${resume?.personalInfo?.name || "Resume"} - Resume`,
  });

  if (!resume) return null;

  const { personalInfo, summary, experience, education, skills, targetRole } = resume;

  return (
    <div>
      {/* Action Bar */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 24,
        alignItems: "center", flexWrap: "wrap"
      }}>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Edit Resume
        </button>
        <button className="btn btn-primary" onClick={handlePrint}
          style={{ marginLeft: "auto" }}>
          🖨️ Download / Print PDF
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{
          background: "#dcfce7", color: "#16a34a", padding: "6px 16px",
          borderRadius: 99, fontSize: 14, fontWeight: 500
        }}>
          ✅ Resume generated for: {targetRole}
        </span>
      </div>

      {/* Printable Resume */}
      <div ref={printRef}>
        <style>{`
          @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
          }
        `}</style>

        <div style={{
          background: "white", maxWidth: 820, margin: "0 auto",
          padding: "48px 52px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
          borderRadius: 8, fontFamily: "'Inter', Arial, sans-serif",
          fontSize: 14, lineHeight: 1.6, color: "#1e293b",
        }}>

          {/* Header */}
          <div style={{ borderBottom: "2px solid #6366f1", paddingBottom: 20, marginBottom: 24 }}>
            <h1 style={{ fontSize: 30, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
              {personalInfo?.name}
            </h1>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#6366f1", marginBottom: 10 }}>
              {targetRole}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: 13, color: "#475569" }}>
              {personalInfo?.email && <span>✉️ {personalInfo.email}</span>}
              {personalInfo?.phone && <span>📞 {personalInfo.phone}</span>}
              {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
              {personalInfo?.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
              {personalInfo?.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
            </div>
          </div>

          {/* Summary */}
          {summary && (
            <Section title="Professional Summary">
              <p style={{ color: "#374151", lineHeight: 1.7 }}>{summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <Section title="Work Experience">
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{exp.title}</div>
                      <div style={{ fontWeight: 600, color: "#6366f1", fontSize: 14 }}>{exp.company}</div>
                    </div>
                    <div style={{ color: "#64748b", fontSize: 13, fontStyle: "italic", whiteSpace: "nowrap" }}>
                      {exp.duration}
                    </div>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul style={{ marginTop: 8, paddingLeft: 20, color: "#374151" }}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={{ marginBottom: 4 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <Section title="Education">
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{edu.degree}</div>
                      <div style={{ color: "#6366f1", fontWeight: 600 }}>{edu.institution}</div>
                      {edu.details && <div style={{ color: "#64748b", fontSize: 13 }}>{edu.details}</div>}
                    </div>
                    <div style={{ color: "#64748b", fontSize: 13, fontStyle: "italic" }}>{edu.year}</div>
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Skills */}
          {skills && (
            <Section title="Skills">
              <div style={{ display: "grid", gap: 10 }}>
                {Object.entries(skills).map(([category, list]) =>
                  list?.length > 0 ? (
                    <div key={category} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{
                        fontWeight: 700, fontSize: 13, color: "#374151",
                        minWidth: 100, paddingTop: 3
                      }}>
                        {category}:
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {list.map((skill, i) => (
                          <span key={i} style={{
                            background: "#ede9fe", color: "#6d28d9",
                            padding: "2px 10px", borderRadius: 99,
                            fontSize: 13, fontWeight: 500
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{
        fontSize: 16, fontWeight: 700, color: "#0f172a",
        textTransform: "uppercase", letterSpacing: "0.08em",
        borderBottom: "1.5px solid #e5e7eb",
        paddingBottom: 6, marginBottom: 14
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
