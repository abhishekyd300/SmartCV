import React, { useState, useEffect, useCallback } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import TemplateSelector from "./pages/TemplateSelector";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";
import Header from "./components/Header";
import "./App.css";
import "./AuthPage.css";

// Valid steps for the app
const VALID_STEPS = ["landing", "auth", "templates", "form", "preview"];

// Read step from URL hash, default to "landing"
function getStepFromHash() {
  const hash = window.location.hash.replace("#", "");
  return VALID_STEPS.includes(hash) ? hash : "landing";
}

// Update URL hash without triggering hashchange handler
function setHash(step) {
  window.location.hash = step;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [resume, setResume] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("simple_1");
  const [step, setStepState] = useState(getStepFromHash);

  // Where to go after successful login
  const [postAuthStep, setPostAuthStep] = useState("templates");

  // Custom setStep that also updates the hash
  const setStep = useCallback((newStep) => {
    setStepState(newStep);
    setHash(newStep);
  }, []);

  // Listen for browser back/forward button (hashchange event)
  useEffect(() => {
    const handleHashChange = () => {
      const hashStep = getStepFromHash();

      // If trying to go to a protected step without login, redirect to auth
      if ((hashStep === "form" || hashStep === "preview") && !user) {
        setPostAuthStep(hashStep);
        setStepState("auth");
        setHash("auth");
        return;
      }

      setStepState(hashStep);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [user]);

  // Set initial hash on first load if empty
  useEffect(() => {
    if (!window.location.hash) {
      setHash("landing");
    }
  }, []);

  // Show loading spinner while Firebase checks auth state
  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-loading-card">
          <div className="auth-loading-icon">✨</div>
          <div className="auth-loading-spinner" />
          <p className="auth-loading-text">Loading SmartCV AI...</p>
        </div>
      </div>
    );
  }

  // Helper: attempt to go to a protected step
  const goProtected = (targetStep) => {
    if (!user) {
      setPostAuthStep(targetStep);
      setStep("auth");
    } else {
      setStep(targetStep);
    }
  };

  // After successful auth, redirect to where user wanted to go
  const handlePostAuth = () => {
    setStep(postAuthStep || "templates");
  };

  // Navigation handler (used by Header)
  const handleNavigate = (newStep) => {
    // Public pages — always accessible without login
    if (newStep === "landing" || newStep === "templates") {
      setStep(newStep);
      return;
    }
    // Auth page is always accessible
    if (newStep === "auth") {
      setPostAuthStep("templates");
      setStep("auth");
      return;
    }
    // Protected pages (form, preview) require login
    goProtected(newStep);
  };

  return (
    <div className={`app app-step-${step}${step === "landing" ? " app-landing" : ""}${step === "auth" ? " app-auth" : ""}${step === "templates" ? " app-step-templates" : ""}`}>
      {/* Hide header only on auth page for cleaner look */}
      {step !== "auth" && (
        <Header
          currentStep={step}
          onNavigate={handleNavigate}
        />
      )}

      <main className={step === "auth" ? "" : "main-content"}>
        {step === "landing" && (
          <LandingPage onStart={() => setStep("templates")} />
        )}

        {step === "auth" && (
          <AuthPage
            onBack={() => setStep("landing")}
            onAuthSuccess={handlePostAuth}
          />
        )}

        {step === "templates" && (
          <TemplateSelector
            initialSelected={selectedTemplate}
            onSelect={(tplId) => {
              setSelectedTemplate(tplId);
              goProtected("form");
            }}
            onSkip={() => goProtected("form")}
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
