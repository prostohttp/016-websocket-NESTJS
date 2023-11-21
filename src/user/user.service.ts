import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { CreateUserDto } from "./dto/create.user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const createdUser = new this.userModel(createUserDto);
      if (createdUser) {
        return createdUser.save();
      }
    } catch (error: any) {
      throw new BadRequestException(error.message, error.message);
    }
  }

  async getUser(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id);
      if (user) {
        return user;
      } else {
        throw new HttpException("Пользователь не найден", 404);
      }
    } catch (error) {
      throw new HttpException("Пользователь не найден", 404);
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email }).select("-__v");
    if (!user) {
      throw new HttpException("Пользователь не найден", 404);
    }
    return user;
  }
}
