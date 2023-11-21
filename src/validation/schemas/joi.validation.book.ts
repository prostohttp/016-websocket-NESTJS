import { HttpException, HttpStatus } from "@nestjs/common";
import * as Joi from "joi";

export const validationBookSchema = Joi.object().keys({
  title: Joi.string()
    .min(10)
    .required()
    .error(new HttpException("title less 10!", HttpStatus.BAD_REQUEST)),
  description: Joi.string()
    .min(20)
    .required()
    .error(new HttpException("title less 20!", HttpStatus.BAD_REQUEST)),
  authors: Joi.array().items(Joi.string()).required(),
  favorite: Joi.boolean(),
  filecover: Joi.string(),
  fileName: Joi.string(),
  originalNameFileCover: Joi.string(),
  originalNameFileName: Joi.string(),
});
