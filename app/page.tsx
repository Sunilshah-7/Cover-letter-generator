"use client";

import { useCompletion } from "ai/react";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/generate",
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const resume = formData.get("resume") as string;
    const jobDescription = formData.get("jobDescription") as string;

    handleSubmit(e, { body: { resume, jobDescription } });
  };
  return (
    <main className="max-w-3xl mx-auto p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">AI Cover letter generator</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Your Resume (Text)</label>
          <textarea
            name="resume"
            rows={6}
            className="w-full p-2 border rounded text-black"
            required
            placeholder="Paste resume here..."
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            name="jobDescription"
            rows={6}
            className="w-full p-2 border rounded text-black"
            required
            placeholder="Paste job description here..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Cover Letter"}
        </button>

        {completion && (
          <div className="mt-10 p-6 border-t bg-gray-50 rounded shadow-inner whitespace-pre-wrap">
            <h2 className="text-xl font-semibold mb-5 text-black">
              Generated Cover letter
            </h2>
            <p className="text-gray-800">{completion}</p>
          </div>
        )}
      </form>
    </main>
  );
}
