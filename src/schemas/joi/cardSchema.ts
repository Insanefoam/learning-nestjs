import { object, string, array } from "@hapi/joi";

export const CardSchema = object({
  id: string().required(),
  title: string().required(),
  columnId: string().required(),
  commentsIds: array()
    .items(string())
    .required(),
});
