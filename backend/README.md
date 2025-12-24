# AgriOrbit Backend

Backend Node.js + PostgreSQL qui alimente la plateforme AgriOrbit.

## Architecture

- **Langage** : TypeScript
- **Framework HTTP** : Express
- **ORM** : Prisma (PostgreSQL)
- **Validation** : Zod
- **Sécurité** : Helmet, CORS, gestion JWT + hashage bcrypt
- **Journalisation** : morgan
- **Tests** : _TODO_ (Jest/Supertest)

### Modules principaux

1. **Auth**
   - Inscription / connexion email + mot de passe
   - OAuth Google (validation côté serveur via `google-auth-library`)
   - Gestion de tokens JWT (access + refresh)
   - Réinitialisation de mot de passe par OTP (mail ou SMS)

2. **Utilisateurs**
   - Profil, préférences, langue
   - Rôles : `ADMIN`, `ADVISOR`, `FARMER`

3. **Parcelles & Analyses**
   - Création de parcelles (nom, coordonnées, surface)
   - Historique des analyses (indices NDVI/NDWI, stress hydrique, recommandations)
   - Gestion des fichiers GeoJSON (stockage S3/MinIO _à implémenter_)

4. **Notifications**
   - Centre de notifications (alertes de stress, analyses prêtes, updates système)
   - Statuts : `UNREAD`, `READ`, `ARCHIVED`

5. **Programmes & Conseils**
   - Catalogue de programmes agronomiques (SolutionsHub)
   - CRUD admin + lecture publique

6. **Témoignages & Demandes de démo**
   - Collecte des formulaires (Front Home)
   - Workflow de qualification (statut `NEW`, `IN_PROGRESS`, `ARCHIVED`)

7. **Paramètres / Intégrations**
   - Gestion des préférences de notification
   - Configuration des intégrations (Google, WhatsApp, PowerBI webhook, etc.)

### Flux d’authentification Google

1. Front récupère un credential Google ID token.
2. Front envoie `POST /api/auth/google` avec le token.
3. Backend valide le token via `google-auth-library`, récupère le payload.
4. Si utilisateur inexistant : création + rôle `FARMER`.
5. Génération des tokens JWT + refresh, renvoyés au front.

## Schéma de données (extrait)

```mermaid
erDiagram
    User {
        String id
        String email
        String passwordHash
        String provider
        String googleSub
        String name
        String role
        String language
        DateTime createdAt
        DateTime updatedAt
    }
    RefreshToken {
        String id
        String token
        DateTime expiresAt
        Boolean revoked
    }
    PasswordResetToken {
        String id
        String code
        DateTime expiresAt
        Boolean used
    }
    Field {
        String id
        String name
        Float areaHectares
        String geoJsonPath
        Decimal latitude
        Decimal longitude
    }
    Analysis {
        String id
        String fieldId
        Float ndvi
        Float ndwi
        Integer healthScore
        String status
        String summary
        JSON recommendations
    }
    Notification {
        String id
        String type
        String title
        String message
        String status
        DateTime readAt
    }
    AdvisoryProgram {
        String id
        String name
        String detail
        Boolean published
    }
    Testimonial {
        String id
        String name
        String role
        String quote
        String metric
        String status
    }

    User ||--o{ RefreshToken : owns
    User ||--o{ PasswordResetToken : requests
    User ||--o{ Field : manages
    Field ||--o{ Analysis : has
    User ||--o{ Notification : receives
    User ||--o{ Testimonial : submits
```

## Endpoints (v1)

| Méthode | Route | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Inscription email/mot de passe |
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/google` | Auth Google |
| POST | `/api/auth/refresh` | Regénération token |
| POST | `/api/auth/logout` | Révocation refresh token |
| POST | `/api/auth/password/request` | Demande OTP |
| POST | `/api/auth/password/reset` | Réinitialisation avec OTP |
| GET | `/api/users/me` | Profil authentifié |
| PATCH | `/api/users/me` | Mise à jour profil/préférences |
| GET | `/api/fields` | Liste des parcelles |
| POST | `/api/fields` | Création |
| GET | `/api/fields/:id` | Détails + dernières analyses |
| PATCH | `/api/fields/:id` | Mise à jour |
| DELETE | `/api/fields/:id` | Suppression |
| POST | `/api/fields/:id/analyses` | Déclenchement analyse manuelle |
| GET | `/api/analyses` | Historique analyses |
| GET | `/api/notifications` | Liste |
| PATCH | `/api/notifications/:id/read` | Marquer comme lue |
| POST | `/api/testimonials` | Soumettre témoignage |
| GET | `/api/programs` | Catalogue |
| POST | `/api/programs` | (ADMIN) Création |
| PATCH | `/api/programs/:id` | (ADMIN) Mise à jour |
| DELETE | `/api/programs/:id` | (ADMIN) Suppression |
| POST | `/api/demo-requests` | Demande de session guidée |

## Variables d’environnement

Créer un fichier `.env` à partir de `.env.example` (à venir) :

```
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/agriorbit
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
BCRYPT_SALT_ROUNDS=10
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL_FROM=no-reply@agriorbit.ai
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

## Prochaines étapes

1. Générer le schéma Prisma (`schema.prisma`).
2. Implémenter les modules Express selon la liste d’endpoints.
3. Brancher un service d’envoi d’emails transactionnels (Postmark, Sendgrid, Mailersend, ...).
4. Ajouter tests d’intégration et pipeline CI.
