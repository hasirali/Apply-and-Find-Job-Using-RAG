import { Router } from 'express';
import { embedSingleText } from '../services/embedder.js';
import { searchSimilarChunks, getIndexStatus } from '../services/vectorStore.js';
import { analyzeResume } from '../services/analyzer.js';

const router = Router();

// DEBUG route
router.get('/status', (req, res) => {
  const status = getIndexStatus();
  res.json(status);
});

// Main analyze route
router.post('/', async function (req, res) {
  try {

    const { jobDescription } = req.body;

    // Validate
    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a job description' });
    }

    if (jobDescription.trim().length < 50) {
      return res.status(400).json({ error: 'Job description is too short.' });
    }

    console.log('📝 Job description received');

    // Step 1 — embed job description
    const queryVector = await embedSingleText(jobDescription);
    console.log('✅ Job description embedded');

    // Step 2 — find similar resume chunks
    const matchedChunks = await searchSimilarChunks(queryVector, 3);
    console.log('✅ Similar chunks found');

    // Step 3 — analyze with Gemini
    const analysis = await analyzeResume(matchedChunks, jobDescription);
    console.log('✅ Analysis complete');

    // Step 4 — return full response
    res.json({
      success: true,
      message: 'Resume analyzed successfully!',
      analysis: analysis
    });

  } catch (error) {
    console.error('Analyze error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;