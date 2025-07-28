import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';

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
  rest.post('/api/login', async (req:RestRequest, res:ResponseComposition, ctx:RestContext) => {
    const { username } = await req.json();
    const user = users[username as keyof typeof users];
    return user
      ? res(ctx.status(200), ctx.json({ token: user.token }))
      : res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
  }),

  rest.post('/api/login', async (req:RestRequest, res:ResponseComposition, ctx:RestContext) => {
    const { username } = await req.json();
    const user = users[username as keyof typeof users];
    return user
      ? res(ctx.status(200), ctx.json({ token: user.token }))
      : res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
  }),

  rest.get('/api/me', (req:RestRequest, res:ResponseComposition, ctx:RestContext) => {
    const token = req.headers.get('Authorisation')?.split(' ')[1];
    const user = Object.values(users).find(u => u.token === token);
    return user
      ? res(ctx.status(200), ctx.json(user))
      : res(ctx.status(403), ctx.json({ error: 'Unauthorised' }));
  }),

  rest.get('/api/leave-requests', (req:RestRequest, res:ResponseComposition, ctx:RestContext) => {
    return res(ctx.status(200), ctx.json(leaveRequests));
  }),

  rest.post('/api/leave-request', async (req:RestRequest, res:ResponseComposition, ctx:RestContext) => {
    const newRequest = await req.json();
    newRequest.id = leaveRequests.length + 1;
    newRequest.status = 'Pending';
    leaveRequests.push(newRequest);
    return res(ctx.status(201), ctx.json(newRequest));
  }),
];
export{};
