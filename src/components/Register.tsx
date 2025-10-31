import { useState, useEffect } from 'react';
import { useNavigate, Form, useActionData } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();
  const actionData = useActionData() as any;

  const error = actionData?.error ? actionData.error : null;

  useEffect(() => {
    if (actionData && !actionData.error) {
      login(actionData);
      navigate('/todos');
    }
  }, [actionData, login, navigate]);

  return (
    <Form method="post" className="space-y-4">
      <h2 className="text-2xl font-bold text-[#CA4246]">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-[#CA4246] text-white rounded hover:bg-red-700 transition">
        Register
      </button>
    </Form>
  );
}
