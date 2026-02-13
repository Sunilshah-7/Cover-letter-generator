import React, { useEffect } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
// import jsPDF from "jspdf";

export default function RightSide({
  completion,
}: {
  completion: string | null;
}) {
  useEffect(() => {
    console.log("Content received from /api/generate:", completion);
  }, [completion]);

  const downloadDocx = async (content: string) => {
    // Split content into paragraphs
    const paragraphs = content.split("\n").map(
      (line) =>
        new Paragraph({
          children: [new TextRun(line || " ")], // Use space for empty lines
        }),
    );

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "cover-letter.docx");
  };

  // const downloadPdf = (content: string) => {
  //   const doc = new jsPDF();

  //   // Split text into lines and add to PDF
  //   const lines = doc.splitTextToSize(content, 180); // 180mm width
  //   doc.text(lines, 15, 15); // x=15, y=15 margin

  //   doc.save("cover-letter.pdf");
  // };

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
            <button
              onClick={() => downloadDocx(completion)}
              className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors"
            >
              Download .DOCX
            </button>
            {/* <button
              onClick={() => downloadPdf(completion)}
              className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold shadow-sm hover:bg-red-700 transition-colors"
            >
              Download .PDF
            </button> */}
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
