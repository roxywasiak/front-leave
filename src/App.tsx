import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import LeaveRequests from './pages/LeaveRequests';
import NewLeaveRequest from './pages/NewLeaveRequest';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
  }, []);

  if (!user) {
    return <Login onLogin={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          Welcome, {user.name} ({user.role})
        </h1>

        {/* Leave Requests Table */}
        <div className="mb-6">
          <LeaveRequests />
        </div>

        {/* New Leave Request Form */}
        <div>
          <NewLeaveRequest />
        </div>
      </div>
    </div>
  );
}

export default App;


