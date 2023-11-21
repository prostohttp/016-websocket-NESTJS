import { Module } from "@nestjs/common";
import { BookCommentsController } from "./book.comments.controller";
import { BookCommentsService } from "./book.comments.service";
import { MongooseModule } from "@nestjs/mongoose";
import { BookCommentSchema, Comment } from "src/schemas/comment.schema";

@Module({
  controllers: [BookCommentsController],
  providers: [BookCommentsService],
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: BookCommentSchema },
    ]),
  ],
})
export class BookCommentsModule {}
