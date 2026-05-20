import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { extractTextFromPDF } from '../services/pdfParser.js';
import { chunkResumeText } from '../services/chunker.js';
import { embedChunks } from '../services/embedder.js';

const router = Router();

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), async function (req, res) {
  try {

    // Step 1 — check file exists
    if (!req.file) {
      return res.status(400).json({ error: 'No file received' });
    }

    // Step 2 — extract text from PDF
    const extractedText = await extractTextFromPDF(req.file.path);

    // Step 3 — split text into chunks
    const chunks = await chunkResumeText(extractedText);

    // Step 4 — embed chunks using Gemini
    const vectors = await embedChunks(chunks);

    // Step 5 — send back response with everything
    res.json({
      success: true,
      message: 'Resume uploaded, chunked and embedded!',
      filename: req.file.filename,

      // From Step 3
      characterCount: extractedText.length,

      // From Step 4
      totalChunks: chunks.length,
      chunksPreview: chunks.slice(0, 2),

      // From Step 5
      totalVectors: vectors.length,
      vectorDimensions: vectors[0] ? vectors[0].length : 0,
      sampleVector: vectors[0] ? vectors[0].slice(0, 5) : []
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;