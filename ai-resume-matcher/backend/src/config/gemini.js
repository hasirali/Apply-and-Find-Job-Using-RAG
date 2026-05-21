import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'YES ✅' : 'NO ❌');

// Embedding model — for converting text to vectors
export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'models/gemini-embedding-001'
});

// Gemini LLM — for analysis
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const geminiModel = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash' 
});

console.log('✅ Gemini clients initialized');