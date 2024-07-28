import { Router } from 'express';

const router = Router();

// Home route
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Health Check
router.get('/health', (req, res) => {
  res.send('Server is healthy');
});

export default router;
