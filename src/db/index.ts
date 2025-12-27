import { neon } from "@neondatabase/serverless";
import { config as dotenvConfig } from "dotenv";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

dotenvConfig({ path: process.env.DOTENV_CONFIG_PATH ?? ".env.local" });

const connectionString = process.env.NEON_DB_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL (or NEON_DB_URL) is not set");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
export { schema };
