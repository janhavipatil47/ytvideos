import { useEffect } from 'react';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';

export default function DashboardPage() {
  const { books, fetchBooks } = useBooks();
  useEffect(() => { fetchBooks(); }, []);
  return (
    <div className="space-y-4 w-full">
      <div className="card">
        <h1 className="font-serif text-2xl">Your Dashboard</h1>
        <p className="opacity-80">Track reading, join clubs, and discuss live.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((b) => (
          <BookCard key={b._id} id={b._id} title={b.title} author={b.author} coverImage={b.coverImage} />
        ))}
      </div>
    </div>
  );
}
