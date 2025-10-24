import { Request, Response } from 'express';

export async function generateQuestions(req: Request, res: Response) {
  const { bookTitle, author, progress } = req.body || {};
  const pct = Math.min(100, Math.max(0, Number(progress ?? 0)));
  const questions = [
    `How does ${author ? author + "'s" : 'the author\'s'} style shape your perception of ${bookTitle || 'the book'} so far?`,
    `At ~${pct}% progress, which theme stands out the most and why?`,
    `Pick a character whose arc shifted recently. What triggered it?`,
    `What details might be foreshadowing a later reveal?`,
    `If you could ask the protagonist one question now, what would it be?`
  ];
  res.json({ questions });
}
