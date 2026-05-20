// Splits resume text into overlapping chunks
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

// This function takes full resume text and splits it into chunks
export async function chunkResumeText(fullText) {

  // RecursiveCharacterTextSplitter is the most popular splitter
  // It tries to split at paragraphs first, then sentences, then words
  const splitter = new RecursiveCharacterTextSplitter({

    // Each chunk will be max 500 characters
    chunkSize: 500,

    // Chunks will overlap by 100 characters
    // So important info at edges is not lost
    chunkOverlap: 100,

    // Split at these characters in this order:
    // First try paragraph breaks, then newlines, then spaces
    separators: ['\n\n', '\n', ' ', '']
  });

  // Split the text into chunks
  // Returns array of strings
  const chunks = await splitter.splitText(fullText);

  // Basic check
  if (!chunks || chunks.length === 0) {
    throw new Error('Could not split resume text into chunks');
  }

  console.log(`✅ Resume split into ${chunks.length} chunks`);
  console.log(`✅ Average chunk size: ${Math.round(fullText.length / chunks.length)} characters`);
  console.log(`✅ Resume split into ${chunks.length} chunks`);

  // 👇 ADD THIS — prints every chunk in terminal
  chunks.forEach((chunk, index) => {
    console.log(`\n--- CHUNK ${index + 1} ---`);
    console.log(chunk);
  });

  return chunks;
}