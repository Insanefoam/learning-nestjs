import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Column extends Document {
  @Prop()
  title: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
