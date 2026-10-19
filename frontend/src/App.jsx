import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TemplateSelector from "./pages/TemplateSelector";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("simple_1");
  const [step, setStep] = useState("landing"); // landing | templates | form | preview

  return (
    <div className={`app app-step-${step}${step === "landing" ? " app-landing" : ""}`}>
      <Header
        currentStep={step}
        onNavigate={(newStep) => setStep(newStep)}
      />

      <main className="main-content">
        {step === "landing" && (
          <LandingPage onStart={() => setStep("templates")} />
        )}

        {step === "templates" && (
          <TemplateSelector
            initialSelected={selectedTemplate}
            onSelect={(tplId) => {
              setSelectedTemplate(tplId);
              setStep("form");
            }}
            onSkip={() => setStep("form")}
          />
        )}

        {step === "form" && (
          <ResumeForm
            initialData={resume}
            selectedTemplate={selectedTemplate}
            onChangeTemplate={() => setStep("templates")}
            onGenerated={(data) => {
              setResume(data);
              setStep("preview");
            }}
          />
        )}

        {step === "preview" && (
          <ResumePreview
            resume={resume}
            selectedTemplate={selectedTemplate}
            onBack={() => setStep("form")}
            onChangeTemplate={() => setStep("templates")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
