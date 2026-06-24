import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', { email, username, password });
      login(res.data.token);
      navigate('/');
    } catch {
      setError('Registracija neuspješna. Email možda već postoji.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">Kreiraj nalog</h1>
        <p className="text-gray-400 mb-6">Počni pratiti svoje navike danas</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="test@test.com"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Korisničko ime</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="korisnik123"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Registracija...' : 'Registruj se'}
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Već imaš nalog?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Prijavi se
          </Link>
        </p>
      </div>
    </div>
  );
}