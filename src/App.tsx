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
    <div>
      <h1>Welcome, {user.name} ({user.role})</h1>
      <LeaveRequests/>
      <NewLeaveRequest/>
    </div>
  );
}

export default App;

