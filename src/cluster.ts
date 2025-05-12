import cluster from 'cluster';
import os from 'os';
import { startBalancer } from './cluster/balancer';
import { createWorkerServer } from './cluster/worker';
import { config } from 'dotenv';

config();

const PORT = parseInt(process.env.PORT || '4000', 10);
const numCPUs = os.availableParallelism
  ? os.availableParallelism() - 1
  : os.cpus().length - 1;

const workerPorts = new Map<number, number>();

if (cluster.isPrimary) {
  console.log(`Primary process started. Spawning ${numCPUs} workers...`);

  startBalancer(PORT, numCPUs);

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork({ PORT: `${PORT + 1 + i}` });
    workerPorts.set(worker.id, PORT + 1 + i);
  }

  cluster.on('exit', (worker) => {
    const currentPort = workerPorts.get(worker.id);
    console.warn(
      `Worker ${worker.process.pid} exited. Restarting on port ${currentPort}...`,
    );

    cluster.fork({ PORT: currentPort });
  });
} else {
  const port = parseInt(process.env.PORT || '4001', 10);
  createWorkerServer(port);
}
