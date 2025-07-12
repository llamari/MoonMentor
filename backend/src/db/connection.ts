import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js'
import { schema } from './schema/index.ts'
import { env } from "../env.ts";
const databaseUrl = env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL não está definida.");
}

export const sql = postgres(databaseUrl);
export const db = drizzle(sql, {
    schema,
    casing: 'snake_case'
})