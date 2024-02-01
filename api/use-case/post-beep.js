import DOMPurify from "isomorphic-dompurify";

import { insertBeep } from "../db/insert-beep.js";

const BEEP_MAX_LENGTH = 280;

export class BeepTooLongError extends Error {}

export async function postBeep(user, content) {
  if (content.length > BEEP_MAX_LENGTH) {
    throw new BeepTooLongError();
  }

  const insertedBeep = await insertBeep(user.id, DOMPurify.sanitize(content));

  return {
    ...insertedBeep,
    authorId: user.id,
    authorName: user.name,
    authorPicture: user.picture,
  };
}
