import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Smart Inventory Management Backend API');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
