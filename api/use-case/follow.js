import { deleteFollow, insertFollow } from "../db/follow.js";

export async function follow(followerId, followeeId) {
  await insertFollow(followerId, followeeId);
}

export async function unfollow(followerId, followeeId) {
  await deleteFollow(followerId, followeeId);
}
