import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "cards" })
export class Card extends Document {
  @Prop()
  title: string;

  @Prop()
  columnId: string;

  @Prop()
  commentsIds: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
