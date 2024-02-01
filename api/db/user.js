import { queryNormalized } from "./connection-pool.js";

export async function getUserByName(name) {
  const rows = await queryNormalized("SELECT * FROM users WHERE name=$1", [
    name,
  ]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}
