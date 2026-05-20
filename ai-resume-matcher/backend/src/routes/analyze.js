import { Router } from 'express';

const router = Router();

// Test route for analyze API.
router.get('/test', async (req, res) => {
  res.status(200).json({ message: 'Analyze route working' });
});

export default router;
