import cluster from 'cluster';
import os from 'os';
import { startBalancer } from './cluster/balancer';
import { createWorkerServer } from './cluster/worker';
import { config } from 'dotenv';
import { DEFAULT_PORT } from './constants';

config();

const PORT = parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10);
const numCPUs = os.availableParallelism
  ? os.availableParallelism() - 1
  : os.cpus().length - 1;

const workerPorts = new Map<number, number>();

if (cluster.isPrimary) {
  console.log(`Primary process started. Spawning ${numCPUs} workers...`);

  startBalancer(PORT, numCPUs);

  const forkWorker = (portOffset: number) => {
    const port = PORT + 1 + portOffset;
    const worker = cluster.fork({ PORT: `${port}` });
    workerPorts.set(worker.id, port);
  };

  for (let i = 0; i < numCPUs; i++) {
    forkWorker(i);
  }

  cluster.on('exit', (worker) => {
    const oldPort = workerPorts.get(worker.id);
    console.warn(
      `Worker ${worker.process.pid} exited. Restarting on port ${oldPort}...`,
    );

    workerPorts.delete(worker.id);

    if (oldPort !== undefined) {
      const offset = oldPort - PORT - 1;
      forkWorker(offset);
    }
  });
} else {
  const port = parseInt(process.env.PORT || '4001', 10);
  createWorkerServer(port);
}
