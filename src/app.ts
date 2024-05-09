import express from 'express';

import * as middlewares from './middlewares';
import v1Router from './v1/routes/index';

import MessageResponse from './interfaces/MessageResponse';

const app = express();

app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', v1Router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
