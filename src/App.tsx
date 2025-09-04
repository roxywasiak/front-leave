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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Welcome, {user.name} ({user.role})
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {(user.role === 'staff' || user.role === 'manager') && (
        <div className="mb-6">
          <LeaveRequests />
        </div>
      )}

      {user.role === 'staff' && (
        <div>
          <NewLeaveRequest />
        </div>
      )}

      {user.role === 'admin' && (
        <div className="text-center text-gray-600 mt-10">
          <p>This is the Admin Dashboard. (Feature coming soon)</p>
        </div>
      )}
    </div>
  </div>
);
};
export default App;
