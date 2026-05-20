import pkg from 'faiss-node';
const { IndexFlatL2 } = pkg;
import fs from 'fs';

let index = null;
let storedChunks = [];

const CHUNKS_FILE = 'uploads/chunks.json';

export async function storeVectors(chunks, vectors) {

  console.log('⏳ Storing vectors in FAISS...');
  console.log('Vector type check:', typeof vectors[0], Array.isArray(vectors[0]));
  console.log('First vector length:', vectors[0].length);

  // Vector dimension size
  const dimension = vectors[0].length;

  // Create new FAISS index
  index = new IndexFlatL2(dimension);

  // Convert each vector to a regular array first
  const normalVectors = vectors.map(v => Array.from(v));

  // Flatten all vectors into one single array
  const flatVectors = [].concat(...normalVectors);

  console.log('Flat vectors length:', flatVectors.length);
  console.log('Expected:', chunks.length * dimension);

  // Add to FAISS
  index.add(flatVectors);

  // Save chunks
  storedChunks = chunks;
  fs.writeFileSync(CHUNKS_FILE, JSON.stringify(chunks));

  console.log(`✅ Stored ${chunks.length} vectors in FAISS`);

  return { stored: chunks.length };
}

export async function searchSimilarChunks(queryVector, topK = 3) {

  console.log('🔍 Searching FAISS...');

  // Load chunks from file if not in memory
  if (storedChunks.length === 0 && fs.existsSync(CHUNKS_FILE)) {
    storedChunks = JSON.parse(fs.readFileSync(CHUNKS_FILE));
  }

  if (!index) {
    throw new Error('No vectors stored. Please upload a resume first.');
  }

  // Convert query vector to regular array
  const queryArray = Array.from(queryVector);

  // Search FAISS
  const result = index.search(queryArray, topK);

  // Get matching chunks by index
  const matchedChunks = result.labels.map(label => storedChunks[label]);

  console.log(`✅ Found ${matchedChunks.length} similar chunks`);

  return matchedChunks;
}