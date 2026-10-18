import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const googleApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const googleAi = googleApiKey ? new GoogleGenAI({ apiKey: googleApiKey }) : null;
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

function parseJsonFromText(text) {
  let cleaned = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("AI did not return valid JSON: " + text.substring(0, 200));
  }
  return JSON.parse(cleaned.substring(start, end + 1));
}

function sanitizeAndEnforceIntegrity(result, resumeData, validProjects, validExperience, validEducation, trimmedSkills, trimmedCerts, trimmedAch) {
  const sanitized = { ...result };

  // 1. Personal Info - only keep provided fields
  sanitized.personalInfo = {
    name: resumeData.personalInfo?.name || sanitized.personalInfo?.name || "",
    email: resumeData.personalInfo?.email || sanitized.personalInfo?.email || "",
    phone: resumeData.personalInfo?.phone || "",
    location: resumeData.personalInfo?.location || "",
    linkedin: resumeData.personalInfo?.linkedin || "",
    github: resumeData.personalInfo?.github || "",
    leetcode: resumeData.personalInfo?.leetcode || "",
    portfolio: resumeData.personalInfo?.portfolio || "",
  };

  // 2. Projects - if user provided no projects, strictly return empty array
  if (validProjects.length === 0) {
    sanitized.projects = [];
  } else if (Array.isArray(sanitized.projects)) {
    // Only keep generated projects that match valid user projects
    sanitized.projects = sanitized.projects.filter(p => p && p.title && p.title.trim());
    if (sanitized.projects.length === 0) {
      sanitized.projects = validProjects.map(p => ({
        title: p.title,
        subtitle: p.subtitle || "",
        links: { github: p.github || "", live: p.live || "" },
        techStack: p.techStack ? p.techStack.split(",").map(s => s.trim()) : [],
        bullets: p.description ? [p.description] : []
      }));
    }
  } else {
    sanitized.projects = [];
  }

  // 3. Work Experience - if user provided no experience, strictly return empty array
  if (validExperience.length === 0) {
    sanitized.experience = [];
  } else if (!Array.isArray(sanitized.experience)) {
    sanitized.experience = [];
  }

  // 4. Certifications - if user provided no certifications, strictly return empty array
  if (!trimmedCerts) {
    sanitized.certifications = [];
  } else if (!Array.isArray(sanitized.certifications) || sanitized.certifications.length === 0) {
    sanitized.certifications = trimmedCerts.split("\n").map(c => c.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
  }

  // 5. Achievements - if user provided no achievements, strictly return empty array
  if (!trimmedAch) {
    sanitized.achievements = [];
  } else if (!Array.isArray(sanitized.achievements) || sanitized.achievements.length === 0) {
    sanitized.achievements = trimmedAch.split("\n").map(a => a.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
  }

  // 6. Technical Skills - STRICT: only output exactly what the user provided
  if (!trimmedSkills) {
    sanitized.skills = {};
  } else {
    // Build a Set of every skill token the user explicitly typed (case-insensitive)
    const userSkillTokens = new Set(
      trimmedSkills
        .split(/[\n,;]+/)
        .map(s => s.replace(/^[A-Za-z ]+:\s*/, "").trim()) // strip "Category: " prefixes
        .filter(Boolean)
        .map(s => s.toLowerCase())
    );

    // Also accept skills mentioned directly in project tech stacks
    validProjects.forEach(p => {
      if (p.techStack) {
        p.techStack.split(/[,;]+/).forEach(t => {
          const token = t.trim().toLowerCase();
          if (token) userSkillTokens.add(token);
        });
      }
    });

    const cleanedSkills = {};

    if (sanitized.skills && typeof sanitized.skills === "object") {
      for (const [category, list] of Object.entries(sanitized.skills)) {
        const items = Array.isArray(list)
          ? list
          : typeof list === "string"
          ? list.split(/[,;]+/).map(s => s.trim()).filter(Boolean)
          : [];

        const filteredList = items.filter(skill => {
          if (!skill || typeof skill !== "string") return false;
          return userSkillTokens.has(skill.toLowerCase().trim());
        });

        if (filteredList.length > 0) {
          cleanedSkills[category] = filteredList;
        }
      }
    }

    // Fallback: if AI categorization wiped everything out, show skills flat as provided
    if (Object.keys(cleanedSkills).length === 0) {
      cleanedSkills["Technical Skills"] = [...userSkillTokens].map(s =>
        trimmedSkills.split(/[\n,;]+/).find(t => t.trim().toLowerCase() === s)?.trim() || s
      ).filter(Boolean);
    }

    sanitized.skills = cleanedSkills;
  }

  return sanitized;
}

export async function generateResume(resumeData) {
  const {
    personalInfo = {},
    experience = [],
    projects = [],
    education = [],
    skills = "",
    certifications = "",
    achievements = "",
    targetRole = "",
    jobDescription = ""
  } = resumeData;

  // Filter valid user inputs
  const validProjects = (Array.isArray(projects) ? projects : []).filter(
    (p) => p && ((p.title && p.title.trim()) || (p.description && p.description.trim()))
  );

  const validExperience = (Array.isArray(experience) ? experience : []).filter(
    (e) => e && ((e.title && e.title.trim()) || (e.company && e.company.trim()) || (e.description && e.description.trim()))
  );

  const validEducation = (Array.isArray(education) ? education : []).filter(
    (ed) => ed && ((ed.degree && ed.degree.trim()) || (ed.institution && ed.institution.trim()))
  );

  const trimmedSkills = typeof skills === "string" ? skills.trim() : "";
  const trimmedCertifications = typeof certifications === "string" ? certifications.trim() : "";
  const trimmedAchievements = typeof achievements === "string" ? achievements.trim() : "";

  // Prepare input sections for prompt
  const projectsSection = validProjects.length > 0
    ? validProjects.map((p, i) => `${i + 1}. Title: ${p.title || "Untitled"}${p.subtitle ? ` (${p.subtitle})` : ""}${p.techStack ? ` | Tech: ${p.techStack}` : ""}${p.github ? ` | GitHub: ${p.github}` : ""}${p.live ? ` | Live: ${p.live}` : ""}\n   Description: ${p.description || "N/A"}`).join("\n")
    : "None provided by user.";

  const experienceSection = validExperience.length > 0
    ? validExperience.map((exp, i) => `${i + 1}. Role: ${exp.title || "N/A"} at ${exp.company || "N/A"}${exp.duration ? ` (${exp.duration})` : ""}${exp.location ? ` - ${exp.location}` : ""}\n   Description: ${exp.description || "N/A"}`).join("\n")
    : "None provided by user.";

  const educationSection = validEducation.length > 0
    ? validEducation.map((edu) => `- ${edu.degree || "Degree"} from ${edu.institution || "Institution"}${edu.year ? ` (${edu.year})` : ""}${edu.location ? `, ${edu.location}` : ""}${edu.details ? ` - ${edu.details}` : ""}`).join("\n")
    : "None provided by user.";

  const prompt = `You are an expert resume writer. Create a professional, ATS-optimized resume in JSON format based STRICTLY on the user's provided input.

=== CRITICAL ANTI-HALLUCINATION & FACTUAL INTEGRITY RULES ===
1. DO NOT INVENT ANY UNPROVIDED DETAILS:
   - Only include facts, sections, and items explicitly provided by the user below.
   - Do NOT invent, assume, or fabricate any projects, work experiences, skills, certifications, or achievements.
2. TECHNICAL SKILLS:
   - Use ONLY the skills explicitly written under "Provided Skills" below (or explicitly mentioned in their provided projects/experience).
   - NEVER add unmentioned skills, programming languages, databases, or tools (e.g., if user provides "React, Node.js", do NOT add "MongoDB", "Python", "Docker", "Git", "C++", "DSA", "Tailwind", etc.).
   - Categorize ONLY the user's provided skills under relevant category headings (e.g. "Languages", "Frontend", "Backend", "Database", "Tools", etc.).
   - If the user provided no skills, return "skills": {}.
   - Do NOT create empty categories or invent items to fill categories.
3. PROJECTS:
   - Include ONLY the projects listed under "Provided Projects" below.
   - If "Provided Projects" is "None provided by user.", return "projects": [].
   - DO NOT invent or fabricate any new projects.
   - For bullet points of provided projects, polish and format the user's provided description into professional ATS bullet points. Do not invent unrelated technologies or false metrics.
4. WORK EXPERIENCE:
   - Include ONLY the work experience listed under "Provided Work Experience" below.
   - If "Provided Work Experience" is "None provided by user.", return "experience": [].
   - DO NOT invent companies, roles, or internships.
5. CERTIFICATIONS:
   - Include ONLY certifications listed under "Provided Certifications" below.
   - If none provided, return "certifications": [].
   - DO NOT invent certifications.
6. ACHIEVEMENTS:
   - Include ONLY achievements listed under "Provided Achievements" below.
   - If none provided, return "achievements": [].
   - DO NOT invent achievements.
7. CONTACT / PERSONAL INFO:
   - Use ONLY the contact values provided. If a field is blank, output "" for that field. Do NOT invent links or contact numbers.

=== USER INPUT DATA ===
Target Role: ${targetRole || "Software Developer"}
${jobDescription ? `Target Job Description: ${jobDescription}` : ""}

Personal Info:
Name: ${personalInfo.name || ""}
Email: ${personalInfo.email || ""}
Phone: ${personalInfo.phone || ""}
Location: ${personalInfo.location || ""}
LinkedIn: ${personalInfo.linkedin || ""}
GitHub: ${personalInfo.github || ""}
LeetCode: ${personalInfo.leetcode || ""}
Portfolio: ${personalInfo.portfolio || ""}

Provided Education:
${educationSection}

Provided Skills:
${trimmedSkills || "None provided by user."}

Provided Projects:
${projectsSection}

Provided Work Experience:
${experienceSection}

Provided Certifications:
${trimmedCertifications || "None provided by user."}

Provided Achievements:
${trimmedAchievements || "None provided by user."}

Return ONLY raw JSON matching this structure:
{
  "personalInfo": {
    "name": "${personalInfo.name || ""}",
    "email": "${personalInfo.email || ""}",
    "phone": "${personalInfo.phone || ""}",
    "location": "${personalInfo.location || ""}",
    "linkedin": "${personalInfo.linkedin || ""}",
    "github": "${personalInfo.github || ""}",
    "leetcode": "${personalInfo.leetcode || ""}",
    "portfolio": "${personalInfo.portfolio || ""}"
  },
  "summary": "Professional summary based strictly on the user's provided background and target role",
  "education": [
    {
      "institution": "",
      "location": "",
      "degree": "",
      "duration": "",
      "details": ""
    }
  ],
  "skills": {},
  "projects": [],
  "experience": [],
  "certifications": [],
  "achievements": []
}`;

  let parsedResult = null;

  // Use Google Gemini if configured
  if (googleAi) {
    try {
      const response = await googleAi.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });
      const text = response.text || "";
      parsedResult = parseJsonFromText(text);
    } catch (err) {
      console.warn("Gemini generation failed, trying fallback:", err.message);
      if (!groq) throw err;
    }
  }

  // Fallback to Groq if available
  if (!parsedResult && groq) {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2048,
    });
    const text = response.choices[0]?.message?.content || "";
    parsedResult = parseJsonFromText(text);
  }

  if (!parsedResult) {
    throw new Error("No AI provider configured or both failed. Please check your API key.");
  }

  return sanitizeAndEnforceIntegrity(
    parsedResult,
    resumeData,
    validProjects,
    validExperience,
    validEducation,
    trimmedSkills,
    trimmedCertifications,
    trimmedAchievements
  );
}

export async function improveSection(section, content, targetRole) {
  const prompt = `Improve this ${section} for a ${targetRole} role.\n\n${content}\n\nReturn only the improved text.`;

  if (googleAi) {
    try {
      const response = await googleAi.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          temperature: 0.5,
        },
      });
      const improved = response.text?.trim();
      if (improved) return improved;
    } catch (err) {
      console.warn("Gemini improveSection failed, trying fallback:", err.message);
      if (!groq) throw err;
    }
  }

  if (groq) {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 500,
    });
    return response.choices[0]?.message?.content?.trim() || content;
  }

  return content;
}