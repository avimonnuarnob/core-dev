import { Response, Request } from 'express';

import processService from '../services/processService';
import { ChildProcess } from 'child_process';

const processStore = new Map<
  number,
  { process: ChildProcess; createdAt: number }
>();

const createProcess = (req: Request, res: Response) => {
  const process = processService.createProcess();
  const pid = process.pid;
  const now = Date.now();

  if (pid) {
    if (!processStore.has(process.pid)) {
      processStore.set(process.pid, { process, createdAt: now });
    } else {
    }

    res.send({
      PID: pid,
      createdAt: now,
    });
  }
};

const deleteProcess = (req: Request, res: Response) => {
  const pid = req.params.pid && Number(req.params.pid);

  if (pid) {
    const childProcess = processStore.get(pid);

    if (childProcess) {
      const success = childProcess.process.kill();
      if (success) {
        processStore.delete(pid);
        res.send({
          message: 'Process not found!',
        });
      }
    } else {
      res.status(404).send({
        message: `Process ${pid} deleted successfully`,
      });
    }
  }
};

const getProcess = (req: Request, res: Response) => {
  const pid = req.params.pid && Number(req.params.pid);

  if (pid) {
    const childProcess = processStore.get(pid);

    childProcess?.process.on('message', (m) => {
      res.send(m);
      childProcess?.process.removeAllListeners();
      return;
    });

    childProcess?.process.send('init');
  }
};

const getProcesses = (req: Request, res: Response) => {
  const response: any[] = [];
  processStore.forEach((value, key) => {
    response.push({
      PID: value.process.pid,
      createdAt: value.createdAt,
    });
  });

  res.send(response);
};

export default {
  createProcess,
  deleteProcess,
  getProcess,
  getProcesses,
};
