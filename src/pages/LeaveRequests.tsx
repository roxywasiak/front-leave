import { useEffect, useState } from 'react';
import { mockApi } from '../services/mockApi';

type LeaveRequest = {
  id: number;
  staffId: number;
  status: string;
  days: number;
};

type user = {
  id: number;
  name: string;
  role: 'staff' | 'manager' | 'admin';
};

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [user, setUser] = useState<user | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const userData = mockApi.getMe(token);
      setUser(userData);
      
      const requests = mockApi.getLeaveRequests();
      setLeaveRequests(requests);
    } catch {
      setError('Failed to load data.');
    }
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading user...</p>;

  const visibleRequests = user.role === 'staff'
    ? leaveRequests.filter(r => r.staffId === user.id)
    : leaveRequests;

 return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Staff ID</th>
            <th className="py-2 px-4 border">Days</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {visibleRequests.map((req) => (
            <tr key={req.id} className="bg-white hover:bg-gray-100">
              <td className="py-2 px-4 border">{req.id}</td>
              <td className="py-2 px-4 border">{req.staffId}</td>
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