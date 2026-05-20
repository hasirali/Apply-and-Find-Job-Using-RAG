import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'YES ✅' : 'NO ❌');

// Embedding model only for now
// We will add chat model in Step 8
export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'models/gemini-embedding-001'
});

console.log('✅ Gemini embeddings initialized');