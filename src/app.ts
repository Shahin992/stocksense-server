import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { connectDB } from './db/dbConnect';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Ensure DB connection exists in serverless environments (e.g. Vercel)
const ensureDbConnection = async (_req: Request, _res: Response, next: (error?: unknown) => void) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
};

// Application routes
app.use('/api', ensureDbConnection, routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Smart Inventory Management Backend API');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
