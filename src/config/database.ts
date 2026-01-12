import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

class Database {
  private static instance: Database;
public db: NodePgDatabase<typeof schema>;

  private constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Drizzle ORM instance
    this.db = drizzle(pool, { schema });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export const database = Database.getInstance();
export const db = database.db;
