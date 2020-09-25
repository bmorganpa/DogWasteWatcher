import { Pool } from "pg";

// Cache the connection pool for AWS lambda
let pool: Pool | undefined;

export async function connectToDatabase() {
  if (pool == null) {
    pool = new Pool();
  }

  return pool.connect();
}
