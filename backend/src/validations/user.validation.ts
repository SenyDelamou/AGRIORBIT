import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  language: z.string().min(2).max(10).optional(),
  localLanguages: z.array(z.string().min(2).max(40)).max(10).optional(),
  organization: z.string().max(180).optional(),
  picture: z.string().url().optional()
});
