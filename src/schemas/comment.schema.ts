import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment extends Document {
  @Prop({ default: uuidv4, required: true })
  id: string;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(Comment);
