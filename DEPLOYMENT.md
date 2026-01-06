# 🚀 Agri Orbit - Deployment Guide

Complete guide for deploying the Agri Orbit platform to Render.com.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with repository access
- ✅ Render.com account (free tier available)
- ✅ Google Cloud Console project for OAuth
- ✅ SMTP credentials for email sending

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│  agriorbit-frontend (Static Site)       │
│  - React + Vite                         │
│  - Client-side routing (React Router)   │
└──────────────┬──────────────────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────────────────┐
│  agriorbit-api (Node.js)                │
│  - Express REST API                     │
│  - JWT Authentication                   │
└──────────────┬──────────────────────────┘
               │ Connection Pool
               ▼
┌─────────────────────────────────────────┐
│  agriorbit-db (PostgreSQL)              │
│  - Managed database                     │
│  - Automatic backups                    │
└─────────────────────────────────────────┘
```

---

## 🔧 Step 1: Configure Environment Variables

### Backend Environment Variables

Set these in the Render dashboard for `agriorbit-api`:

```bash
# Auto-configured by Render
DATABASE_URL=postgresql://...  # From database connection

# Generate secure secrets (use: openssl rand -base64 32)
JWT_ACCESS_SECRET=<your-secret-here>
OTP_SECRET=<your-secret-here>

# Frontend URL
FRONTEND_URL=https://agriorbit-frontend.onrender.com

# Google OAuth
GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=<app-password>
SMTP_FROM=noreply@agriorbit.com
```

### Frontend Environment Variables

Set these in the Render dashboard for `agriorbit-frontend`:

```bash
# Backend API
VITE_API_URL=https://agriorbit-api.onrender.com/api

# Google OAuth (same as backend)
VITE_GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com
```

---

## 📦 Step 2: Deploy to Render

### Option A: Blueprint (Recommended)

1. **Push render.yaml to your repository**
   ```bash
   git add frontend/render.yaml
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Create Blueprint on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **New** → **Blueprint**
   - Connect your GitHub repository
   - Select branch: `main`
   - Render will detect `render.yaml` automatically
   - Click **Apply**

3. **Wait for deployment** (5-10 minutes)
   - Database provisioning
   - Backend build & deploy
   - Frontend build & deploy

### Option B: Manual Setup

If Blueprint doesn't work, create services manually:

#### 1. Create Database
- **New** → **PostgreSQL**
- Name: `agriorbit-db`
- Plan: **Free**
- Region: **Frankfurt**

#### 2. Create Backend Service
- **New** → **Web Service**
- Connect repository
- Root Directory: `server`
- Build Command: `npm ci && npm run prisma:generate`
- Start Command: `npm run prisma:migrate:deploy && npm start`
- Add environment variables (see above)

#### 3. Create Frontend Service
- **New** → **Static Site**
- Connect repository
- Root Directory: `frontend`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Add rewrites: `/*` → `/index.html`
- Add environment variables (see above)

---

## 🔐 Step 3: Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add **Authorized JavaScript origins**:
   ```
   https://agriorbit-frontend.onrender.com
   ```
5. Add **Authorized redirect URIs**:
   ```
   https://agriorbit-frontend.onrender.com/connexion
   ```

---

## ✅ Step 4: Verify Deployment

### Health Checks

```bash
# Backend health check
curl https://agriorbit-api.onrender.com/api/health

# Expected response:
{"status":"ok","timestamp":"2025-01-06T..."}

# Frontend (should return HTML, not 404)
curl https://agriorbit-frontend.onrender.com/
curl https://agriorbit-frontend.onrender.com/plateforme
```

### Test User Flow

1. ✅ Visit `https://agriorbit-frontend.onrender.com/`
2. ✅ Loading screen appears → redirects to login
3. ✅ Click "S'inscrire" → Registration page
4. ✅ Fill form and create account
5. ✅ Check email for verification
6. ✅ Login with Google OAuth
7. ✅ Navigate to different pages (no 404 errors)

---

## 🐛 Troubleshooting

### Problem: Backend returns 500 errors

**Check:**
- Database connection: `DATABASE_URL` correctly set?
- Migrations applied: Check logs for `prisma:migrate:deploy`
- Environment variables: All required vars set?

**Solution:**
```bash
# Check backend logs in Render dashboard
# Look for database connection errors or missing env vars
```

### Problem: Frontend shows blank page

**Check browser console (F12):**

- **CORS errors** → Backend `FRONTEND_URL` not set correctly
- **API connection failed** → `VITE_API_URL` pointing to wrong backend
- **Chunk loading failed** → Hard refresh: `Ctrl + Shift + R`

### Problem: Routes return 404

**Verify:**
- `_redirects` file exists in `frontend/public/`
- Rewrite rules in `render.yaml` under frontend service
- Build output contains `_redirects` in `/dist`

**Fix:**
```bash
# Rebuild frontend service in Render dashboard
# Manual Deploy → Clear build cache → Deploy latest commit
```

### Problem: Google Sign-In doesn't work

**Check:**
- `VITE_GOOGLE_CLIENT_ID` matches backend `GOOGLE_CLIENT_ID`
- OAuth redirect URIs include production URL
- JavaScript origins include `https://agriorbit-frontend.onrender.com`

---

## 📊 Monitoring

### Render Dashboard

Monitor your services:
- **Metrics**: CPU, Memory, Requests/sec
- **Logs**: Real-time application logs
- **Events**: Deployments, restarts, errors

### Database Management

```bash
# Connect to production database
# (Get connection string from Render dashboard)
psql postgresql://agriorbit:password@...

# Run queries
SELECT COUNT(*) FROM "User";
SELECT * FROM "User" ORDER BY "createdAt" DESC LIMIT 5;
```

---

## 🔄 Continuous Deployment

Render automatically deploys on `git push`:

```bash
# Make changes
git add .
git commit -m "feat: Add new feature"
git push origin main

# Render will:
# 1. Detect push
# 2. Trigger build
# 3. Run tests (if configured)
# 4. Deploy automatically
# 5. Health check before going live
```

---

## 💰 Cost Optimization

### Free Tier Limitations

- **Web Services**: Spin down after 15 min inactivity
- **Database**: 1 GB storage, 97 hours uptime/month
- **Build Minutes**: 500 minutes/month

### Tips

1. **Combine requests** to reduce cold starts
2. **Implement caching** on frontend
3. **Use CDN** for static assets
4. **Monitor usage** in dashboard

### Upgrade Options

When you need more:
- **Starter Plan ($7/mo)**: No spin down, always-on
- **Standard Plan ($25/mo)**: More resources, autoscaling

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [React Router on Static Hosts](https://reactrouter.com/en/main/guides/deployment)

---

## 🆘 Need Help?

- **Render Support**: [Render Community](https://community.render.com/)
- **Documentation**: Check `implementation_plan.md` for detailed config
- **GitHub Issues**: Create an issue in your repository

---

**Last Updated**: 2026-01-06  
**Platform Version**: Agri Orbit v1.0.0
