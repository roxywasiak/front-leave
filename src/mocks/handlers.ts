import { rest } from 'msw';

let leaveRequests = [
  { id: 1, staffId: 101, status: 'Pending', days: 3 },
  { id: 2, staffId: 101, status: 'Approved', days: 5 },
];

const users = {
  staff: { id: 101, name: 'Alice', role: 'staff', token: 'staff-token' },
  manager: { id: 201, name: 'Bob', role: 'manager', token: 'manager-token' },
  admin: { id: 301, name: 'Eve', role: 'admin', token: 'admin-token' },
};

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    const username = (req.body as any)?.username;
    console.log('Login attempt for user:', username);
    const user = users[username as keyof typeof users];
    console.log('User found:', user);
    
    if (!user) {
      return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
    }

    return res(ctx.json({ token: user.token }));
  }),

  rest.get('/api/me', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const user = Object.values(users).find((u) => u.token === token);

    if (!user) {
      return res(ctx.status(403), ctx.json({ error: 'Unauthorized' }));
    }

    return res(ctx.json(user));
  }),

  rest.get('/api/leave-requests', (req, res, ctx) => {
    return res(ctx.json(leaveRequests));
  }),

  rest.post('/api/leave-request', (req, res, ctx) => {
    const newRequest = req.body as any;
    newRequest.id = leaveRequests.length + 1;
    newRequest.status = 'Pending';
    leaveRequests.push(newRequest);

    return res(ctx.status(201), ctx.json(newRequest));
  }),
];

export {};


