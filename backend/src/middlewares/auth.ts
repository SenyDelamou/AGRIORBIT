import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/token.service';
import { prisma } from '../config/prisma';
import { ApiError } from '../utils/api-error';

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Missing authorization header');
    }

    const token = authHeader.substring('Bearer '.length);
    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(401, 'Invalid or expired token'));
  }
}

export function requireRoles(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized'));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }
    next();
  };
}
