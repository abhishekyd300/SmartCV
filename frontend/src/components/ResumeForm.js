import React, { useState } from "react";
import axios from "axios";

const defaultForm = {
  personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", github: "", leetcode: "", portfolio: "" },
  targetRole: "",
  jobDescription: "",
  projects: [{ title: "", subtitle: "", techStack: "", github: "", live: "", description: "" }],
  experience: [],
  education: [{ degree: "", institution: "", year: "", details: "" }],
  skills: "",
  certifications: "",
  achievements: "",
};

export default function ResumeForm({ onGenerated, initialData, selectedTemplate, onChangeTemplate }) {
  const [form, setForm] = useState(() => {
    if (!initialData) return defaultForm;

    // Convert skills object to formatted string if needed
    let formattedSkills = initialData.skills || "";
    if (typeof initialData.skills === "object" && initialData.skills !== null) {
      formattedSkills = Object.entries(initialData.skills)
        .map(([cat, list]) => `${cat}: ${Array.isArray(list) ? list.join(", ") : list}`)
        .join("\n");
    }

    // Convert projects if array of objects from generated resume
    let formattedProjects = initialData.projects || [];
    if (formattedProjects.length > 0 && Array.isArray(formattedProjects[0]?.bullets)) {
      formattedProjects = formattedProjects.map((p) => ({
        title: p.title || "",
        subtitle: p.subtitle || "",
        techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack || "",
        github: p.links?.github || p.github || "",
        live: p.links?.live || p.live || "",
        description: Array.isArray(p.bullets) ? p.bullets.map(b => `• ${b}`).join("\n") : p.description || ""
      }));
    }

    // Convert experience if array of objects from generated resume
    let formattedExp = initialData.experience || [];
    if (formattedExp.length > 0 && Array.isArray(formattedExp[0]?.bullets)) {
      formattedExp = formattedExp.map((e) => ({
        title: e.title || "",
        company: e.company || "",
        duration: e.duration || "",
        description: Array.isArray(e.bullets) ? e.bullets.map(b => `• ${b}`).join("\n") : e.description || ""
      }));
    }

    // Convert certifications and achievements arrays to string
    let formattedCerts = initialData.certifications || "";
    if (Array.isArray(formattedCerts)) {
      formattedCerts = formattedCerts.map(c => typeof c === "string" ? `• ${c}` : `• ${c.name}`).join("\n");
    }

    let formattedAch = initialData.achievements || "";
    if (Array.isArray(formattedAch)) {
      formattedAch = formattedAch.map(a => typeof a === "string" ? `• ${a}` : `• ${a.description}`).join("\n");
    }

    return {
      personalInfo: {
        name: initialData.personalInfo?.name || "",
        email: initialData.personalInfo?.email || "",
        phone: initialData.personalInfo?.phone || "",
        location: initialData.personalInfo?.location || "",
        linkedin: initialData.personalInfo?.linkedin || "",
        github: initialData.personalInfo?.github || "",
        leetcode: initialData.personalInfo?.leetcode || "",
        portfolio: initialData.personalInfo?.portfolio || "",
      },
      targetRole: initialData.targetRole || "",
      jobDescription: initialData.jobDescription || "",
      projects: formattedProjects.length > 0 ? formattedProjects : [{ title: "", subtitle: "", techStack: "", github: "", live: "", description: "" }],
      experience: formattedExp,
      education: initialData.education?.length > 0 ? initialData.education : [{ degree: "", institution: "", year: "", details: "" }],
      skills: formattedSkills,
      certifications: formattedCerts,
      achievements: formattedAch,
    };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updatePersonal = (field, val) =>
    setForm((f) => ({ ...f, personalInfo: { ...f.personalInfo, [field]: val } }));

  // Projects handlers
  const updateProj = (i, field, val) =>
    setForm((f) => {
      const projects = [...f.projects];
      projects[i] = { ...projects[i], [field]: val };
      return { ...f, projects };
    });

  const addProj = () =>
    setForm((f) => ({
      ...f,
      projects: [...f.projects, { title: "", subtitle: "", techStack: "", github: "", live: "", description: "" }]
    }));

  const removeProj = (i) =>
    setForm((f) => ({ ...f, projects: f.projects.filter((_, idx) => idx !== i) }));

  // Experience handlers
  const updateExp = (i, field, val) =>
    setForm((f) => {
      const experience = [...f.experience];
      experience[i] = { ...experience[i], [field]: val };
      return { ...f, experience };
    });

  const addExp = () =>
    setForm((f) => ({ ...f, experience: [...f.experience, { title: "", company: "", duration: "", description: "" }] }));

  const removeExp = (i) =>
    setForm((f) => ({ ...f, experience: f.experience.filter((_, idx) => idx !== i) }));

  // Education handlers
  const updateEdu = (i, field, val) =>
    setForm((f) => {
      const education = [...f.education];
      education[i] = { ...education[i], [field]: val };
      return { ...f, education };
    });

  const addEdu = () =>
    setForm((f) => ({ ...f, education: [...f.education, { degree: "", institution: "", year: "", details: "" }] }));

  const removeEdu = (i) =>
    setForm((f) => ({ ...f, education: f.education.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/resume/generate", form);
      onGenerated(res.data.resume);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.details || "Failed to generate resume. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-card-3d">
            <div className="spinner-3d" />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
              Crafting your resume...
            </div>
            <div style={{ fontSize: 14, color: "#94a3b8" }}>AI is formatting your ATS-optimized resume</div>
          </div>
        </div>
      )}

      {/* Template Status Bar */}
      <div style={{ maxWidth: 900, margin: "0 auto 20px" }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 14,
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>Step 2 of 3: Details & Content</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <span style={{ fontSize: 13, color: "#cbd5e1" }}>
              Template: <strong style={{ color: "#a855f7" }}>{selectedTemplate === "simple_2" ? "Clean Centered Serif" : "Classic Timeline"}</strong>
            </span>
          </div>

          {onChangeTemplate && (
            <button
              type="button"
              onClick={onChangeTemplate}
              className="btn-3d-secondary"
              style={{ padding: "6px 14px", fontSize: 12, border: "none" }}
            >
              🎨 Change Template
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 28 }}>

          {/* Target Role */}
          <div className="glass-card-3d">
            <div className="form-section-title">🎯 Target Role</div>
            {error && <div className="error-msg">⚠️ {error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label>Job Title You're Applying For *</label>
                <input
                  placeholder="e.g. Full Stack Developer / Software Engineer"
                  value={form.targetRole}
                  onChange={(e) => setForm((f) => ({ ...f, targetRole: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Job Description (optional — for better tailoring)</label>
              <textarea
                placeholder="Paste the job description here to tailor your resume..."
                value={form.jobDescription}
                onChange={(e) => setForm((f) => ({ ...f, jobDescription: e.target.value }))}
                style={{ minHeight: 90 }}
              />
            </div>
          </div>

          {/* Personal Info */}
          <div className="glass-card-3d">
            <div className="form-section-title">👤 Personal Information</div>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input placeholder="e.g. Jane Doe" value={form.personalInfo.name}
                  onChange={(e) => updatePersonal("name", e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" placeholder="e.g. jane@example.com" value={form.personalInfo.email}
                  onChange={(e) => updatePersonal("email", e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input placeholder="e.g. +1 (555) 000-0000" value={form.personalInfo.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input placeholder="e.g. San Francisco, CA" value={form.personalInfo.location}
                  onChange={(e) => updatePersonal("location", e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input placeholder="e.g. linkedin.com/in/janedoe" value={form.personalInfo.linkedin}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)} />
              </div>
              <div className="form-group">
                <label>GitHub Profile</label>
                <input placeholder="e.g. github.com/janedoe" value={form.personalInfo.github}
                  onChange={(e) => updatePersonal("github", e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>LeetCode Profile</label>
                <input placeholder="e.g. leetcode.com/janedoe" value={form.personalInfo.leetcode}
                  onChange={(e) => updatePersonal("leetcode", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Portfolio / Website</label>
                <input placeholder="e.g. janedoe.dev" value={form.personalInfo.portfolio}
                  onChange={(e) => updatePersonal("portfolio", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="glass-card-3d">
            <div className="form-section-title">
              🎓 Education *
              <span style={{ fontSize: 12, background: "rgba(168,85,247,0.2)", color: "#c084fc", padding: "2px 10px", borderRadius: 99 }}>{form.education.length}</span>
            </div>
            {form.education.map((edu, i) => (
              <div key={i} style={{
                padding: 20, background: "#f8fafc", borderRadius: 16,
                border: "1px solid #e2e8f0", marginBottom: 18
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#a855f7" }}>Education {i + 1}</span>
                  {form.education.length > 1 && (
                    <button type="button" className="btn-3d-secondary" style={{ padding: "4px 12px", fontSize: 12, background: "rgba(239,68,68,0.2)", borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5" }}
                      onClick={() => removeEdu(i)}>Remove</button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Institution / University *</label>
                    <input placeholder="e.g. State University" value={edu.institution}
                      onChange={(e) => updateEdu(i, "institution", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Degree / Qualification *</label>
                    <input placeholder="e.g. B.Tech in Computer Science" value={edu.degree}
                      onChange={(e) => updateEdu(i, "degree", e.target.value)} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration / Year</label>
                    <input placeholder="e.g. 2021 – 2025" value={edu.year}
                      onChange={(e) => updateEdu(i, "year", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Details (CGPA, GPA, etc.)</label>
                    <input placeholder="e.g. GPA: 3.8 / 4.0" value={edu.details}
                      onChange={(e) => updateEdu(i, "details", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn-3d-secondary" onClick={addEdu}>
              + Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="glass-card-3d">
            <div className="form-section-title">🛠️ Technical Skills *</div>
            <div className="form-group">
              <label>List Your Skills *</label>
              <textarea
                placeholder=""
                value={form.skills}
                onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
                style={{ minHeight: 120 }}
                required
              />
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 8 }}>
                💡 You can group by category or separate with commas. AI will format into clean categories.
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="glass-card-3d">
            <div className="form-section-title">
              🚀 Projects
              <span style={{ fontSize: 12, background: "rgba(168,85,247,0.2)", color: "#c084fc", padding: "2px 10px", borderRadius: 99 }}>{form.projects.length}</span>
            </div>
            {form.projects.map((proj, i) => (
              <div key={i} style={{
                padding: 20, background: "#f8fafc", borderRadius: 16,
                border: "1px solid #e2e8f0", marginBottom: 18
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#a855f7" }}>
                    Project {i + 1}
                  </span>
                  {form.projects.length > 0 && (
                    <button type="button" className="btn-3d-secondary" style={{ padding: "4px 12px", fontSize: 12, background: "rgba(239,68,68,0.2)", borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5" }}
                      onClick={() => removeProj(i)}>Remove</button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Project Title</label>
                    <input placeholder="e.g. E-Commerce Platform" value={proj.title}
                      onChange={(e) => updateProj(i, "title", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Subtitle / One-liner</label>
                    <input placeholder="e.g. Full-Stack Web Application" value={proj.subtitle}
                      onChange={(e) => updateProj(i, "subtitle", e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tech Stack</label>
                    <input placeholder="e.g. React, Node.js, Express, MongoDB" value={proj.techStack}
                      onChange={(e) => updateProj(i, "techStack", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>GitHub Link (optional)</label>
                    <input placeholder="e.g. https://github.com/user/repo" value={proj.github}
                      onChange={(e) => updateProj(i, "github", e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Project Description / Key Highlights</label>
                  <textarea
                    placeholder="• Built a full-stack e-commerce web application with user authentication..."
                    value={proj.description}
                    onChange={(e) => updateProj(i, "description", e.target.value)}
                    style={{ minHeight: 90 }}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="btn-3d-secondary" onClick={addProj}>
              + Add Project
            </button>
          </div>

          {/* Work Experience (Optional) */}
          <div className="glass-card-3d">
            <div className="form-section-title">
              💼 Work Experience (Optional)
              <span style={{ fontSize: 12, background: "rgba(168,85,247,0.2)", color: "#c084fc", padding: "2px 10px", borderRadius: 99 }}>{form.experience.length}</span>
            </div>
            {form.experience.map((exp, i) => (
              <div key={i} style={{
                padding: 20, background: "#f8fafc", borderRadius: 16,
                border: "1px solid #e2e8f0", marginBottom: 18
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#a855f7" }}>
                    Experience {i + 1}
                  </span>
                  <button type="button" className="btn-3d-secondary" style={{ padding: "4px 12px", fontSize: 12, background: "rgba(239,68,68,0.2)", borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5" }}
                    onClick={() => removeExp(i)}>Remove</button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input placeholder="e.g. Software Engineering Intern" value={exp.title}
                      onChange={(e) => updateExp(i, "title", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input placeholder="e.g. Tech Corp" value={exp.company}
                      onChange={(e) => updateExp(i, "company", e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input placeholder="e.g. Jun 2024 – Aug 2024" value={exp.duration}
                    onChange={(e) => updateExp(i, "duration", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Briefly describe your responsibilities..."
                    value={exp.description}
                    onChange={(e) => updateExp(i, "description", e.target.value)}
                    style={{ minHeight: 80 }}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="btn-3d-secondary" onClick={addExp}>
              + Add Work Experience
            </button>
          </div>

          {/* Certifications (Optional) */}
          <div className="glass-card-3d">
            <div className="form-section-title">📜 Certifications (Optional)</div>
            <div className="form-group">
              <label>List Your Certifications</label>
              <textarea
                placeholder="• AWS Certified Developer — Amazon Web Services"
                value={form.certifications}
                onChange={(e) => setForm((f) => ({ ...f, certifications: e.target.value }))}
                style={{ minHeight: 90 }}
              />
            </div>
          </div>

          {/* Achievements (Optional) */}
          <div className="glass-card-3d">
            <div className="form-section-title">🏆 Achievements (Optional)</div>
            <div className="form-group">
              <label>List Your Achievements</label>
              <textarea
                placeholder="• Placed top 5% in Global Hackathon"
                value={form.achievements}
                onChange={(e) => setForm((f) => ({ ...f, achievements: e.target.value }))}
                style={{ minHeight: 80 }}
              />
            </div>
          </div>

          {/* Submit */}
          <div style={{ textAlign: "center", padding: "16px 0 40px" }}>
            <button type="submit" className="btn-3d-primary" disabled={loading}
              style={{ width: "100%", maxWidth: 420, padding: "16px 0", fontSize: 18 }}>
              {loading ? "Generating Resume..." : "✨ Generate AI Resume"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
