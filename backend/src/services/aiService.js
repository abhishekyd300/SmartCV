import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateResume(resumeData) {
  const { personalInfo, experience = [], projects = [], education = [], skills = "", certifications = "", achievements = "", targetRole, jobDescription } = resumeData;

  const prompt = `You are an expert resume writer. Create a professional resume in JSON format.

Target Role: ${targetRole}
${jobDescription ? `Job Description: ${jobDescription}` : ""}

Personal Info: Name: ${personalInfo.name}, Email: ${personalInfo.email}, Phone: ${personalInfo.phone || ""}, Location: ${personalInfo.location || ""}, LinkedIn: ${personalInfo.linkedin || ""}, GitHub: ${personalInfo.github || ""}, LeetCode: ${personalInfo.leetcode || ""}, Portfolio: ${personalInfo.portfolio || ""}

Projects:
${projects.map((p, i) => `${i + 1}. ${p.title} (${p.subtitle || ""}) Tech: ${p.techStack || ""}\n   GitHub: ${p.github || ""}, Live: ${p.live || ""}\n   ${p.description || ""}`).join("\n")}

${experience.length > 0 ? `Work Experience:\n${experience.map((exp, i) => `${i + 1}. ${exp.title} at ${exp.company} (${exp.duration})\n   ${exp.description}`).join("\n")}` : "Work Experience: None"}

Education:
${education.map((edu) => `- ${edu.degree} from ${edu.institution} (${edu.year || ""}) ${edu.details || ""}`).join("\n")}

Skills: ${skills}

Certifications: ${certifications}

Achievements: ${achievements}

Return ONLY raw JSON, no markdown, no backticks:
{
  "personalInfo": {"name":"","email":"","phone":"","location":"","linkedin":"","github":"","leetcode":""},
  "summary": "",
  "education": [{"institution":"","location":"","degree":"","duration":"","details":""}],
  "skills": {"Languages":[],"Frontend":[],"Backend":[],"Database":[],"Tools":[],"Core CS":[]},
  "projects": [{"title":"","subtitle":"","links":{"github":"","live":""},"techStack":[],"bullets":[]}],
  "experience": [{"title":"","company":"","duration":"","location":"","bullets":[]}],
  "certifications": ["AWS Certified Cloud Practitioner — Amazon Web Services"],
  "achievements": ["Solved 300+ DSA problems on LeetCode"]
}`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2048,
  });

  const text = response.choices[0]?.message?.content || "";
  let cleaned = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Groq did not return valid JSON: " + text.substring(0, 200));
  return JSON.parse(cleaned.substring(start, end + 1));
}

export async function improveSection(section, content, targetRole) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: `Improve this ${section} for a ${targetRole} role.\n\n${content}\n\nReturn only the improved text.` }],
    temperature: 0.7,
    max_tokens: 500,
  });
  return response.choices[0]?.message?.content?.trim() || content;
}