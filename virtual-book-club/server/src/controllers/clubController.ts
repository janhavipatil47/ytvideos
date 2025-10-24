import { Request, Response } from 'express';
import Club from '../models/Club.js';

export async function listClubs(_req: Request, res: Response) {
  const clubs = await Club.find().limit(50);
  res.json(clubs);
}

export async function getClub(req: Request, res: Response) {
  const club = await Club.findById(req.params.id).populate('members');
  if (!club) return res.status(404).json({ message: 'Not found' });
  res.json(club);
}
