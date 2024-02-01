import { queryNormalized } from "../db/connection-pool.js";
import { getAuth0UserById } from "./auth0-client.js";

export const authMiddleware = async (req, res, next) => {
  const users = await queryNormalized("SELECT * FROM users WHERE auth0_id=$1", [
    req.oidc.user.sub,
  ]);

  if (users.length == 1) {
    req.user = users[0];
    next();
    return;
  }

  const auth0User = await getAuth0UserById(req.oidc.user.sub);

  const user = await queryNormalized(
    "INSERT INTO users(name, auth0_id, picture) VALUES ($1, $2, $3) RETURNING *",
    [auth0User.username, auth0User.userId, auth0User.picture]
  );

  req.user = user;
  next();
};
