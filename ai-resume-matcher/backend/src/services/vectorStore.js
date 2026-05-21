import pkg from 'faiss-node';
const { IndexFlatL2 } = pkg;
import fs from 'fs';

const CHUNKS_FILE = 'data/chunks.json';
const VECTORS_FILE = 'data/vectors.json';

// Create data folder if it doesn't exist
if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

export async function storeVectors(chunks, vectors) {

  console.log('⏳ Storing vectors to disk...');

  // Save chunks to disk
  fs.writeFileSync(CHUNKS_FILE, JSON.stringify(chunks));

  // Save vectors to disk
  fs.writeFileSync(VECTORS_FILE, JSON.stringify(vectors));

  console.log('✅ Chunks saved:', chunks.length);
  console.log('✅ Vectors saved:', vectors.length);

  return { stored: chunks.length };
}

export async function searchSimilarChunks(queryVector, topK = 3) {

  console.log('🔍 Searching FAISS...');

  // Check files exist
  if (!fs.existsSync(CHUNKS_FILE) || !fs.existsSync(VECTORS_FILE)) {
    throw new Error('No vectors stored. Please upload a resume first.');
  }

  // Load from disk
  const chunks = JSON.parse(fs.readFileSync(CHUNKS_FILE));
  const vectors = JSON.parse(fs.readFileSync(VECTORS_FILE));

  console.log('✅ Loaded chunks:', chunks.length);
  console.log('✅ Loaded vectors:', vectors.length);

  // Rebuild FAISS index
  const dimension = vectors[0].length;
  const index = new IndexFlatL2(dimension);

  const normalVectors = vectors.map(v => Array.from(v));
  const flatVectors = [].concat(...normalVectors);
  index.add(flatVectors);

  console.log('✅ FAISS rebuilt, ntotal:', index.ntotal());

  // Search
  const queryArray = Array.from(queryVector);
  const result = index.search(queryArray, topK);
  const matchedChunks = result.labels.map(label => chunks[label]);

  console.log(`✅ Found ${matchedChunks.length} similar chunks`);

  return matchedChunks;
}

export function getIndexStatus() {
  if (fs.existsSync(CHUNKS_FILE) && fs.existsSync(VECTORS_FILE)) {
    const chunks = JSON.parse(fs.readFileSync(CHUNKS_FILE));
    return {
      indexExists: true,
      chunksCount: chunks.length
    };
  }
  return {
    indexExists: false,
    chunksCount: 0
  };
}