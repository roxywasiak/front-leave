import { useEffect, useState } from 'react';
import axios from 'axios';

type LeaveRequest = {
  id: number;
  staffId: number;
  status: string;
  days: number;
};

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('/api/leave-requests', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setLeaveRequests(res.data))
    .catch(() => setError('Failed to load leave requests.'));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Leave Requests</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Staff ID</th>
            <th>Status</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.staffId}</td>
              <td>{req.status}</td>
              <td>{req.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;