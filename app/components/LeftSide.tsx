import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function LeftSide({onSubmit, isLoading}: {onSubmit: (e: React.FormEvent) => void, isLoading: boolean}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 uppercase tracking-wide">
        Job Description & Resume
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <textarea
            name="jobDescription"
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
            placeholder="Paste the job description here..."
          />
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <IoDocumentTextOutline className="w-6 h-6" />
            <span className="font-medium">Attach Resume (PDF)</span>
          </div>
          <textarea
            name="resume"
            rows={4}
            className="w-full mt-4 p-3 border border-gray-300 rounded text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="Or paste your resume text here..."
          />
          <p className="text-sm text-green-600 mt-2">
            ✓ Drag & drop or click to upload
          </p>
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
