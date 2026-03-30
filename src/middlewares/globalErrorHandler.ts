import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Something went wrong!';
  let errorMessages = [
    {
      path: '',
      message: err.message,
    },
  ];

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
