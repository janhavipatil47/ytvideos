import { Request, Response } from 'express';
import Discussion from '../models/Discussion.js';

export async function listDiscussions(req: Request, res: Response) {
  const { clubId } = req.params;
  const messages = await Discussion.find({ clubId }).sort({ timestamp: 1 }).limit(200);
  res.json(messages);
}

export async function postMessage(req: Request & { user?: any }, res: Response) {
  const { clubId } = req.params;
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Missing message' });
  const saved = await Discussion.create({ clubId, userId: req.user!.id, message });
  res.status(201).json(saved);
}
