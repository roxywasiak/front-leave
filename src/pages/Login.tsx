import React, { useState } from 'react';
import { mockApi } from '../services/mockApi';

type Props = {
  onLogin: () => void;
};

const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { token } = mockApi.login(username);
      localStorage.setItem('token', token);
      onLogin();
    } catch (err: any) {
      console.error('Login request failed:', err);
      setError('Login failed. Please select a valid user.');
    }
  };

return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <select
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded mb-4"
        >
          <option value="">-- Select a user --</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};


export default Login;
