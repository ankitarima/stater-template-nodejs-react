# Copilot Instructions for Starter Template

This is a full-stack TypeScript template with React (Vite) frontend and Express.js backend, designed for quick project scaffolding.

## Architecture Overview

- **Monorepo Structure**: `client/` (React + Vite) and `server/` (Express.js)
- **Database**: MySQL with Prisma ORM (`server/prisma/schema.prisma`)
- **State Management**: Zustand with persistence (`client/src/store/session.store.ts`)
- **UI Framework**: ShadCN UI + Tailwind CSS with extensive component library
- **Authentication**: JWT-based with role-based access control (RBAC)

## Critical Development Patterns

### Server Architecture

- **Path Aliases**: Use TypeScript paths like `@controllers/*`, `@services/*`, `@middlewares/*` (see `server/tsconfig.json`)
- **Environment Validation**: Always use `config` from `@config/config.ts` instead of `process.env` directly
- **Error Handling**: Use `asyncHandler` middleware and `ErrorResponse` utility for consistent API errors
- **Authentication Flow**: Protected routes use `protect` middleware, session data available as `req.session`
- **File Structure**: Controllers handle requests, services contain business logic, utils for shared functionality

### Client Architecture

- **Component Organization**:
  - `components/ui/` - ShadCN base components (don't modify directly)
  - `components/auth/`, `components/dashboard/` - feature-specific components
  - `components/layout/` - layout wrappers (admin-layout.tsx for authenticated areas)
- **Routing**: Nested routes with `PrivateRoute` wrapper for authentication checks
- **State**: Zustand stores in `store/` with persistence for session management

## Development Workflows

### Starting Development

```bash
# Backend (runs on :5021)
cd server && npm run dev

# Frontend (runs on :5000)
cd client && npm run dev
```

### Database Operations

```bash
cd server
npm run db:generate  # Generate Prisma client
npm run db:push     # Push schema changes
npm run db:seed     # Run seed data
npm run db:reset    # Reset database (dev only)
```

### Build Process

- Client builds to `../server/public/` (configured in `client/vite.config.ts`)
- Server serves static files and handles SPA routing with catch-all `app.get("*")`
- Build with `npm run build` in respective directories

## Key Conventions

### File Naming

- React components: PascalCase (e.g., `AdminLayout.tsx`)
- Server files: kebab-case (e.g., `auth.middleware.ts`)
- Schemas: lowercase with dots (e.g., `user.schema.ts`)

### Import Patterns

- Client: Use `@/` alias for src imports
- Server: Use `@services/*`, `@middlewares/*` etc. aliases
- Always import types explicitly when needed

### Authentication

- Frontend: Check `user` from `useSession()` hook
- Backend: Access authenticated user via `req.session` after `protect` middleware
- Role-based access uses `authorize(...roles)` middleware

### API Structure

- Base path: `/api/v1/`
- Public routes before `protect` middleware in `index.routes.ts`
- Protected routes after middleware
- Consistent response format via `response.util.ts`

## Environment Setup

- Copy `server/.env.template` to `server/.env`
- Required: `DATABASE_URL`, JWT keys
- Optional: AWS S3, SMTP settings (have defaults for development)

## Testing & Debugging

- Health check endpoint: `/api/v1/health-check`
- Client dev tools: React Query DevTools enabled
- Server: Uses `ts-node-dev` with hot reload
