import { Router } from 'express';
import { upload } from '../utils/fileHelper.js';

const router = Router();

// This runs when someone sends a POST request to /api/upload
router.post('/', upload.single('resume'), function (req, res) {

  // If no file was sent
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a PDF file' });
  }

  // If file was received successfully
  res.json({
    success: true,
    message: 'File uploaded successfully!',
    filename: req.file.filename
  });

});

export default router;