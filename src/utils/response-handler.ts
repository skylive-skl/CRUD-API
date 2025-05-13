import { ServerResponse } from 'http';

export const sendJson = <T>(
  res: ServerResponse,
  statusCode: number = 200,
  data: T,
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const sendEmpty = (res: ServerResponse, statusCode: number = 204) => {
  res.writeHead(statusCode);
  res.end();
};
