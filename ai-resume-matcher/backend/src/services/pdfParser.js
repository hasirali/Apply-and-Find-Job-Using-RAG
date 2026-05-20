import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export async function extractTextFromPDF(filePath) {

  // Read the PDF file
  const fileBuffer = fs.readFileSync(filePath);

  // Load pdf-parse fresh each time (fixes ES module issues)
  const pdfParse = require('pdf-parse');

  // Extract text
  const pdfData = await pdfParse(fileBuffer);

  if (!pdfData.text || pdfData.text.trim().length === 0) {
    throw new Error('No text found in PDF.');
  }

  console.log(`✅ Extracted ${pdfData.text.length} characters from PDF`);
console.log('FULL TEXT:', pdfData.text);
  return pdfData.text;
}