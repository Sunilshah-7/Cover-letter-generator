"use client";

import { useCompletion } from "@ai-sdk/react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

export default function Home() {
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate",
    // Server returns a text/plain stream via toTextStreamResponse
    streamProtocol: "text",
  });

  const onSubmit = async (e: React.FormEvent, file: File | null) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const resumeFile = file;
    const jobDescription = formData.get("jobDescription") as string;

    if (!resumeFile || !jobDescription) {
      alert("Please provide both resume and job description");
      return;
    }

    // Read the PDF file content as base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const resumeContent = event.target?.result as string;

      try {
        await complete("", {
          body: {
            resume: resumeContent,
            jobDescription,
          },
        });
      } catch (err) {
        console.error("Failed to call api:", err);
        alert("Could not generate cover letter. Check the logs for details.");
      }
    };

    reader.readAsDataURL(resumeFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          AI Generated Cover Letter
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input */}
          <LeftSide onSubmit={onSubmit} isLoading={isLoading} />

          {/* Right Panel - Output */}
          <RightSide completion={completion} />
        </div>
      </div>
    </div>
  );
}
