import cp from 'child_process';

const createProcess = () => {
  const n = cp.fork(`${__dirname}/../child-process.ts`);
  return n;
};

export default {
  createProcess,
};
