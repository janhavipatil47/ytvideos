import { Link } from 'react-router-dom';

export default function BookCard({ id, title, author, coverImage }: { id: string; title: string; author: string; coverImage?: string; }) {
  return (
    <Link to={`/book/${id}`} className="card flex gap-4 hover:shadow-lg transition">
      <img src={coverImage || 'https://placehold.co/80x120'} alt="cover" className="w-20 h-28 object-cover rounded-xl" />
      <div>
        <h3 className="font-serif text-xl">{title}</h3>
        <p className="opacity-80">{author}</p>
      </div>
    </Link>
  );
}
