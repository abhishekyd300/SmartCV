import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [step, setStep] = useState("landing"); // landing | form | preview

  return (
    <div className={`app app-step-${step}`}>
      <Header
        currentStep={step}
        onNavigate={(newStep) => setStep(newStep)}
      />

      <main className="main-content">
        {step === "landing" && (
          <LandingPage onStart={() => setStep("form")} />
        )}

        {step === "form" && (
          <ResumeForm
            initialData={resume}
            onGenerated={(data) => {
              setResume(data);
              setStep("preview");
            }}
          />
        )}

        {step === "preview" && (
          <ResumePreview
            resume={resume}
            onBack={() => setStep("form")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
