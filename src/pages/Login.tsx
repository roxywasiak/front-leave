import React, { useState } from 'react';
import axios from 'axios';

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
      console.log('Sending login request for:', username);

      const res = await axios.post('/api/login', { username });

      console.log('Login response:', res.data);

      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Login failed. Please select a valid user.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7f7f7',
    }}>
      <form onSubmit={handleSubmit} style={{
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '300px',
        textAlign: 'center',
      }}>
        <h2>Login</h2>
        <select
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        >
          <option value="">-- Select user --</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
