import { object, string } from "@hapi/joi";

export const ColumnSchema = object({
  title: string().required(),
});
