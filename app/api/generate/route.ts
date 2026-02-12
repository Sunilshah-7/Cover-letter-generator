import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import pdf from "pdf-parse";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json();

  // Parse PDF if resume is a base64 data URL
  let resumeText = resume;

  if (resume.startsWith("data:application/pdf;base64,")) {
    try {
      // Extract base64 content
      const base64Data = resume.split(",")[1];
      const pdfBuffer = Buffer.from(base64Data, "base64");

      // Parse PDF and extract text
      const pdfData = await pdf(pdfBuffer);
      resumeText = pdfData.text;
    } catch (error) {
      console.error("Error parsing PDF:", error);
      return new Response(
        JSON.stringify({ error: "Failed to parse PDF resume" }),
        { status: 400 },
      );
    }
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system:
      "You are a professional career coach and expert cover letter writer.",
    prompt: `Write a tailored, professional cover letter based on this resume: ${resumeText} for the following job description: ${jobDescription}. Keep it concise and highlight matching skills.`,
  });
  return result.toTextStreamResponse();
}
