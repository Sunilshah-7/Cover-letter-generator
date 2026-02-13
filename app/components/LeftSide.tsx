import React, { useState, useRef } from "react";
import {
  IoDocumentTextOutline,
  IoCloudUploadOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function LeftSide({
  onSubmit,
  isLoading,
}: {
  onSubmit: (e: React.FormEvent, file: File | null) => void;
  isLoading: boolean;
}) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (
        files[0].type === "application/pdf" ||
        files[0].name.endsWith(".pdf")
      ) {
        setUploadedFile(files[0]);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Clicked");
    // Get the file from state (drag-drop) or from input element (file picker)
    const fileToSubmit =
      uploadedFile || fileInputRef.current?.files?.[0] || null;

    // Call parent's onSubmit with the file
    onSubmit(e, fileToSubmit);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 uppercase tracking-wide">
        Job Description & Resume
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <textarea
            name="jobDescription"
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
            placeholder="Paste the job description here..."
          />
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="resume"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
            required={!uploadedFile}
          />

          {uploadedFile ? (
            <div className="space-y-2">
              <IoCheckmarkCircle className="w-12 h-12 text-green-500 mx-auto" />
              <p className="font-medium text-gray-800">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedFile(null);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800 underline"
              >
                Remove file
              </button>
            </div>
          ) : (
            <>
              <IoCloudUploadOutline className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <IoDocumentTextOutline className="w-6 h-6" />
                <span className="font-medium">Attach Resume (PDF)</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Drag & drop your PDF here or click to browse
              </p>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors uppercase tracking-wide"
        >
          {isLoading ? "Generating..." : "Generate Letter"}
        </button>
      </form>
    </div>
  );
}
