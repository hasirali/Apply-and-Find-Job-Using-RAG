// Generates Gemini embeddings for text chunks
// src/services/embedder.js
// Takes an array of chunks and returns an array of vectors

import { embeddings } from '../config/gemini.js';

export async function embedChunks(chunks) {

  console.log(`⏳ Embedding ${chunks.length} chunks...`);

  // embedDocuments takes array of strings
  // returns array of vectors (one vector per chunk)
  const vectors = await embeddings.embedDocuments(chunks);

  console.log(`✅ Generated ${vectors.length} embeddings`);
  console.log(`✅ Each vector has ${vectors[0].length} dimensions`);

  return vectors;
}

// Embed a single text (we'll use this for job description later)
export async function embedSingleText(text) {

  console.log('⏳ Embedding single text...');

  // embedQuery is for single text embedding
  const vector = await embeddings.embedQuery(text);

  console.log(`✅ Single text embedded (${vector.length} dimensions)`);

  return vector;
}