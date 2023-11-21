import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BookDocument } from "../schemas/book.schema";
import { CreateBookDto } from "./dto/create.book.dto";
import { RequestType } from "./interfaces/requestType";
import { validationBookSchema } from "src/validation/schemas/joi.validation.book";
import { BooksValidationPipe } from "src/validation/joi.book.validation.pipe";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UsePipes(new BooksValidationPipe(validationBookSchema))
  @Post()
  async createBook(
    @Body() book: CreateBookDto,
  ): Promise<BookDocument | RequestType> {
    return await this.booksService.create(book);
  }

  @Get()
  async getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Get(":id")
  async getBook(@Param("id") id: string): Promise<BookDocument | RequestType> {
    return this.booksService.getBook(id);
  }

  @Delete(":id")
  async deleteBook(@Param("id") id: string): Promise<RequestType> {
    return this.booksService.delete(id);
  }

  @Put(":id")
  async updateBook(
    @Param("id") id: string,
    @Body() book: Partial<CreateBookDto>,
  ): Promise<BookDocument | RequestType> {
    return this.booksService.update(id, book);
  }
}
