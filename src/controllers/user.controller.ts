import { IncomingMessage, ServerResponse } from 'http';
import { isValidUUID } from '../utils/validate';
import {
  getAllUsersService,
  getUserService,
  createUserService,
  deleteUserService,
  updateUserService,
} from '../services/user.service';

export const getUsers = (_req: IncomingMessage, res: ServerResponse) => {
  const users = getAllUsersService();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!isValidUUID(id)) {
    res.writeHead(400);
    return res.end(JSON.stringify({ message: 'Invalid UUID' }));
  }

  const user = getUserService(id);
  if (!user) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'User not found' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: 'Invalid user data' }));
      }

      const newUser = createUserService(username, age, hobbies);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  });
};

export const updateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!isValidUUID(id)) {
    res.writeHead(400);
    return res.end(JSON.stringify({ message: 'Invalid UUID' }));
  }

  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: 'Invalid user data' }));
      }

      const updatedUser = updateUserService(id, username, age, hobbies);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  });
};

export const deleteUser = (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!isValidUUID(id)) {
    res.writeHead(400);
    return res.end(JSON.stringify({ message: 'Invalid UUID' }));
  }

  const deletedUser = deleteUserService(id);
  if (!deletedUser) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'User not found' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(deletedUser));
};
