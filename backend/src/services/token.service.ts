import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  sub: string;
  role: string;
  type: 'access' | 'refresh';
}

export function signAccessToken(userId: string, role: string) {
  return jwt.sign({ sub: userId, role, type: 'access' }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
}

export function signRefreshToken(userId: string, role: string) {
  return jwt.sign({ sub: userId, role, type: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
}
