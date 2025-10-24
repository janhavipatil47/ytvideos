import { Router } from 'express';
import { listDiscussions, postMessage } from '../controllers/discussionController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.get('/:clubId', requireAuth, listDiscussions);
router.post('/:clubId', requireAuth, requireRole(['member', 'moderator', 'admin']), postMessage);
export default router;
