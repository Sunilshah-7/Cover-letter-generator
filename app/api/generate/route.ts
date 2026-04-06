import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import pdfParse from "pdf-parse";

// Use Node.js runtime for pdf-parse compatibility
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // Maximum execution time in seconds

export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json();

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
      return new Response(
        JSON.stringify({ error: "Failed to parse PDF resume" }),
        { status: 400 },
      );
    }
  }

  try {
    const result = await streamText({
      model: google("gemini-2.5-flash"),
      system: `
    You are an elite Career Strategist and Expert Copywriter. 
    Your goal is to write a high-impact, one-page cover letter (approx. 300-400 words) that bridges the gap between a candidate's resume and a specific job description.

    Follow these strategic guidelines:
    1. Research Simulation: Based on the Job Description, identify the company's core values and the top 3 high-priority skills they are looking for.
    2. The cover letter should not be long, just 3 paragraph. 
    3. First paragraph should start with "I acknowledge " the company name "is" looking for a "job title" with a hook. 
    4. Second paragraph should demonstrate the most relevant experience from my resume that nearly matches the job description and my thought process while building the project. Second paragraph should discuss about only 1 project, not any more. 
    5. Third paragraph should demonstrate gratitude for applying and eagerness to grow with the company. 
    6. Proof Points: Do not just list duties. Connect specific projects and leadership experiences from the resume directly to the requirements of the job.
    7. Don't use these dashes — in the cover letter. Use commas or semicolons instead.
    8. The cover letter don't need to have My contact information or the hiring manager's contact information or the company's contact information. It should be just plain "Dear Hiring Manager,", then rest of the cover letter.
    9. The cover letter should end with "Best Regards," and then my name, but no signature or contact information.
    10. The cover letter should pass all the AI content detectors and should be 100% human written. It should not have any AI generated content. It should be completely original and unique. It should not be generic or template based. It should be tailored to the specific job description and my resume. It should not have any cliches or buzzwords. It should be specific and detailed. It should show deep understanding of the company and the role. It should show my passion and enthusiasm for the company and the role. It should show my unique value proposition and how I can contribute to the company's success.
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

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to generate cover letter" }),
      { status: 500 },
    );
  }
}
