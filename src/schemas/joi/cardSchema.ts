import { object, string, array } from "@hapi/joi";

export default object({
  id: string().required(),
  title: string().required(),
  columnId: string().required(),
  commentsIds: array()
    .items(string())
    .required(),
});
