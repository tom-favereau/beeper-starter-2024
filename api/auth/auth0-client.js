import { ManagementClient } from "auth0";
import camelcaseKeys from "camelcase-keys";

const auth0ApiClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "read:users",
});

export async function getAuth0UserById(id) {
  const auth0Response = await auth0ApiClient.users.get({ id });

  const fullUser = camelcaseKeys(auth0Response.data);

  return {
    userId: fullUser.userId,
    username: fullUser.username,
    picture: fullUser.picture,
  };
}
