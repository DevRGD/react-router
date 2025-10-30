import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      login(response.data.data);
      navigate('/todos');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-[#CA4246]">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          // --- THIS IS THE FIX ---
          onChange={(e) => setEmail(e.target.value)}
          // --- END FIX ---
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-[#CA4246] text-white rounded hover:bg-red-700 transition">
        Login
      </button>
    </form>
  );
}
