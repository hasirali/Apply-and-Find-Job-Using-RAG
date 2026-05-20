import { embeddings } from '../config/gemini.js';

export async function embedChunks(chunks) {

  console.log(`⏳ Embedding ${chunks.length} chunks one by one...`);

  const vectors = [];

  // Instead of embedDocuments (which has a bug with this version)
  // we embed each chunk individually using embedQuery
  for (let i = 0; i < chunks.length; i++) {
    const vector = await embeddings.embedQuery(chunks[i]);
    vectors.push(vector);
    console.log(`✅ Chunk ${i + 1}/${chunks.length} embedded — dimensions: ${vector.length}`);
  }

  console.log(`✅ All ${vectors.length} chunks embedded successfully`);

  return vectors;
}

export async function embedSingleText(text) {
  const vector = await embeddings.embedQuery(text);
  return vector;
}