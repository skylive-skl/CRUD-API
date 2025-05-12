import { config } from 'dotenv';
import { DEFAULT_PORT } from './constants';
import cluster from 'cluster';
import os from 'os';
import { startBalancer } from './cluster/balancer';
import { createWorkerServer } from './cluster/worker';

config();

const PORT = parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10);
const numCPUs = os.availableParallelism
  ? os.availableParallelism() - 1
  : os.cpus().length - 1;

if (cluster.isPrimary) {
  console.log(`Primary process started. Spawning ${numCPUs} workers...`);

  startBalancer(PORT, numCPUs);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: `${PORT + 1 + i}` });
  }
} else {
  const port = parseInt(process.env.PORT || '3000', 10);
  createWorkerServer(port);
}
