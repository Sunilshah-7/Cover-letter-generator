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
      model: google("gemini-2.5-flash"), // Note: Ensure the model string matches current documentation
      system: `
    You are an elite Career Strategist and Expert Copywriter. 
    Your goal is to write a high-impact, one-page cover letter (approx. 300-400 words) that bridges the gap between a candidate's resume and a specific job description.

    Follow these strategic guidelines:
    1. Research Simulation: Based on the Job Description, identify the company's core values and the top 3 high-priority skills they are looking for.
    2. The first line should always be "I acknowledge " the company name "is" looking for a "job title".  This job description says you are looking for someone who " and then mention a specific detail about the quality of candidate from the job description and say why you are a good fit.
    3. Proof Points: Do not just list duties. Connect specific projects and leadership experiences from the resume directly to the requirements of the job.
    4. Tone: Maintain a professional, confident, and enthusiastic tone. Avoid clichés like "I am a hard worker" or "To whom it may concern."
    5. Formatting: Use standard business letter formatting.
    6. The second paragraph should highlight the best one matching leadership experiences from my resume and explain the problem solving approach for that experience.  
    7. The third paragraph should highlight the best one matching technical experience from my resume and explain the problem solving approach for that experience. Also, mention that I recognize the verification debt of the code quality and reliability for the company and how I can help with my expertise in this field.
    8. The fourth paragraph should be a strong closing statement that reiterates my enthusiasm for the role and how I can contribute to the company's success, without repeating the same points from the previous paragraphs.
    9. Don't use these dashes — in the cover letter. Use commas or semicolons instead.
    10. The cover letter don't need to have My contact information or the hiring manager's contact information or the company's contact information. It should be just plain "Dear Hiring Manager,", then rest of the cover letter.
    11. The cover letter should end with "Best Regards," and then my name, but no signature or contact information.
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
