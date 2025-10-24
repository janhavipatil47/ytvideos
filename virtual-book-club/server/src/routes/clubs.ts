import { Router } from 'express';
import { listClubs, getClub } from '../controllers/clubController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.get('/', requireAuth, listClubs);
router.get('/:id', requireAuth, getClub);
export default router;
