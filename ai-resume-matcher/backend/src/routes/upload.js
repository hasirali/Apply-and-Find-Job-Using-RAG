import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { extractTextFromPDF } from '../services/pdfParser.js';

const router = Router();

// Create uploads folder if it doesn't exist
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
    console.log('File received:', req.file);

    // Step 1 — check file exists
    if (!req.file) {
      return res.status(400).json({ error: 'No file received' });
    }

    // Step 2 — extract text from the PDF
    const extractedText = await extractTextFromPDF(req.file.path);

    // Step 3 — send back success with text preview
    res.json({
      success: true,
      message: 'Resume uploaded and text extracted!',
      filename: req.file.filename,
      characterCount: extractedText.length,
      // Show first 300 characters as preview
      textPreview: extractedText.substring(0, 300)
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;