import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

dotenv.config();

// CONEXIÓN A LA BASE DE DATOS TURSO
const db = createClient({
    url: process.env.TURSO_DB,
    authToken: process.env.TURSO_TOKEN
});

export async function myQuery(query) {
    const result = await db.execute(query);
    return result.rows;
}