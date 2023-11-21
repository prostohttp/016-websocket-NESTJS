import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "src/schemas/comment.schema";
import { CreateCommentDto } from "./dto/create.comment.dto";

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(comment: CreateCommentDto): Promise<CommentDocument> {
    try {
      const createdComment = new this.commentModel(comment);
      if (createdComment) {
        return createdComment.save();
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async read(id: string): Promise<CommentDocument> {
    try {
      const comment = await this.commentModel.findOne({ id: id });
      if (comment) {
        return comment;
      } else {
        throw new NotFoundException("Not found");
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(
    id: string,
    comment: CreateCommentDto,
  ): Promise<CommentDocument> {
    try {
      const foundedComment = await this.commentModel.findOne({ id: id });
      if (foundedComment) {
        return this.commentModel.findOneAndUpdate({ id: id }, comment, {
          new: true,
        });
      } else {
        throw new NotFoundException("Not found");
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async delete(id: string): Promise<CommentDocument> {
    try {
      const deletedComment = await this.commentModel.findOneAndDelete({
        id: id,
      });
      if (deletedComment) {
        return deletedComment;
      } else {
        throw new NotFoundException("Not found");
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAllBookComments(bookId: string): Promise<CommentDocument[]> {
    try {
      const comments = await this.commentModel.find({ bookId: bookId });
      if (comments.length) {
        return comments;
      } else {
        throw new NotFoundException("Not found");
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
