import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import pdfParse from "pdf-parse";

// Use Node.js runtime for pdf-parse compatibility
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // Maximum execution time in seconds

export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json();

  console.log("Received resume and job description in /api/generate");
  // Parse PDF if resume is a base64 data URL
  let resumeText = resume;

  if (resume.startsWith("data:application/pdf;base64,")) {
    try {
      // Extract base64 content
      const base64Data = resume.split(",")[1];
      const pdfBuffer = Buffer.from(base64Data, "base64");

      // Parse PDF and extract text using pdf-parse
      const pdfData = await pdfParse(pdfBuffer);
      resumeText = pdfData.text;
    } catch (error) {
      console.error("Error parsing PDF:", error);
      return new Response(
        JSON.stringify({ error: "Failed to parse PDF resume" }),
        { status: 400 },
      );
    }
  }

  try {
    const result = await streamText({
      model: google("gemini-2.5-flash"), // Note: Ensure the model string matches current documentation
      system: `
    You are an elite Career Strategist and Expert Copywriter. 
    Your goal is to write a high-impact, one-page cover letter (approx. 300-400 words) that bridges the gap between a candidate's resume and a specific job description.

    Follow these strategic guidelines:
    1. Research Simulation: Based on the Job Description, identify the company's core values and the top 3 high-priority skills they are looking for.
    2. The first line should always be "I am very excited to apply for this role because..." and then mention a specific detail about the company or its mission to show genuine interest.
    3. Proof Points: Do not just list duties. Connect specific projects and leadership experiences from the resume directly to the requirements of the job.
    4. Tone: Maintain a professional, confident, and enthusiastic tone. Avoid clichés like "I am a hard worker" or "To whom it may concern."
    5. Formatting: Use standard business letter formatting.
  `,
      prompt: `
    CONTEXT:
    - Resume Content: ${resumeText}
    - Job Description: ${jobDescription}

    TASK:
    Write a tailored, one-page cover letter. 
    Focus heavily on how my previous work and projects (as detailed in my resume) provide evidence that I can solve the specific problems mentioned in the job posting. 
    Highlight my leadership skills and technical expertise where they align with the company's needs.
  `,
    });
    console.log("Gemini generation started");
    console.log(result);
    console.log(typeof result.toTextStreamResponse);
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate cover letter" }),
      { status: 500 },
    );
  }
}
