import express from "express";
import { body, validationResult } from "express-validator";
import multer from "multer";
import { generateResume, improveSection } from "../services/aiService.js";
import { uploadToImageKit, getAuthenticationParameters } from "../services/imagekitService.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

const validateResume = [
  body("personalInfo.name").notEmpty().withMessage("Name is required"),
  body("personalInfo.email").isEmail().withMessage("Valid email is required"),
  body("targetRole").notEmpty().withMessage("Target role is required"),
  body("education").isArray({ min: 1 }).withMessage("At least one education entry required"),
  body("skills").optional(),
];

// POST /api/resume/generate
router.post("/generate", validateResume, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map((e) => e.msg).join(", ");
    return res.status(400).json({ error: errorMsg, errors: errors.array() });
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

// POST /api/resume/upload-photo
router.post("/upload-photo", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    const result = await uploadToImageKit({
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/smartcv",
    });

    res.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      thumbnailUrl: result.thumbnailUrl,
    });
  } catch (err) {
    console.error("ImageKit upload error:", err);
    res.status(500).json({
      error: err.message || "Failed to upload photo to ImageKit.",
    });
  }
});

// GET /api/resume/imagekit-auth
router.get("/imagekit-auth", (req, res) => {
  try {
    const authParams = getAuthenticationParameters();
    res.json({ success: true, ...authParams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
