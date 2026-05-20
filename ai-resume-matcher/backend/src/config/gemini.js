// Gemini client will be configured here
// src/config/gemini.js
// This file sets up our Gemini clients
// We export them so any file can use them

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

// Embedding model — converts text to vectors
// text-embedding-004 is Google's latest free embedding model
export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'text-embedding-004'
});

// Chat model — for AI analysis later (Step 8)
// gemini-1.5-flash is free and fast
export const geminiModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'gemini-1.5-flash',
  temperature: 0.3
});

console.log('✅ Gemini clients initialized');