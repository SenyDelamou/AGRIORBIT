import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/async-handler';
import { ApiError } from '../utils/api-error';
import {
  registerSchema,
  loginSchema,
  googleAuthSchema,
  refreshSchema,
  passwordRequestSchema,
  passwordResetSchema
} from '../validations/auth.validation';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../services/token.service';
import { env } from '../config/env';

const router = Router();
const oauthClient = new OAuth2Client(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const payload = registerSchema.parse(req.body);
    const email = payload.email.toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ApiError(409, 'Un compte existe déjà avec cet email');
    }

    const passwordHash = await bcrypt.hash(payload.password, env.BCRYPT_SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        name: `${payload.firstname} ${payload.lastname}`,
        passwordHash,
        organization: payload.organisation,
        provider: 'LOCAL'
      }
    });

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id, user.role);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      }
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: user.organization
      },
      accessToken,
      refreshToken
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const payload = loginSchema.parse(req.body);
    const email = payload.email.toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      throw new ApiError(401, 'Identifiants invalides');
    }

    const passwordMatch = await bcrypt.compare(payload.password, user.passwordHash);
    if (!passwordMatch) {
      throw new ApiError(401, 'Identifiants invalides');
    }

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id, user.role);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      }
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        picture: user.picture,
        organization: user.organization
      },
      accessToken,
      refreshToken
    });
  })
);

router.post(
  '/google',
  asyncHandler(async (req, res) => {
    const { credential } = googleAuthSchema.parse(req.body);

    const ticket = await oauthClient.verifyIdToken({ idToken: credential, audience: env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload.sub) {
      throw new ApiError(401, 'Impossible de valider le compte Google');
    }

    const email = payload.email.toLowerCase();

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        googleSub: payload.sub,
        name: payload.name ?? payload.email,
        picture: payload.picture ?? undefined,
        provider: 'GOOGLE'
      },
      create: {
        email,
        googleSub: payload.sub,
        name: payload.name ?? payload.email,
        picture: payload.picture ?? undefined,
        provider: 'GOOGLE'
      }
    });

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id, user.role);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      }
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        picture: user.picture
      },
      accessToken,
      refreshToken
    });
  })
);

router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const { refreshToken } = refreshSchema.parse(req.body);

    const payload = verifyRefreshToken(refreshToken);
    const storedToken = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });

    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      throw new ApiError(401, 'Token invalide ou expiré');
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new ApiError(401, 'Utilisateur introuvable');
    }

    const newAccessToken = signAccessToken(user.id, user.role);
    const newRefreshToken = signRefreshToken(user.id, user.role);

    await prisma.$transaction([
      prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revoked: true }
      }),
      prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        }
      })
    ]);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  })
);

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    const { refreshToken } = refreshSchema.parse(req.body);
    await prisma.refreshToken.updateMany({ where: { token: refreshToken }, data: { revoked: true } });
    res.status(204).send();
  })
);

router.post(
  '/password/request',
  asyncHandler(async (req, res) => {
    const { email } = passwordRequestSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) {
      res.status(200).json({ success: true });
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        code,
        expiresAt
      }
    });

    res.json({ success: true, code });
  })
);

router.post(
  '/password/reset',
  asyncHandler(async (req, res) => {
    const { email, code, password } = passwordResetSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      throw new ApiError(404, 'Utilisateur introuvable');
    }

    const token = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        code,
        used: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!token) {
      throw new ApiError(400, 'Code invalide ou expiré');
    }

    const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
      prisma.passwordResetToken.update({ where: { id: token.id }, data: { used: true } })
    ]);

    res.json({ success: true });
  })
);

export default router;
