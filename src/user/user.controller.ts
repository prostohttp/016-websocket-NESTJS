import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDocument } from "src/schemas/user.schema";

@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param("id") id: string): Promise<UserDocument> {
    return await this.userService.getUser(id);
  }
}
