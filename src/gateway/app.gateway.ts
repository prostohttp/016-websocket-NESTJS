import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { BookCommentsService } from "src/comments/book.comments.service";
import { CreateCommentDto } from "src/comments/dto/create.comment.dto";

@WebSocketGateway({ cors: true })
export class AppGateway {
  private readonly bookCommentsService: BookCommentsService;

  @SubscribeMessage("all-comments")
  getAllComments(@MessageBody("bookId") bookId: string) {
    return this.bookCommentsService.findAllBookComments(bookId);
  }

  @SubscribeMessage("add-comment")
  addComment(@MessageBody() comment: CreateCommentDto) {
    return this.bookCommentsService.create(comment);
  }
}
