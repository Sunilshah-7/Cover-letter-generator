"use client";

import { useCompletion } from "@ai-sdk/react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

export default function Home() {
  const { completion, handleSubmit, isLoading } = useCompletion({
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
