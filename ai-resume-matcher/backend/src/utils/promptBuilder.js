// Builds structured prompts for Gemini LLM
// This file builds the prompt we send to Gemini
// A good prompt = good results

export function buildAnalysisPrompt(resumeChunks, jobDescription) {

  // Combine all matched chunks into one string
  const resumeContext = resumeChunks.join('\n\n');

  // This is the prompt we send to Gemini
  // We ask it to return ONLY JSON so we can parse it easily
  const prompt = `
You are an expert ATS (Applicant Tracking System) and resume analyzer.

Analyze the following resume content against the job description and provide a detailed analysis.

RESUME CONTENT:
${resumeContext}

JOB DESCRIPTION:
${jobDescription}

Analyze the resume against the job description and return ONLY a valid JSON object with this exact structure (no extra text, no markdown, no backticks):
{
  "atsScore": <number between 0-100>,
  "matchedSkills": [<list of skills found in both resume and job description>],
  "missingSkills": [<list of skills required in job but missing from resume>],
  "strengths": [<list of candidate strengths relevant to this job>],
  "weaknesses": [<list of areas where candidate is weak for this job>],
  "suggestions": [<list of specific suggestions to improve the resume for this job>],
  "summary": "<2-3 sentence overall summary of the candidate's fit for this role>"
}

Rules:
- ATS score should reflect how well the resume matches the job description
- Be specific and helpful in suggestions
- Return ONLY the JSON object, nothing else
`;

  return prompt;
}