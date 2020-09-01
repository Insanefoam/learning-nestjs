import { object, string } from "@hapi/joi";

export const CommentSchema = object({
  body: string().required(),
  author: string().required(),
  cardId: string().required(),
});
