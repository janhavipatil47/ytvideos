import { FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Register failed');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full mt-16 card">
      <h1 className="font-serif text-2xl mb-4">Create your account</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded-2xl px-3 py-2 bg-white/70 dark:bg-gray-800/70" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded-2xl px-3 py-2 bg-white/70 dark:bg-gray-800/70" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-2xl px-3 py-2 bg-white/70 dark:bg-gray-800/70" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn w-full" type="submit">Register</button>
      </form>
      <p className="mt-3 text-sm opacity-80">Have an account? <Link className="underline" to="/login">Login</Link></p>
    </div>
  );
}
