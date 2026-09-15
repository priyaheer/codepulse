export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV !== 'production';

  if (statusCode >= 500) {
    console.error(`[error] ${req.method} ${req.path}:`, err);
  }

  res.status(statusCode).json({
    error: {
      message: err.isOperational ? err.message : 'An unexpected error occurred',
      code: err.code || 'INTERNAL_ERROR',
      ...(isDev && { stack: err.stack }),
    },
  });
}

export function notFound(req, res) {
  res.status(404).json({ error: { message: `Route ${req.path} not found`, code: 'NOT_FOUND' } });
}
