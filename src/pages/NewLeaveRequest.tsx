import { useState } from 'react';
import axios from 'axios';

const NewLeaveRequest = () => {
  const [days, setDays] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
try {
  const token = localStorage.getItem('token');
  if (!token) {
    setMessage('User not logged in.');
    return;
  }

  const res = await axios.post(
    '/api/leave-request',
    { staffId: 101, days: parseInt(days, 10) }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  setMessage(`Leave request submitted (ID: ${res.data.id})`);
  setDays(''); 
} catch (err) {
  console.error(err);
  setMessage('Failed to submit leave request.');
}
  };

  return (
    <div style={{ padding: '1rem', marginTop: '2rem' }}>
      <h3>Submit a New Leave Request</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Days:
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            min={1}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '1rem' }}>
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewLeaveRequest;
