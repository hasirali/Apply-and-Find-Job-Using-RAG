// src/routes/upload.js
// Handles the PDF upload HTTP request

import { Router } from 'express';
import { upload } from '../utils/fileHelper.js';

const router = Router();

// POST /api/upload
// Expects a multipart/form-data request with a 'resume' field
router.post('/', upload.single('resume'), (req, res) => {
  try {
    // If no file was attached
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // req.file is populated by multer with file details
    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: req.file.path
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Keep test route
router.get('/test', (req, res) => {
  res.json({ message: 'Upload route working ✅' });
});

export default router;