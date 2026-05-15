# 🤖 SmartCV

A full-stack AI resume builder using **Express.js** backend + **React** frontend + **Groq**(free API).

## 🚀 Quick Start

### 1. Get Your API Key

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your API_KEY
npm run dev
```

### 3. Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```

### 4. Open App
Visit http://localhost:3000

---

## 📁 Project Structure

```
ai-resume-builder/
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express server entry
│   │   ├── routes/resume.js        # API routes
│   │   └── services/aiService.js   # Gemini AI integration
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── ResumeForm.js       # Multi-step form
    │   │   └── ResumePreview.js    # Resume + PDF export
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🔑 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/resume/generate` | Generate AI resume |
| POST | `/api/resume/improve-section` | Improve a specific section |

## ✨ Features
- 📝 Multi-section resume form (experience, education, skills)
- 🤖 AI-powered content generation
- 🎯 Job description tailoring
- 🖨️ PDF download via browser print
- ⚡ Fast, free Groq API

## 🛠️ Tech Stack
- **Backend**: Express.js, @google/generative-ai, express-validator
- **Frontend**: React, Axios, react-to-print

