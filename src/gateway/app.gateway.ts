import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { BookCommentsService } from "src/comments/book.comments.service";
import { CreateCommentDto } from "src/comments/dto/create.comment.dto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class AppGateway {
  private readonly bookCommentsService: BookCommentsService;

  @SubscribeMessage("all-comments")
  async getAllComments(@MessageBody("bookId") bookId: string) {
    return await this.bookCommentsService.findAllBookComments(bookId);
  }

  @SubscribeMessage("add-comment")
  async addComment(@MessageBody() comment: CreateCommentDto) {
    return await this.bookCommentsService.create(comment);
  }
}
