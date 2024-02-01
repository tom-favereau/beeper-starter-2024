import { getHomeBeeps } from "../db/get-home-beeps.js";

export async function getUserHome(userId) {
  const beeps = await getHomeBeeps(userId);

  return beeps;
}
