import { IncomingMessage, ServerResponse } from 'http';
import { isValidUUID } from '../utils/validate';
import {
  getAllUsersService,
  getUserService,
  createUserService,
  deleteUserService,
  updateUserService,
} from '../services/user.service';
import { handleError } from '../utils/error-handler';
import { sendEmpty, sendJson } from '../utils/response-handler';

export const getUsers = (_req: IncomingMessage, res: ServerResponse) => {
  const users = getAllUsersService();
  sendJson(res, 200, users);
};

export const getUserById = (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!isValidUUID(id)) {
    return handleError(res, 400, 'Invalid UUID');
  }

  const user = getUserService(id);
  if (!user) {
    return handleError(res, 404, 'User not found');
  }

  sendJson(res, 200, user);
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        return handleError(res, 400, 'Invalid user data');
      }

      const newUser = createUserService(username, age, hobbies);
      sendJson(res, 201, newUser);
    } catch (err) {
      handleError(res, 500, 'Server error');
    }
  });
};

export const updateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!isValidUUID(id)) {
    return handleError(res, 400, 'Invalid UUID');
  }

  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        return handleError(res, 400, 'Invalid user data');
      }

      const updatedUser = updateUserService(id, username, age, hobbies);
      if (!updatedUser) {
        return handleError(res, 404, 'User not found');
      }
      sendJson(res, 200, updatedUser);
    } catch (err) {
      handleError(res, 500, 'Server error');
    }
  });
};

export const deleteUser = (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (!isValidUUID(id)) {
    return handleError(res, 400, 'Invalid UUID');
  }

  const deletedUser = deleteUserService(id);
  if (!deletedUser) {
    return handleError(res, 404, 'User not found');
  }
  sendEmpty(res);
};
