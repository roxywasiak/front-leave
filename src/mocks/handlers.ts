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
 
  rest.post('/api/login', async (req, res, ctx) => {
    try {
      const body = await req.json();
      const username = body.username;

      const user = users[username as keyof typeof users];

      if (!user) {
        return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
      }

      return res(
        ctx.status(200),
        ctx.delay(200),
        ctx.json({ token: user.token }) 
      );
    } catch (err) {
      console.error('Login handler error:', err);
      return res(ctx.status(500), ctx.json({ error: 'Handler failed' }));
    }
  }),

  rest.get('/api/me', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const user = Object.values(users).find((u) => u.token === token);

    if (!user) {
      return res(ctx.status(403), ctx.json({ error: 'Unauthorized' }));
    }

    return res(ctx.status(200), ctx.json(user));
  }),


  rest.get('/api/leave-requests', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(leaveRequests));
  }),

  
  rest.post('/api/leave-request', async (req, res, ctx) => {
    try {
      const newRequest = await req.json();
      newRequest.id = leaveRequests.length + 1;
      newRequest.status = 'Pending';
      leaveRequests.push(newRequest);

      return res(ctx.status(201), ctx.json(newRequest));
    } catch (error) {
      return res(ctx.status(500), ctx.json({ error: 'Failed to create leave request' }));
    }
  }),
];

export {};
