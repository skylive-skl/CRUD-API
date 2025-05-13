import http from 'http';
import { userRouter } from '../routes/user.routes';
import { handleError } from '../utils/error-handler';
import { config } from 'dotenv';

config();

export const createWorkerServer = (port: number) => {
  const server = http.createServer((req, res) => {
    try {
      console.log(
        `Worker handling request: ${req.method} ${req.url} on port ${port}`,
      );

      // if (req.url === '/kill') {
      //   console.log(process.env.PORT);
      //   process.exit(process.env.PORT);
      // } else {
      //   console.log(process.pid);
      // }

      userRouter(req, res);
    } catch (err) {
      handleError(res);
    }
  });

  server.listen(port, () => {
    console.log(`Worker listening on port ${port}`);
  });
};
