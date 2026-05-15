import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRouter from "./routes/resume.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));  // or set your frontend URL
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "AI Resume Builder API 🚀" }));
app.use("/api/resume", resumeRouter);

// ✅ Export for Vercel — don't call app.listen()
export default app;