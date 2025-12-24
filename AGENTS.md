# expo-api-route

## Requirements
- Use Expo SDK 54+ with Expo Router entry (`main: "expo-router/entry"`).
- Routes live in `src/app` (set `EXPO_ROUTER_APP_ROOT=src/app` in `package.json` scripts and `eas.json`).
- API routes live in `src/app/api/*+api.ts` and should be kept thin; put shared server logic in `src/server`.
- Server-side state uses React Query (`@tanstack/react-query` provider is in `src/app/_layout.tsx`).
- Styling/theme uses Unistyles v3 (`react-native-unistyles`):
  - Configure theme in `src/utils/unistyles.ts`.
  - Babel plugin enabled in `babel.config.js` with `root: "./src"`.
- Database layer uses Drizzle + Neon (server-side):
  - Schema in `src/db/schema.ts`.
  - DB client in `src/db/index.ts` (loads `dotenv/config`).
  - Drizzle Kit config in `drizzle.config.ts`.
  - `DATABASE_URL` is required (store in EAS secrets; do not hardcode).

## Folder Structure (authoritative)
- `src/app`: Expo Router routes (including `api/` for route handlers)
- `src/screens`: Screen implementations, referenced by routes
- `src/components`: Reusable UI components
- `src/hooks`: Reusable hooks
- `src/utils`: Reusable utilities (tests colocated as `*.test.ts`)
- `src/server`: Server-only modules used by API routes
- `src/db`: Drizzle schema + DB client

## Platform Conventions
- Prefer platform files when UI differs: `*.web.tsx` for web, default `*.tsx` for native (iOS/Android).
- Keep route files minimal (typically just re-export a screen).

## Environment Variables
- Public (bundled) vars should use `EXPO_PUBLIC_*`.
- Secret server vars (e.g. `DATABASE_URL`) should be set via EAS (`eas secret:create`) and referenced via `process.env`.

## Tooling
- Node: `>= 20.19.4` recommended for RN `0.81.x` engine checks (use `nvm`).
- Tests: `jest` via `jest-expo` (`npm test`).
- Typecheck: `npm run typecheck`.
- Drizzle: `npm run db:generate` and `npm run db:push`.
