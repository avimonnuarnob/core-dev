// import cp from 'child_process';

// const processStore = new Set();

// const n = cp.fork(`${__dirname}/child-process.ts`);

// n.on('message', (m) => {
//   console.log('PARENT got message:', m);
// });

// setInterval(() => {
//   n.send({ hello: 'world' });
// }, 1000);

import app from './app';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
