# Architecture Overview

Even without a database, your app will follow a simple Request-Response flow:

1. UI: User pastes the Job Description and their Resume text.

2. Request: The frontend sends these two strings to your backend endpoint.

3. Processing: Your backend constructs a prompt: "Write a professional cover letter based on this resume [RESUME] for this job [JD]..."

4. Gemini API: Your backend sends the prompt to Gemini and waits for the text.

5. Output: The backend sends the text back to the UI for the user to copy.


### Limit for Vercel
1. 5000 cover letter per day
2. 100 GB bandwidth per month


### Limit for Google AI SDK and Gemini API
1. Gemini 2.5 Flash: 15 requests per minute and 500 requests per day
2. Gemini 2.5 Pro: 5 requests per minute and 100 requests per day
