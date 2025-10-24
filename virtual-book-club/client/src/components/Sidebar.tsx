import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 space-y-3">
      <div className="card">
        <h2 className="font-serif text-lg mb-2">Navigation</h2>
        <nav className="grid gap-2">
          <Link className="btn" to="/">Dashboard</Link>
          <Link className="btn" to="/profile">Profile</Link>
        </nav>
      </div>
      <div className="card">
        <h2 className="font-serif text-lg mb-2">Clubs</h2>
        <div className="grid gap-2">
          <Link className="btn" to="/club/1">Fiction Fridays</Link>
          <Link className="btn" to="/club/2">Sci-Fi Saturdays</Link>
        </div>
      </div>
    </aside>
  );
}
