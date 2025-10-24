import { Request, Response } from 'express';
import Book from '../models/Book.js';

export async function listBooks(_req: Request, res: Response) {
  const books = await Book.find().limit(50);
  res.json(books);
}

export async function getBook(req: Request, res: Response) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
}
