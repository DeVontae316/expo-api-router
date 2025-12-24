import "dotenv/config";
import { config as dotenvConfig } from "dotenv";

import { defineConfig } from "drizzle-kit";

dotenvConfig({ path: process.env.DOTENV_CONFIG_PATH ?? ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      process.env.NEON_DB_URL ??
      process.env.NEON_DEV_DB ??
      "",
  },
  verbose: true,
  strict: true,
});
