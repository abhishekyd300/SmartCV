import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { SimpleTemplate1, SimpleTemplate2 } from "./templates/simple";

export default function ResumePreview({ resume, onBack, selectedTemplate = "simple_1", onChangeTemplate }) {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${resume?.personalInfo?.name || "Resume"} - Resume`,
  });

  if (!resume) return null;

  const templateName = selectedTemplate === "simple_2" ? "Clean Centered Serif" : "Classic Timeline";

  return (
    <div>
      {/* Action Bar */}
      <div className="no-print" style={{
        display: "flex", gap: 12, marginBottom: 24,
        alignItems: "center", flexWrap: "wrap"
      }}>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Edit Resume
        </button>
        {onChangeTemplate && (
          <button className="btn btn-secondary" onClick={onChangeTemplate}>
            🎨 Template: <strong style={{ marginLeft: 4 }}>{templateName}</strong>
          </button>
        )}
        <button className="btn btn-primary" onClick={handlePrint} style={{ marginLeft: "auto" }}>
          🖨️ Download / Print PDF
        </button>
      </div>

      {/* Printable Resume Canvas */}
      <div ref={printRef}>
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
            margin: 0 auto;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            border-radius: 4px;
            overflow: hidden;
          }
        `}</style>

        <div className="resume-wrapper">
          {selectedTemplate === "simple_2" ? (
            <SimpleTemplate2 resume={resume} />
          ) : (
            <SimpleTemplate1 resume={resume} />
          )}
        </div>
      </div>
    </div>
  );
}

