import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.NEON_DB_URL;
console.log("DB Connection String:", connectionString);
if (!connectionString) {
  throw new Error("DATABASE_URL (or NEON_DB_URL) is not set");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
export { schema };
