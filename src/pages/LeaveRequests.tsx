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
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Days</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req) => (
            <tr key={req.id} className="bg-white hover:bg-gray-100">
              <td className="py-2 px-4 border">{req.id}</td>
              <td className="py-2 px-4 border">{req.days}</td>
              <td className="py-2 px-4 border">{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;