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

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;