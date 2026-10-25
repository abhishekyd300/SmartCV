import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function AuthPage({ onBack, onAuthSuccess }) {
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found": return "No account found with this email.";
      case "auth/wrong-password": return "Incorrect password. Please try again.";
      case "auth/invalid-credential": return "Invalid email or password.";
      case "auth/email-already-in-use": return "An account with this email already exists.";
      case "auth/weak-password": return "Password must be at least 6 characters.";
      case "auth/invalid-email": return "Please enter a valid email address.";
      case "auth/too-many-requests": return "Too many attempts. Please try again later.";
      case "auth/popup-closed-by-user": return "Sign-in was cancelled.";
      default: return "Something went wrong. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError("Please enter your full name.");
          setLoading(false);
          return;
        }
        await signup(email, password, fullName.trim());
      } else {
        await login(email, password);
      }
      // Auth success → redirect
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      console.error("Auth error:", err);
      setError(getErrorMessage(err.code));
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setResetSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email.trim());
      setResetSuccess(`Password reset email sent to ${email.trim()}! Please check your inbox (and spam folder) for the reset link.`);
    } catch (err) {
      console.error("Password reset error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(getErrorMessage(err.code));
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      // Auth success → redirect
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      console.error("Google auth error:", err);
      setError(getErrorMessage(err.code));
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Background decoration */}
      <div className="auth-bg-orb auth-bg-orb-1" />
      <div className="auth-bg-orb auth-bg-orb-2" />
      <div className="auth-bg-orb auth-bg-orb-3" />

      <div className="auth-container">
        {/* Left panel — branding */}
        <div className="auth-branding">
          <div className="auth-brand-content">
            {onBack && (
              <button
                type="button"
                className="auth-back-btn"
                onClick={onBack}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Home
              </button>
            )}
            <div className="auth-brand-icon">✨</div>
            <h1 className="auth-brand-title">
              <span className="auth-brand-smart">SmartCV</span>{" "}
              <span className="auth-brand-ai">AI</span>
            </h1>
            <p className="auth-brand-tagline">
              Build professional, ATS-optimized resumes in under 60 seconds with
              the power of AI.
            </p>
            <div className="auth-brand-features">
              {[
                "AI-powered resume generation",
                "ATS-optimized formatting",
                "Professional templates",
                "Instant PDF download",
              ].map((f, i) => (
                <div key={i} className="auth-brand-feature">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.15)" />
                    <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            {isForgotPassword ? (
              /* Forgot Password Flow */
              <>
                <h2 className="auth-title">Reset your password</h2>
                <p style={{ color: "#64748b", fontSize: "14px", marginTop: "-18px", marginBottom: "24px", lineHeight: 1.5 }}>
                  Enter your registered email address and Firebase will send you a password reset link.
                </p>

                {error && (
                  <div className="auth-error">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#fee2e2" />
                      <path d="M8 5v3m0 2h.01" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {error}
                  </div>
                )}

                {resetSuccess && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                    color: "#065f46",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    marginBottom: "20px"
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{resetSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="auth-form">
                  <div className="auth-field">
                    <label htmlFor="reset-email">Email address</label>
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? <span className="auth-spinner" /> : "Send Reset Link"}
                  </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "24px" }}>
                  <button
                    type="button"
                    className="auth-forgot-link"
                    style={{ background: "none", border: "none", cursor: "pointer", width: "100%" }}
                    onClick={() => {
                      setIsForgotPassword(false);
                      setError("");
                      setResetSuccess("");
                    }}
                  >
                    ← Back to Log in
                  </button>
                </div>
              </>
            ) : (
              /* Standard Login / Signup Flow */
              <>
                <h2 className="auth-title">
                  {isSignUp ? "Create your account" : "Sign-in to your account"}
                </h2>

                {error && (
                  <div className="auth-error">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#fee2e2" />
                      <path d="M8 5v3m0 2h.01" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                  {isSignUp && (
                    <div className="auth-field">
                      <label htmlFor="auth-fullname">Full name</label>
                      <input
                        id="auth-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                      />
                    </div>
                  )}

                  <div className="auth-field">
                    <label htmlFor="auth-email">Email address</label>
                    <input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="auth-field">
                    <label htmlFor="auth-password">Password</label>
                    <div className="auth-password-wrapper">
                      <input
                        id="auth-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        required
                        minLength={6}
                        maxLength={16}
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    <span className="auth-hint">
                      * Your password must be between 6 and 16 characters long.
                    </span>
                  </div>

                  <label className="auth-checkbox-label" htmlFor="auth-stay">
                    <input
                      id="auth-stay"
                      type="checkbox"
                      checked={staySignedIn}
                      onChange={(e) => setStaySignedIn(e.target.checked)}
                    />
                    <span className="auth-checkmark" />
                    Stay signed in
                  </label>

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="auth-spinner" />
                    ) : isSignUp ? (
                      "Create Account"
                    ) : (
                      "Log in"
                    )}
                  </button>

                  <p className="auth-terms">
                    By clicking '{isSignUp ? "Create Account" : "Log in"}' you also
                    agree to our{" "}
                    <a href="#terms">Terms of Use</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>.
                  </p>
                </form>

                <div className="auth-divider">
                  <span>or</span>
                </div>

                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <GoogleIcon />
                  Sign in with Google
                </button>

                {!isSignUp && (
                  <button
                    type="button"
                    className="auth-forgot-link"
                    style={{ background: "none", border: "none", cursor: "pointer", width: "100%" }}
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError("");
                      setResetSuccess("");
                    }}
                  >
                    Forgot your password?
                  </button>
                )}

                <p className="auth-switch">
                  {isSignUp
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <button
                    type="button"
                    className="auth-switch-btn"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setIsForgotPassword(false);
                      setError("");
                      setResetSuccess("");
                    }}
                  >
                    {isSignUp ? "Log in" : "Sign up"}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
