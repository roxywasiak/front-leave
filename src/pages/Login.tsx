import { useState } from 'react';
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
      console.log("Sending login request for:", username);
      const res = await axios.post('/api/login', { username }, { transformResponse: r => r });
      console.log("Login response:", res.data);

      localStorage.setItem('token', res.data.token); 
      onLogin(); 
    } catch (err) {
      console.error("Login error:", err);
      setError('Login failed. Please select a valid user.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Select Role:</label>
        <select
          id="user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        >
          <option value="">-- Choose a user --</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={{ display: 'block', marginTop: '1rem' }}>
          Login
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
