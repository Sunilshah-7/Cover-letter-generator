import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system:
      "You are a professional career coach and expert cover letter writer.",
    prompt: `Write a tailored, professional cover letter based on this resume: ${resume} for the following job description: ${jobDescription}. Keep it concise and highlight matching skills.`,
  });
  return result.toTextStreamResponse();
}
