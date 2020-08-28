import { object, string } from "@hapi/joi";

export const ColumnSchema = object({
  id: string().required(),
  title: string().required(),
});
