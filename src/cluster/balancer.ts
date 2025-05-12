import { handleError } from '@/utils/error-handler';
import http, { RequestOptions } from 'http';

export const startBalancer = (basePort: number, workerCount: number) => {
  let current = 0;

  const server = http.createServer((clientReq, clientRes) => {
    const targetPort = basePort + 1 + (current % workerCount);
    current++;

    const options: RequestOptions = {
      hostname: 'localhost',
      port: targetPort,
      path: clientReq.url,
      method: clientReq.method,
      headers: clientReq.headers,
    };

    const proxy = http.request(options, (proxyRes) => {
      clientRes.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(clientRes, { end: true });
    });

    proxy.on('error', () => {
      handleError(clientRes, 500, 'Proxy error');
    });

    clientReq.pipe(proxy, { end: true });
  });

  server.listen(basePort, () => {
    console.log(`Balancer running on port ${basePort}`);
  });
};
