import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [step, setStep] = useState("form"); // form | preview

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {step === "form" ? (
          <ResumeForm
            onGenerated={(data) => {
              setResume(data);
              setStep("preview");
            }}
          />
        ) : (
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
