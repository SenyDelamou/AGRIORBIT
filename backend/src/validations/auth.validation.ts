import { z } from 'zod';

export const registerSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  organisation: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const googleAuthSchema = z.object({
  credential: z.string().min(10)
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10)
});

export const passwordRequestSchema = z.object({
  email: z.string().email()
});

export const passwordResetSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  password: z.string().min(8)
});
