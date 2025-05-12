import { createServer } from 'http';
import { config } from 'dotenv';
import { DEFAULT_PORT } from './constants';

import { userRouter } from './routes/user.routes';
import { handleError } from './utils/error-handler';

config();

const PORT = process.env.PORT || DEFAULT_PORT;
const server = createServer((req, res) => {
  try {
    userRouter(req, res);
  } catch (error) {
    handleError(res);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
