import { IncomingMessage, ServerResponse } from 'http';

export const userRouter = (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/');
  const method = req.method;

  if (urlParts?.[1] === 'api' && urlParts[2] === 'users') {
    const id = urlParts[3];

    if (method === 'GET' && !id) return res.end('Get all users');
    if (method === 'GET' && id) return res.end(`Get user with id: ${id}`);
    if (method === 'POST') return res.end('Create user');
    if (method === 'PUT' && id) return res.end(`Update user with id: ${id}`);
    if (method === 'DELETE' && id) return res.end(`Delete user with id: ${id}`);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Route not found' }));
};
