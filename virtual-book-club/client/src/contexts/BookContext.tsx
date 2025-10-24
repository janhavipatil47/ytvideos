import { createContext, useContext, useMemo, useState } from 'react';
import axios from 'axios';

export interface Book {
  _id: string;
  title: string;
  author: string;
  totalPages: number;
  coverImage?: string;
  metadata?: Record<string, unknown>;
}

interface BookContextValue {
  books: Book[];
  fetchBooks: () => Promise<void>;
}

const BookContext = createContext<BookContextValue | undefined>(undefined);
const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const res = await axios.get(`${API_BASE}/api/books`);
    setBooks(res.data);
  };

  const value = useMemo(() => ({ books, fetchBooks }), [books]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks must be used within BookProvider');
  return ctx;
}
