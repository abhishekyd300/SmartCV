import express from "express";
import { body, validationResult } from "express-validator";
import { generateResume, improveSection } from "../services/aiService.js";

const router = express.Router();

const validateResume = [
  body("personalInfo.name").notEmpty().withMessage("Name is required"),
  body("personalInfo.email").isEmail().withMessage("Valid email is required"),
  body("targetRole").notEmpty().withMessage("Target role is required"),
  body("experience").isArray({ min: 1 }).withMessage("At least one experience entry required"),
  body("education").isArray({ min: 1 }).withMessage("At least one education entry required"),
  body("skills").notEmpty().withMessage("Skills are required"),
];

// POST /api/resume/generate
router.post("/generate", validateResume, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const resume = await generateResume(req.body);
    res.json({ success: true, resume });
  } catch (err) {
    console.error("Generate error:", err);
    res.status(500).json({ error: "Failed to generate resume", details: err.message });
  }
});

// POST /api/resume/improve-section
router.post("/improve-section", async (req, res) => {
  const { section, content, targetRole } = req.body;
  if (!section || !content || !targetRole) {
    return res.status(400).json({ error: "section, content, and targetRole are required" });
  }

  try {
    const improved = await improveSection(section, content, targetRole);
    res.json({ success: true, improved });
  } catch (err) {
    console.error("Improve section error:", err);
    res.status(500).json({ error: "Failed to improve section", details: err.message });
  }
});

export default router;
