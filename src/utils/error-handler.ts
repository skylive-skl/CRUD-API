import { ServerResponse } from 'http';

export const handleError = (
  res: ServerResponse,
  statusCode = 500,
  message = 'Internal Server Error',
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
};
