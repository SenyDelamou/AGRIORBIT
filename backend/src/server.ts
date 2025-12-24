import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';

import { router as apiRouter } from './routes/index';
import { errorHandler, notFoundHandler } from './middlewares/error-handler';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 4000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`🚀 AgriOrbit backend running on port ${port}`);
});
