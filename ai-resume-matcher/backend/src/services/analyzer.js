// Sends resume chunks to Gemini LLM for analysis
import { geminiModel } from '../config/gemini.js';
import { buildAnalysisPrompt } from '../utils/promptBuilder.js';

export async function analyzeResume(resumeChunks, jobDescription) {

  console.log('🤖 Starting Gemini analysis...');

  // Build the prompt
  const prompt = buildAnalysisPrompt(resumeChunks, jobDescription);

  // Send to Gemini
  const result = await geminiModel.generateContent(prompt);
  const responseText = result.response.text();

  console.log('✅ Gemini response received');
  console.log('Raw response:', responseText.substring(0, 200));

  // Parse JSON response
  try {
    // Clean response — remove any markdown backticks if present
    const cleanResponse = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const analysis = JSON.parse(cleanResponse);

    console.log('✅ Analysis parsed successfully');
    console.log('ATS Score:', analysis.atsScore);

    return analysis;

  } catch (error) {
    console.error('Failed to parse Gemini response:', responseText);
    throw new Error('Failed to parse AI response. Please try again.');
  }
}