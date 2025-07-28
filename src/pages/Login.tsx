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
      const res = await axios.post('/api/login', { username });
      localStorage.setItem('token', res.data.token);
      onLogin(); 
    } catch {
      setError('Login failed. Please select a valid user.');
    }
  };
console.log('Login component rendered with username:', username);

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
export{};
