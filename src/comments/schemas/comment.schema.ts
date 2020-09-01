import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "comments" })
export class Comment extends Document {
  @Prop()
  body: string;

  @Prop()
  author: string;

  @Prop()
  created: Date;

  @Prop()
  cardId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
