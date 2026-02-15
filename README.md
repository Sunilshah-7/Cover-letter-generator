# AI-Powered Cover Letter Generator

A Next.js application that generates tailored, professional cover letters using Google's Gemini AI. Simply upload your resume (PDF) and paste a job description to receive a customized cover letter optimized for that specific role.

## Features

- **AI-Powered Generation**: Leverages Google Gemini 2.5 Flash for intelligent cover letter creation
- **PDF Resume Parsing**: Automatically extracts text from PDF resumes
- **Real-time Streaming**: Watch your cover letter generate in real-time
- **Professional Formatting**: Creates well-structured, business-standard cover letters
- **Export Options**: Download generated letters as DOCX files
- **Drag & Drop Interface**: Easy file upload with drag-and-drop support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with TypeScript
- **AI SDK**: [@ai-sdk/google](https://sdk.vercel.ai/docs) and [@ai-sdk/react](https://sdk.vercel.ai/docs)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **PDF Processing**: [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- **Document Export**: [docx](https://www.npmjs.com/package/docx)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Architecture

The application follows a simple Request-Response flow:

1. **User Input**: User uploads their resume (PDF) and pastes the job description
2. **Request**: Frontend sends both inputs to the `/api/generate` endpoint
3. **Processing**: Backend extracts text from PDF and constructs an AI prompt
4. **AI Generation**: Gemini API processes the prompt and streams the response
5. **Output**: Generated cover letter appears in real-time on the UI
6. **Export**: User can download the letter as a DOCX file

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for cover letter generation
│   ├── components/
│   │   ├── LeftSide.tsx          # Input panel (resume & job description)
│   │   └── RightSide.tsx         # Output panel (generated letter)
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main application page
├── public/                        # Static assets
├── .env                          # Environment variables (not committed)
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google AI API key (get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd "Cover letter generator"
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google AI API key:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Usage

1. **Enter Job Description**: Paste the complete job description in the left panel's textarea.

2. **Upload Resume**:
   - Drag and drop a PDF file, or
   - Click the upload area to browse for a file
   - Only PDF files are supported

3. **Generate**: Click the "Generate Letter" button.

4. **Review**: Watch as your personalized cover letter streams in real-time on the right panel.

5. **Download**: Click "Download .DOCX" to save the letter to your computer.

## API Endpoint

### `POST /api/generate`

Generates a cover letter based on resume and job description.

**Request Body:**

```json
{
  "resume": "data:application/pdf;base64,...", // Base64-encoded PDF
  "jobDescription": "string" // Job description text
}
```

**Response:**

- Streams the generated cover letter as plain text
- Returns 400 if PDF parsing fails
- Returns 500 if AI generation fails

## Configuration

### Deployment Limits

**Vercel Free Tier:**

- 5,000 cover letters per day
- 100 GB bandwidth per month

**Gemini API Limits:**

- Gemini 2.5 Flash: 15 requests/min, 500 requests/day
- Gemini 2.5 Pro: 5 requests/min, 100 requests/day

## Key Components

### [`app/page.tsx`](app/page.tsx)

Main application component that orchestrates the cover letter generation flow using the `useCompletion` hook from `@ai-sdk/react`.

### [`app/components/LeftSide.tsx`](app/components/LeftSide.tsx)

Input panel featuring:

- Job description textarea
- PDF file upload with drag-and-drop support
- Form validation
- Loading states

### [`app/components/RightSide.tsx`](app/components/RightSide.tsx)

Output panel featuring:

- Real-time streaming display
- DOCX export functionality
- Empty state handling

### [`app/api/generate/route.ts`](app/api/generate/route.ts)

API route that:

- Parses PDF resumes using [`pdf-parse`](https://www.npmjs.com/package/pdf-parse)
- Constructs strategic prompts for Gemini
- Streams AI-generated responses
- Handles errors gracefully

## AI Prompt Strategy

The application uses a sophisticated system prompt that instructs Gemini to:

1. **Analyze** the job description to identify company values and key requirements
2. **Personalize** the opening with specific company details
3. **Connect** resume experience directly to job requirements with proof points
4. **Maintain** a professional, confident, and enthusiastic tone
5. **Format** according to standard business letter conventions
6. **Optimize** for a one-page, 300-400 word cover letter

## Customization

### Changing the AI Model

Edit [`app/api/generate/route.ts`](app/api/generate/route.ts):

```typescript
const result = await streamText({
  model: google("gemini-2.5-pro"), // Change to different Gemini model
  // ...
});
```

### Modifying the Prompt

Update the `system` and `prompt` parameters in [`app/api/generate/route.ts`](app/api/generate/route.ts) to adjust the cover letter style, tone, or structure.

### Styling

Tailwind CSS classes are used throughout. Modify components or [`app/globals.css`](app/globals.css) to change the appearance.

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project in [Vercel](https://vercel.com/new)

3. Add your environment variables in the Vercel dashboard

4. Deploy!

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Troubleshooting

### PDF Parsing Fails

- Ensure the PDF is text-based (not scanned images)
- Check that the PDF is not password-protected
- Verify the file is a valid PDF format

### API Rate Limits

- Monitor your Gemini API usage in [Google AI Studio](https://aistudio.google.com/)
- Consider implementing request throttling for production
- Upgrade to Gemini Pro for higher limits if needed

### Streaming Not Working

- Verify `streamProtocol: "text"` is set in the `useCompletion` hook
- Check browser console for errors
- Ensure your API key is valid and has quota remaining

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
