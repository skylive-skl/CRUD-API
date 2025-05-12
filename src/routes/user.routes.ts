import { IncomingMessage, ServerResponse } from 'http';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { handleError } from '@/utils/error-handler';

export const userRouter = (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/');
  const method = req.method;

  if (urlParts?.[1] === 'api' && urlParts[2] === 'users') {
    const id = urlParts[3];

    if (method === 'GET' && !id) return getUsers(req, res);
    if (method === 'GET' && id) return getUserById(req, res, id);
    if (method === 'POST') return createUser(req, res);
    if (method === 'PUT' && id) return updateUser(req, res, id);
    if (method === 'DELETE' && id) return deleteUser(req, res, id);
  }
  handleError(res, 404, 'Not Found');
};
