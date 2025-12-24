import "dotenv/config";
import { config as dotenvConfig } from "dotenv";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

if (
  !process.env.DATABASE_URL &&
  !process.env.NEON_DB_URL &&
  !process.env.NEON_DEV_DB
) {
  dotenvConfig({ path: process.env.DOTENV_CONFIG_PATH ?? ".env.local" });
}

const connectionString =
  process.env.DATABASE_URL ?? process.env.NEON_DB_URL ?? process.env.NEON_DEV_DB;
if (!connectionString) {
  throw new Error("DATABASE_URL (or NEON_DB_URL) is not set");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
export { schema };
