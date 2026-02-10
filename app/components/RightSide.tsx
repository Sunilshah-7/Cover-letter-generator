import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function RightSide({
  completion,
}: {
  completion: string | null;
}) {
  const downloadDocx = (completion) => {
    const blob = new Blob([completion], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.docx";
    a.click();
  };

  const downloadPdf = (completion) => {
    const blob = new Blob([completion], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.pdf";
    a.click();
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 uppercase tracking-wide">
        Generated Cover letter
      </h2>

      {completion ? (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6 min-h-[400px] whitespace-pre-wrap text-gray-800 border border-gray-200">
            {completion}
          </div>

          <div className="flex gap-3">
            <button onClick={() => downloadDocx(completion)}>
              Download .DOCX
            </button>
            <button onClick={() => downloadPdf(completion)}>
              Download .PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px] text-gray-400">
          <div className="text-center">
            <IoDocumentTextOutline className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">Your cover letter will appear here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
