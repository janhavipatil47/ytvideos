import { Router } from 'express';
import { listBooks, getBook } from '../controllers/bookController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.get('/', requireAuth, listBooks);
router.get('/:id', requireAuth, getBook);
export default router;
