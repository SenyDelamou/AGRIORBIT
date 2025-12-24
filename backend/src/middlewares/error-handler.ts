import { Request, Response, NextFunction } from 'express';
import { ApiError, isApiError } from '../utils/api-error';

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, 'Resource not found'));
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (isApiError(err)) {
    return res.status(err.status).json({
      error: err.message,
      details: err.details ?? null
    });
  }

  console.error('Unexpected error:', err);
  return res.status(500).json({ error: 'Internal server error' });
}
