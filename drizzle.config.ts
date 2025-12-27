import { config as dotenvConfig } from "dotenv";
import "dotenv/config";

import { defineConfig } from "drizzle-kit";

dotenvConfig({ path: process.env.DOTENV_CONFIG_PATH ?? ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DB_URL!,
  },
  verbose: true,
  strict: true,
});
