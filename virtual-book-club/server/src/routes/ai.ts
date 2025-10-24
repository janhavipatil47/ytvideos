import { Router } from 'express';
import { generateQuestions } from '../controllers/aiController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/questions', requireAuth, generateQuestions);
export default router;
