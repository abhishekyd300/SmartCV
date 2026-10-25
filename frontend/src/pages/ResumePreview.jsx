import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { SimpleTemplate1, SimpleTemplate2 } from "../components/templates/simple";
import { ModernTemplate1, ModernTemplate2, ModernTemplate3 } from "../components/templates/modern";
import { PhotoTemplate1, PhotoTemplate2 } from "../components/templates/withphoto";

const TEMPLATE_NAMES = {
  simple_1: "Classic Timeline",
  simple_2: "Clean Centered Serif",
  modern_1: "Editorial Blush",
  modern_2: "Steel Blue Executive",
  modern_3: "Europass Indigo",
  withphoto_1: "Executive Gray (With Photo)",
  withphoto_2: "Warm Editorial Serif (With Photo)",
};

export default function ResumePreview({ resume, onBack, selectedTemplate = "simple_1", onChangeTemplate }) {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${resume?.personalInfo?.name || "Resume"} - Resume`,
  });

  if (!resume) return null;

  const templateName = TEMPLATE_NAMES[selectedTemplate] || "Classic Timeline";

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "simple_2":
        return <SimpleTemplate2 resume={resume} />;
      case "modern_1":
        return <ModernTemplate1 resume={resume} />;
      case "modern_2":
        return <ModernTemplate2 resume={resume} />;
      case "modern_3":
        return <ModernTemplate3 resume={resume} />;
      case "withphoto_1":
        return <PhotoTemplate1 resume={resume} />;
      case "withphoto_2":
        return <PhotoTemplate2 resume={resume} />;
      case "simple_1":
      default:
        return <SimpleTemplate1 resume={resume} />;
    }
  };

  return (
    <div>
      {/* Action Bar */}
      <div className="no-print preview-action-bar">
        <div className="preview-action-group">
          <button type="button" className="preview-btn-back" onClick={onBack}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Edit Resume</span>
          </button>

          {onChangeTemplate && (
            <button type="button" className="preview-btn-template" onClick={onChangeTemplate}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.8-.4-1.2 0-.9.8-1.7 1.7-1.7h2c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10z" />
              </svg>
              <span>Template: <strong style={{ marginLeft: 3 }}>{templateName}</strong></span>
            </button>
          )}
        </div>

        <div className="preview-action-group">
          <button type="button" className="preview-btn-print" onClick={handlePrint} title="Quick Print">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print</span>
          </button>

          <button type="button" className="preview-btn-download" onClick={handlePrint} title="Download Resume as PDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download PDF</span>
            <span className="preview-btn-badge">A4</span>
          </button>
        </div>
      </div>


      {/* Printable Resume Canvas */}
      <div className="resume-paper-scroll">
        <div ref={printRef} className="resume-wrapper">
          <style>{`
            @media print {
              body { margin: 0; padding: 0; background: white; }
              .no-print { display: none !important; }
              .resume-wrapper {
                box-shadow: none !important;
                padding: 0 !important;
                max-width: 100% !important;
                border: none !important;
              }
            }
            .resume-wrapper {
              background: white;
              max-width: 840px;
              width: 100%;
              margin: 0 auto;
              box-shadow: 0 4px 24px rgba(0,0,0,0.08);
              border-radius: 4px;
              overflow: hidden;
            }
          `}</style>

          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}

