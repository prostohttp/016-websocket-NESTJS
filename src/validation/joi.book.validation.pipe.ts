import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class BooksValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
