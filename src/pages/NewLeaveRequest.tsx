import { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';

const NewLeaveRequest = () => {
  const [days, setDays] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<{ id: number; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const userData = mockApi.getMe(token);
      setUser(userData);
    } catch {
      setUser(null);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage('User not logged in.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const data = mockApi.createLeaveRequest({
        staffId: user.id,
        days: parseInt(days, 10),
      });
      setMessage(`Leave request submitted (ID: ${data.id})`);
      setDays('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit leave request.');
    }
  };

  if (!user || user.role !== 'staff') {
    return null; 
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Submit New Leave Request</h3>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="number"
          min={1}
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
          placeholder="Number of days"
          className="border px-3 py-2 rounded w-48"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-blue-600">{message}</p>}
    </div>
  );
};

export default NewLeaveRequest;
