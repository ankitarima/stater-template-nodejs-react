# Starter Monorepo

A production-ready **Turborepo** (npm workspaces) starter with a React SPA, an Express +
Prisma API, and a shared enterprise UI design system — structured to scale with more apps,
libraries, and landing/promotional microsites.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Apps](#apps)
- [API endpoints](#api-endpoints)
- [Shared UI package (`@workspace/ui`)](#shared-ui-package-workspaceui)
- [Adding a new app / microsite](#adding-a-new-app--microsite)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Tech stack

| Area      | Technology                                                          |
| --------- | ------------------------------------------------------------------- |
| Monorepo  | Turborepo 2 · npm workspaces                                         |
| Frontend  | React 19 · Vite 6 · React Router 7 · TanStack Query/Table · Zustand  |
| UI        | Tailwind CSS v4 · shadcn/ui · Radix · lucide-react · next-themes     |
| Forms     | React Hook Form · Zod 4                                              |
| Backend   | Express 5 · TypeScript · Zod 4                                       |
| Database  | Prisma 7 (driver adapter) · MySQL                                    |
| Auth      | JWT (RS256) · bcryptjs                                               |

---

## Project structure

```
.
├── apps/
│   ├── web/                 # React 19 + Vite SPA (landing, auth, admin dashboard)
│   └── api/                 # Express 5 + Prisma 7 REST API
├── packages/
│   ├── ui/                  # @workspace/ui — shadcn components + Tailwind v4 theme
│   ├── eslint-config/       # @workspace/eslint-config — shared flat ESLint config
│   └── typescript-config/   # @workspace/typescript-config — shared tsconfig bases
├── turbo.json               # Turborepo task pipeline
├── package.json             # root — workspaces + turbo scripts
└── README.md
```

---

## Prerequisites

- **Node.js** ≥ 20 (developed on Node 24)
- **npm** ≥ 10 (ships with Node; this repo uses npm workspaces)
- A **MySQL** database (local or hosted) reachable from your machine

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/ankitarima/stater-template-nodejs-react.git
cd stater-template-nodejs-react

# 2. Install everything (all workspaces) + generate the Prisma client
npm install

# 3. Configure the API environment
cp apps/api/.env.template apps/api/.env
#   → edit apps/api/.env and set at least DATABASE_URL and the 4 JWT keys
#     (see "Environment variables" below)

# 4. Create the database schema and seed the default admin
npm run db:push
npm run db:seed

# 5. Start everything (web on :5000, api on :5001)
npm run dev
```

Then open **http://localhost:5000**. The SPA talks to the API at
`http://localhost:5001/api/v1`.

**Default admin login** (created by `db:seed`):

```
email:    admin@local.dev
password: Asd123!@#
```

---

## Environment variables

Create `apps/api/.env` from `apps/api/.env.template`. Variables **without a default throw
at startup if missing**.

| Variable                                                                     | Required | Notes                                                   |
| ---------------------------------------------------------------------------- | -------- | ------------------------------------------------------- |
| `PORT`                                                                        | no       | API port. Defaults to `5021`; this repo uses **5001**.  |
| `DATABASE_URL`                                                                | **yes**  | `mysql://user:password@host:3306/dbname`                |
| `ACCESS_TOKEN_PRIVATE_KEY` / `ACCESS_TOKEN_PUBLIC_KEY`                        | **yes**  | RS256 key pair (base64). Generate at the link below.    |
| `REFRESH_PRIVATE_KEY` / `REFRESH_PUBLIC_KEY`                                  | **yes**  | RS256 key pair (base64).                                |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM_EMAIL` | no       | For password-reset emails. Default to `test` (no-op).   |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_URI` / `AWS_BUCKET_NAME` / `AWS_REGION` | no | S3 uploads. Default to `test`.               |
| `COUNTRY_STATE_CITY_API` / `COUNTRY_STATE_CITY_API_KEY`                       | no       | Location lookups. Default to `test`.                    |

> JWT keys are RS256. Generate a key pair (base64) here:
> https://travistidwell.com/jsencrypt/demo/

The **web** app has no `.env`; its API base URL is `http://localhost:5001/api/v1`
(configured in `apps/web/src/lib/axios.ts`).

---

## Scripts

Run all of these **from the repo root** — Turborepo fans them out across workspaces and
caches results.

| Command               | What it does                                        |
| --------------------- | --------------------------------------------------- |
| `npm run dev`         | Runs **web** (:5000) and **api** (:5001) together   |
| `npm run build`       | Builds all apps (`web` → `dist`, `api` → `dist`)    |
| `npm run check-types` | Type-checks every package                           |
| `npm run lint`        | Lints every package                                 |
| `npm run db:push`     | `prisma db push` — syncs the schema to the database |
| `npm run db:seed`     | Seeds the default admin user                        |
| `npm run clean`       | Removes build artifacts and `node_modules`          |

**Per-app** (run inside a workspace, or target with turbo, e.g.
`npx turbo run build --filter=web`):

- `apps/web`: `dev`, `build`, `lint`, `check-types`, `preview`
- `apps/api`: `dev`, `build`, `start`, `check-types`, `db:generate`, `db:push`, `db:seed`, `db:reset`

---

## Apps

### `apps/web` — React SPA (port 5000)

Landing page, authentication (login, register, forgot/reset password), and a compact
enterprise admin dashboard (sidebar, KPI cards, chart, data table). Dark mode is wired via
`next-themes`. Routes:

| Route                        | Description                      |
| ---------------------------- | -------------------------------- |
| `/`                          | Marketing / landing page         |
| `/auth/login`                | Sign in                          |
| `/auth/register`             | Create an account                |
| `/auth/forgot-password`      | Request a reset link             |
| `/auth/password-reset/:hash` | Set a new password               |
| `/admin`                     | Admin dashboard (auth-protected) |

### `apps/api` — Express + Prisma API (port 5001)

REST API mounted at `/api/v1`. JWT auth (RS256), bcrypt password hashing, Zod request
validation, and Prisma 7 (Rust-free) via the `@prisma/adapter-mariadb` driver adapter.
The Prisma client is generated automatically on `npm install` (postinstall) and on build.

---

## API endpoints

Base URL: `http://localhost:5001/api/v1`

| Method | Path                    | Body                        | Description                      |
| ------ | ----------------------- | --------------------------- | -------------------------------- |
| GET    | `/health-check`         | —                           | Liveness probe (200)             |
| POST   | `/auth/login`           | `{ email, password }`       | Returns `{ user, access_token }` |
| POST   | `/auth/register`        | `{ name, email, password }` | Creates an admin, returns tokens |
| POST   | `/auth/forgot-password` | `{ email }`                 | Issues a reset token / email     |
| POST   | `/auth/password-reset`  | `{ hash, new_password }`    | Sets a new password              |

Example:

```bash
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@local.dev","password":"Asd123!@#"}'
```

---

## Shared UI package (`@workspace/ui`)

Components are consumed **as source** through a path alias, so every Vite app gets the same
design system with full HMR (no build step for the UI package).

To use it in a new app:

1. **`package.json`** → add `"@workspace/ui": "*"` to dependencies.
2. **`vite.config.ts`** → alias `"@workspace/ui"` → `../../packages/ui/src`.
3. **`tsconfig`** → `"paths": { "@workspace/ui/*": ["../../packages/ui/src/*"] }`.
4. **Entry CSS**:
   ```css
   @import "tailwindcss";
   @import "tw-animate-css";
   @import "@workspace/ui/globals.css";
   ```
   (`globals.css` self-registers its `@source`, so its utility classes are generated.)
5. **Import components**:
   ```tsx
   import { Button } from "@workspace/ui/components/button";
   import { cn } from "@workspace/ui/lib/utils";
   ```

### Adding shadcn components

Run the shadcn CLI **inside `packages/ui`** — its `components.json` already maps the
`@workspace/ui` aliases, so new components land in the shared package for every app:

```bash
cd packages/ui
npx shadcn@latest add <component>
```

---

## Adding a new app / microsite

1. Scaffold a Vite app under `apps/<name>` (e.g. `apps/landing`).
2. Give its `package.json` a unique `name` and the standard scripts
   (`dev`, `build`, `lint`, `check-types`).
3. Wire `@workspace/ui` using the 5 steps above.
4. `npm install` at the root — the workspace is picked up automatically and turbo will
   include it in `dev` / `build` / `check-types`.

It inherits the enterprise theme (light/dark) and every component automatically.

---

## Deployment

- **web** builds to `apps/web/dist` — deploy as static assets to any host
  (Vercel, Netlify, S3/CloudFront, nginx…).
- **api** builds to `apps/api/dist` — run with `node apps/api/dist/server.js` (or
  `npm run start` inside `apps/api`). Provide the same `apps/api/.env` variables in
  production.
- To serve the SPA from a **single Node process** (classic monolith), copy
  `apps/web/dist` into `apps/api/public` during your deploy — the API already has a static
  handler and SPA fallback for `public/`.

---

## Troubleshooting

- **`P1001: Can't reach database server`** — `DATABASE_URL` is wrong or the DB isn't
  reachable (many hosts IP-whitelist; add your IP). `db:push` / `db:seed` need a live DB.
- **`<VAR> is not defined in environment variables`** — a required env var is missing from
  `apps/api/.env` (see the table above).
- **Types can't find `@prisma/client`** — run `npm install` (triggers `prisma generate`) or
  `npx turbo run db:generate --filter=api`.
- **A new app looks unstyled** — ensure its entry CSS imports `@workspace/ui/globals.css`
  after `@import "tailwindcss";`, and that the `@workspace/ui` alias points at
  `packages/ui/src`.
- **Turbo serving stale output** — force a fresh run with `npx turbo run build --force`.

---

## License

MIT
