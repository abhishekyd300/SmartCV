import React, { useState } from "react";
import axios from "axios";

const defaultForm = {
  personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", portfolio: "" },
  targetRole: "",
  jobDescription: "",
  experience: [{ title: "", company: "", duration: "", description: "" }],
  education: [{ degree: "", institution: "", year: "", details: "" }],
  skills: "",
};

export default function ResumeForm({ onGenerated }) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updatePersonal = (field, val) =>
    setForm((f) => ({ ...f, personalInfo: { ...f.personalInfo, [field]: val } }));

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
          <div className="loading-card">
            <div className="spinner" />
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Crafting your resume...</div>
            <div style={{ fontSize: 14, color: "#64748b" }}>Gemini AI is writing your perfect resume</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: 20 }}>

          {/* Target Role */}
          <div className="card">
            <div className="section-title">🎯 Target Role</div>
            {error && <div className="error-msg">⚠️ {error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label>Job Title You're Applying For *</label>
                <input
                  placeholder="e.g. Senior Frontend Developer"
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
                style={{ minHeight: 100 }}
              />
            </div>
          </div>

          {/* Personal Info */}
          <div className="card">
            <div className="section-title">👤 Personal Information</div>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input placeholder="John Doe" value={form.personalInfo.name}
                  onChange={(e) => updatePersonal("name", e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" placeholder="john@example.com" value={form.personalInfo.email}
                  onChange={(e) => updatePersonal("email", e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input placeholder="+91 98765 43210" value={form.personalInfo.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input placeholder="Mumbai, India" value={form.personalInfo.location}
                  onChange={(e) => updatePersonal("location", e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input placeholder="linkedin.com/in/johndoe" value={form.personalInfo.linkedin}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Portfolio / Website</label>
                <input placeholder="johndoe.dev" value={form.personalInfo.portfolio}
                  onChange={(e) => updatePersonal("portfolio", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="card">
            <div className="section-title">
              💼 Work Experience
              <span className="badge">{form.experience.length}</span>
            </div>
            {form.experience.map((exp, i) => (
              <div key={i} style={{
                padding: 16, background: "#f8fafc", borderRadius: 10,
                border: "1px solid #e5e7eb", marginBottom: 16
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "#6366f1" }}>
                    Experience {i + 1}
                  </span>
                  {form.experience.length > 1 && (
                    <button type="button" className="btn btn-danger" style={{ padding: "4px 10px", fontSize: 12 }}
                      onClick={() => removeExp(i)}>Remove</button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input placeholder="Software Engineer" value={exp.title}
                      onChange={(e) => updateExp(i, "title", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Company *</label>
                    <input placeholder="Google" value={exp.company}
                      onChange={(e) => updateExp(i, "company", e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input placeholder="Jan 2022 – Present" value={exp.duration}
                    onChange={(e) => updateExp(i, "duration", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Briefly describe your responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => updateExp(i, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addExp}>
              + Add Experience
            </button>
          </div>

          {/* Education */}
          <div className="card">
            <div className="section-title">
              🎓 Education
              <span className="badge">{form.education.length}</span>
            </div>
            {form.education.map((edu, i) => (
              <div key={i} style={{
                padding: 16, background: "#f8fafc", borderRadius: 10,
                border: "1px solid #e5e7eb", marginBottom: 16
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "#6366f1" }}>Education {i + 1}</span>
                  {form.education.length > 1 && (
                    <button type="button" className="btn btn-danger" style={{ padding: "4px 10px", fontSize: 12 }}
                      onClick={() => removeEdu(i)}>Remove</button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Degree / Qualification *</label>
                    <input placeholder="B.Tech Computer Science" value={edu.degree}
                      onChange={(e) => updateEdu(i, "degree", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Institution *</label>
                    <input placeholder="IIT Bombay" value={edu.institution}
                      onChange={(e) => updateEdu(i, "institution", e.target.value)} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Year</label>
                    <input placeholder="2020 – 2024" value={edu.year}
                      onChange={(e) => updateEdu(i, "year", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Details (GPA, honors, etc.)</label>
                    <input placeholder="GPA: 8.9/10, Dean's List" value={edu.details}
                      onChange={(e) => updateEdu(i, "details", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addEdu}>
              + Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="card">
            <div className="section-title">🛠️ Skills</div>
            <div className="form-group">
              <label>List Your Skills *</label>
              <textarea
                placeholder="React, Node.js, Python, SQL, Docker, AWS, Git, Figma, Communication, Leadership..."
                value={form.skills}
                onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
                style={{ minHeight: 80 }}
                required
              />
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
                Separate skills with commas. Gemini will automatically categorize them.
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ textAlign: "center", paddingBottom: 32 }}>
            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ padding: "14px 40px", fontSize: 16, borderRadius: 12 }}>
              {loading ? "Generating..." : "✨ Generate AI Resume"}
            </button>
            
          </div>
        </div>
      </form>
    </>
  );
}
