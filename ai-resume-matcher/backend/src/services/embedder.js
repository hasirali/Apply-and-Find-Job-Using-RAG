import { embeddings } from '../config/gemini.js';

export async function embedChunks(chunks) {

  console.log(`⏳ Embedding ${chunks.length} chunks one by one...`);

  const vectors = [];

  for (let i = 0; i < chunks.length; i++) {
    const vector = await embeddings.embedQuery(chunks[i]);
    vectors.push(vector);
    console.log(`✅ Chunk ${i + 1}/${chunks.length} embedded`);
  }

  console.log(`✅ All ${vectors.length} chunks embedded`);

  return vectors;
}

// Embed a single text — used for job description
export async function embedSingleText(text) {

  console.log('⏳ Embedding job description...');

  const vector = await embeddings.embedQuery(text);

  console.log(`✅ Job description embedded (${vector.length} dimensions)`);

  return vector;
}