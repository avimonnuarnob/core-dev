const log: number[] = [];

setInterval(() => {
  log.push(Date.now());
}, 1000);

process.on('message', (m) => {
  process.send && process.send({ log });
});
