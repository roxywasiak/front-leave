const users = {
  staff: { id: 101, name: 'Alice', role: 'staff' as const, token: 'staff-token' },
  manager: { id: 201, name: 'Bob', role: 'manager' as const, token: 'manager-token' },
  admin: { id: 301, name: 'Eve', role: 'admin' as const, token: 'admin-token' },
};

let leaveRequests = [
  { id: 1, staffId: 101, status: 'Pending', days: 3 },
  { id: 2, staffId: 101, status: 'Approved', days: 5 },
];

export const mockApi = {
  login: (username: string) => {
    const user = users[username as keyof typeof users];
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return { token: user.token };
  },

  getMe: (token: string) => {
    const user = Object.values(users).find((u) => u.token === token);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  },

  getLeaveRequests: () => {
    return leaveRequests;
  },

  createLeaveRequest: (request: { staffId: number; days: number }) => {
    const newRequest = {
      ...request,
      id: leaveRequests.length + 1,
      status: 'Pending',
    };
    leaveRequests.push(newRequest);
    return newRequest;
  },
};