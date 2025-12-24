import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import fieldRoutes from './field.routes';
import analysisRoutes from './analysis.routes';
import notificationRoutes from './notification.routes';
import testimonialRoutes from './testimonial.routes';
import programRoutes from './program.routes';
import demoRoutes from './demo.routes';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/fields', fieldRoutes);
router.use('/analyses', analysisRoutes);
router.use('/notifications', notificationRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/programs', programRoutes);
router.use('/demo-requests', demoRoutes);
